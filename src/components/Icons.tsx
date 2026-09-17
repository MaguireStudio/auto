import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function IconBolt(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" />
    </svg>
  );
}

export function IconPanel(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="4" y="2.5" width="16" height="19" rx="2" />
      <path d="M8 7h3M13 7h3M8 11h3M13 11h3M8 15h3M13 15h3" />
    </svg>
  );
}

export function IconGenerator(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="2.5" y="7" width="19" height="11" rx="2" />
      <path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2M12 10.5l-1.8 3h3.2l-1.6 3M6 18v2M18 18v2" />
    </svg>
  );
}

export function IconEv(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 17V9.5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2V17M3 17h10M3 17v2M13 17v2" />
      <path d="M2.5 12h11M16 20V9a2 2 0 0 1 2-2h1.5M19 7V4.5M8 10.5 6.8 12.6h2L7.6 14.7" />
    </svg>
  );
}

export function IconLight(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M9 18h6M10 21h4M12 2a6 6 0 0 0-3.5 10.9c.6.5.9 1.2.9 1.9V15h5.2v-.2c0-.7.3-1.4.9-1.9A6 6 0 0 0 12 2Z" />
    </svg>
  );
}

export function IconHouse(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 10.5 12 3l9 7.5M5.5 9.5V20a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.5" />
      <path d="M10 21v-5.5h4V21" />
    </svg>
  );
}

export function IconShield(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 2.5 4.5 5.5v6c0 4.5 3.1 8.6 7.5 10 4.4-1.4 7.5-5.5 7.5-10v-6L12 2.5Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function IconWater(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 2.5c3.5 4.2 5.5 7 5.5 9.8A5.5 5.5 0 0 1 12 18a5.5 5.5 0 0 1-5.5-5.7c0-2.8 2-5.6 5.5-9.8Z" />
      <path d="M3 21c1.5 0 1.5-1.2 3-1.2S7.5 21 9 21s1.5-1.2 3-1.2 1.5 1.2 3 1.2 1.5-1.2 3-1.2 1.5 1.2 3 1.2" />
    </svg>
  );
}

export function IconBuilding(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 21V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v17M15 10h4a1 1 0 0 1 1 1v10M2.5 21h19" />
      <path d="M7.5 7h2M7.5 11h2M7.5 15h2M11.5 7h1M11.5 11h1M11.5 15h1" />
    </svg>
  );
}

export function IconBlueprint(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="M2.5 9.5h19M8 9.5v10M8 14h6.5M14.5 14v5.5" />
    </svg>
  );
}

export function IconBulb(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3v2M4.2 6.2l1.4 1.4M19.8 6.2l-1.4 1.4M3 14h2M19 14h2" />
      <path d="M8.5 17.5a4.5 4.5 0 1 1 7 0c-.5.6-.8 1.2-.8 1.9V20h-5.4v-.6c0-.7-.3-1.3-.8-1.9Z" />
      <path d="M10 22h4" />
    </svg>
  );
}

export function IconBarn(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M2.5 9.5 12 3l9.5 6.5V21H2.5V9.5Z" />
      <path d="M9 21v-6h6v6M2.5 9.5 12 15l9.5-5.5" />
    </svg>
  );
}

export function IconPhone(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M5.5 3h3l1.5 4-2 1.3a12 12 0 0 0 5.7 5.7L15 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3Z" />
    </svg>
  );
}

export function IconMail(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m3 6 9 6.5L21 6" />
    </svg>
  );
}

export function IconPin(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 21.5s7-5.8 7-11a7 7 0 1 0-14 0c0 5.2 7 11 7 11Z" />
      <circle cx="12" cy="10.5" r="2.6" />
    </svg>
  );
}

export function IconClock(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </svg>
  );
}

export function IconCheck(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function IconArrow(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconAlert(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M10.3 3.9 2.6 17.2a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4M12 16.5v.5" />
    </svg>
  );
}

export function IconInstagram(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M16.9 7.1v.01" strokeWidth={2.2} />
    </svg>
  );
}

export function IconFacebook(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M14.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.6-1.6h1.7V3.2A21 21 0 0 0 15.3 3c-2.6 0-4.3 1.6-4.3 4.4v2.4H8.3V13H11v8h3.5Z" />
    </svg>
  );
}

const registry = {
  bolt: IconBolt,
  panel: IconPanel,
  generator: IconGenerator,
  ev: IconEv,
  light: IconLight,
  house: IconHouse,
  shield: IconShield,
  water: IconWater,
  building: IconBuilding,
  blueprint: IconBlueprint,
  bulb: IconBulb,
  barn: IconBarn,
} as const;

export function ServiceIcon({ name, ...rest }: { name: string } & IconProps) {
  const Cmp = registry[name as keyof typeof registry] ?? IconBolt;
  return <Cmp {...rest} />;
}
