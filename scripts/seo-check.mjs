// SEO check before publishing: `npm run build && npm run seo:check`.
//
// Starts the production build on a spare port, crawls every internal link
// like a search engine would, and reports:
//   errors   → must fix before launch (exit code 1)
//   warnings → worth fixing
// No dependencies: Node's built-in fetch plus simple HTML matching.

import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";

const PORT = 3199;
const BASE = `http://localhost:${PORT}`;
const MAX_PAGES = 300;

const errors = [];
const warnings = [];
const info = [];

// ---------- start the production server ----------
const server = spawn("npx", ["next", "start", "-p", String(PORT)], { shell: true, stdio: "ignore" });
const stopServer = () => {
  if (process.platform === "win32") spawn("taskkill", ["/pid", String(server.pid), "/t", "/f"], { stdio: "ignore" });
  else server.kill();
};

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(BASE);
      if (res.status < 500) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error("The server didn't start. Did you run `npm run build` first?");
}

// ---------- helpers ----------
const decode = (text) => text.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');
const match = (html, regex) => decode(html.match(regex)?.[1] ?? "").trim();
const pathOf = (url) => {
  try {
    const { pathname } = new URL(url, BASE);
    return pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  } catch {
    return url;
  }
};

function analyse(path, html) {
  const robots = match(html, /<meta name="robots" content="([^"]*)"/);
  return {
    path,
    title: match(html, /<title>([^<]*)<\/title>/),
    description: match(html, /<meta name="description" content="([^"]*)"/),
    canonical: match(html, /<link rel="canonical" href="([^"]*)"/),
    noindex: /noindex/.test(robots),
    h1Count: (html.match(/<h1[\s>]/g) ?? []).length,
    jsonLd: [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]),
    placeholders: /data-placeholder="photo"|Lorem ipsum/i.test(html),
    links: [...html.matchAll(/href="(\/[^"#?]*)/g)]
      .map((m) => pathOf(m[1]))
      .filter((link) => !link.startsWith("/_next") && !/\.[a-z0-9]{2,5}$/i.test(link)),
  };
}

// ---------- crawl ----------
async function crawl() {
  const sitemapXml = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const sitemapPaths = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => pathOf(m[1]));

  const queue = ["/", ...sitemapPaths];
  const seen = new Set();
  const pages = [];
  const linkedFrom = new Map();

  while (queue.length && seen.size < MAX_PAGES) {
    const path = queue.shift();
    if (seen.has(path)) continue;
    seen.add(path);

    const res = await fetch(BASE + path, { redirect: "manual" });
    if (res.status !== 200) {
      pages.push({ path, status: res.status });
      continue;
    }
    const page = { ...analyse(path, await res.text()), status: 200 };
    pages.push(page);
    for (const link of page.links) {
      if (!linkedFrom.has(link)) linkedFrom.set(link, new Set());
      linkedFrom.get(link).add(path);
      if (!seen.has(link)) queue.push(link);
    }
  }
  return { pages, sitemapPaths, linkedFrom };
}

// ---------- checks ----------
function check({ pages, sitemapPaths, linkedFrom }) {
  const ok = pages.filter((page) => page.status === 200);
  const indexable = ok.filter((page) => !page.noindex);

  // Links to pages that don't exist (yet)
  for (const page of pages.filter((p) => p.status !== 200)) {
    const from = [...(linkedFrom.get(page.path) ?? [])].slice(0, 3).join(", ");
    warnings.push(`Link to a missing page (${page.status}): ${page.path}  ← linked from ${from || "sitemap"}`);
  }

  for (const page of indexable) {
    if (!page.title) errors.push(`${page.path}: missing <title>`);
    else if (page.title.length > 65) warnings.push(`${page.path}: title is ${page.title.length} characters (Google shows ~60): "${page.title}"`);
    if (!page.description) errors.push(`${page.path}: missing meta description`);
    else if (page.description.length < 70 || page.description.length > 165)
      warnings.push(`${page.path}: description is ${page.description.length} characters (aim for 70–160)`);
    if (!page.canonical) errors.push(`${page.path}: missing canonical URL`);
    else if (pathOf(page.canonical) !== page.path)
      warnings.push(`${page.path}: canonical points elsewhere (${page.canonical})`);
    if (page.h1Count !== 1) warnings.push(`${page.path}: has ${page.h1Count} <h1> headings (should be exactly 1)`);
    if (page.placeholders) errors.push(`${page.path}: indexable page still shows placeholder content (Lorem ipsum / "Photo here")`);
  }

  for (const page of ok) {
    for (const block of page.jsonLd) {
      try {
        JSON.parse(block);
      } catch {
        errors.push(`${page.path}: invalid structured data (JSON-LD)`);
      }
    }
  }

  const duplicates = (key) => {
    const groups = new Map();
    for (const page of indexable) if (page[key]) groups.set(page[key], [...(groups.get(page[key]) ?? []), page.path]);
    for (const [value, paths] of groups) if (paths.length > 1) errors.push(`Duplicate ${key} on ${paths.join(", ")}: "${value}"`);
  };
  duplicates("title");
  duplicates("description");

  for (const path of sitemapPaths) {
    const page = pages.find((p) => p.path === path);
    if (!page || page.status !== 200) errors.push(`Sitemap lists ${path}, but it doesn't load`);
    else if (page.noindex) errors.push(`Sitemap lists ${path}, but the page is set to noindex`);
  }

  for (const page of ok.filter((p) => p.noindex)) info.push(`Hidden from Google (noindex): ${page.path}`);
  info.push(`Pages crawled: ${ok.length} · in sitemap: ${sitemapPaths.length} · indexable: ${indexable.length}`);
}

async function checkPlaceholderSwitches() {
  for (const [file, flag] of [
    ["config/projects.ts", "SHOW_PLACEHOLDER_PROJECTS"],
    ["content/blog/posts.ts", "SHOW_PLACEHOLDER_POSTS"],
  ]) {
    const source = await readFile(file, "utf8");
    if (new RegExp(`${flag}\\s*=\\s*true`).test(source)) warnings.push(`${flag} is still true in ${file} (example content is visible)`);
  }
}

// ---------- run ----------
try {
  await waitForServer();
  const robots = await (await fetch(`${BASE}/robots.txt`)).text();
  info.push(`robots.txt: ${robots.trim().replace(/\n+/g, " | ")}`);
  check(await crawl());
  await checkPlaceholderSwitches();
} catch (error) {
  errors.push(error.message);
} finally {
  stopServer();
}

const print = (label, items) => {
  if (!items.length) return;
  console.log(`\n${label} (${items.length})`);
  for (const item of items) console.log(`  - ${item}`);
};
print("ERRORS", errors);
print("WARNINGS", warnings);
print("INFO", info);
console.log(errors.length ? "\nSEO check failed." : "\nSEO check passed.");
process.exitCode = errors.length ? 1 : 0;
