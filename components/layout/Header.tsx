import { getImageProps } from "next/image";
import Link from "next/link";
import logo from "@/public/images/logo/logo-trimmed.png";
import logoSmall from "@/public/images/logo/logosmall-trimmed.png";
import { mainNav, navCta } from "@/config/navigation";
import { HeaderNav } from "./HeaderNav";

// Art direction: icon-only logo on small screens, full wordmark from md up.
// The browser downloads only the version that matches.
function Logo() {
  const sizes = "260px";
  const common = { alt: "GreenCoreCleaning", sizes, fetchPriority: "high" as const };
  const {
    props: { srcSet: fullSrcSet },
  } = getImageProps({ ...common, src: logo });
  const { props: iconProps } = getImageProps({ ...common, src: logoSmall });

  return (
    <picture>
      <source
        media="(min-width: 768px)"
        srcSet={fullSrcSet}
        sizes={sizes}
        width={logo.width}
        height={logo.height}
      />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
      <img {...iconProps} className="h-10 w-auto md:h-11 lg:h-14" />
    </picture>
  );
}

// Transparent header that sits over the hero photo.
export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="relative mx-auto flex h-20 max-w-site items-center justify-between gap-6 px-5 md:px-10 lg:h-24 lg:px-16">
        <Link href="/" aria-label="GreenCoreCleaning home" className="shrink-0">
          <Logo />
        </Link>

        <HeaderNav items={mainNav} cta={navCta} />
      </div>
    </header>
  );
}
