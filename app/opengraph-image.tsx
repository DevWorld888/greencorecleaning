// Default social preview for every page that doesn't have its own.
import { ogSize, renderOgImage } from "@/lib/og-image";

export const alt = "GreenCoreCleaning: cleaning services in Hobart";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    title: "Home, Airbnb and end of lease cleaning in Hobart",
    subtitle: "Free, no-obligation quotes",
  });
}
