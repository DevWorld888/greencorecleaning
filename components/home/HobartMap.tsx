import { serviceAreaHref, serviceAreas } from "@/config/service-areas";
import { hobartMap } from "@/data/hobart-map";

// Real suburb boundaries drawn as an SVG, so the map is sharp at any size,
// loads no third-party scripts and stays in brand colours.
//
// The geometry is drawn once (<defs>) and shown by two <svg>s: one sized to
// the free space beside the desktop card, one above the card on mobile. Each
// sets its own pin and label size for its scale.

// Frames the serviced suburbs (plus room for their labels); everything around
// them is still drawn, so the map always reaches the section edges.
const viewBox = "638 497 750 620";

const servedNames = new Set(serviceAreas.map((area) => area.name));
const mapLabel = `Map of Hobart showing the suburbs we service: ${serviceAreas
  .map((area) => area.name)
  .join(", ")}`;

function Pins({ size }: { size: number }) {
  return serviceAreas.map((area) => {
    const suburb = hobartMap.suburbs[area.name];
    if (!suburb) return null;
    const [x, y] = suburb.centre;
    const font = size * 0.62;
    const labelWidth = area.name.length * font * 0.56 + font * 1.6;
    const labelHeight = font * 2;

    // Pins are a mouse shortcut only: the card list holds the same links for
    // keyboard and screen-reader users, so pins stay out of the tab order.
    return (
      <a
        key={area.slug}
        href={serviceAreaHref(area)}
        tabIndex={-1}
        aria-hidden="true"
        className="group cursor-pointer"
      >
        <g transform={`translate(${x} ${y})`}>
          {/* Pin, tip at the suburb centre */}
          <path
            d={`M0 0C${-size * 0.12} ${-size * 0.35} ${-size * 0.5} ${-size * 0.6} ${-size * 0.5} ${-size} A${size * 0.5} ${size * 0.5} 0 1 1 ${size * 0.5} ${-size} C${size * 0.5} ${-size * 0.6} ${size * 0.12} ${-size * 0.35} 0 0Z`}
            className="fill-action transition-colors group-hover:fill-primary"
          />
          <circle cy={-size} r={size * 0.2} className="fill-white" />
          {/* Label */}
          <g transform={`translate(0 ${labelHeight * 0.75})`}>
            <rect
              x={-labelWidth / 2}
              y={0}
              width={labelWidth}
              height={labelHeight}
              rx={labelHeight / 2}
              className="fill-white"
              style={{ filter: "drop-shadow(0 2px 4px rgb(15 69 87 / 0.18))" }}
            />
            <text
              y={labelHeight / 2}
              dominantBaseline="central"
              textAnchor="middle"
              fontSize={font}
              className="fill-primary font-display font-bold"
            >
              {area.name}
            </text>
          </g>
        </g>
      </a>
    );
  });
}

export function HobartMap() {
  return (
    <>
      <svg aria-hidden="true" className="absolute size-0 overflow-hidden">
        <defs>
          <g id="hobart-map-base">
            <rect x="-1000" y="-1000" width="4000" height="4000" className="fill-water" />
            {Object.entries(hobartMap.suburbs).map(([name, suburb]) => (
              <path
                key={name}
                d={suburb.d}
                vectorEffect="non-scaling-stroke"
                className={
                  servedNames.has(name)
                    ? "fill-secondary-light/50 stroke-action [stroke-width:2]"
                    : "fill-land stroke-[#dfe8dc] [stroke-width:1]"
                }
              />
            ))}
          </g>
        </defs>
      </svg>

      {/* Desktop: the serviced suburbs fit the free space left of the card;
          overflow-visible keeps drawing the surrounding map to the edges. */}
      <div className="absolute inset-y-16 left-[max(4rem,calc((100%-80rem)/2+4rem))] right-[calc(max(4rem,calc((100%-80rem)/2+4rem))+29rem)] hidden xl:block">
        <svg role="img" aria-label={mapLabel} viewBox={viewBox} overflow="visible" className="size-full">
          <use href="#hobart-map-base" />
          <RiverLabel size={15} />
          <Pins size={30} />
        </svg>
      </div>

      {/* Mobile and tablet: the same framing, above the card */}
      <div className="absolute inset-x-5 top-6 bottom-10 xl:hidden">
        <svg role="img" aria-label={mapLabel} viewBox={viewBox} overflow="visible" className="size-full">
          <use href="#hobart-map-base" />
          <RiverLabel size={22} />
          <Pins size={52} />
        </svg>
      </div>
    </>
  );
}

function RiverLabel({ size }: { size: number }) {
  const [x, y] = hobartMap.riverLabel;
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize={size}
      letterSpacing={size * 0.4}
      className="fill-primary/45 font-display font-semibold italic"
    >
      RIVER DERWENT
    </text>
  );
}
