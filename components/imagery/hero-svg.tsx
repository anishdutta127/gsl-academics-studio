/**
 * Inline SVG illustrations for the top-right of hero sections. Each variant
 * is a small geometric composition in the GSL palette; no external fetch,
 * no library dependency, no photo stock. Restrained, not cartoonish. Every
 * SVG earns its place.
 *
 * The <HeroIllustration> wrapper positions the SVG absolutely at top-right
 * of its parent (which must be `position: relative`), hidden on mobile, and
 * sized for visual weight without dominating.
 */

type Variant =
  | "home"
  | "impact"
  | "schools"
  | "programmes"
  | "playbooks"
  | "skills";

interface Props {
  variant: Variant;
  className?: string;
}

export function HeroIllustration({ variant, className }: Props) {
  const SVG = SVGS[variant];
  return (
    <div
      aria-hidden="true"
      className={
        "pointer-events-none hidden md:block absolute top-6 right-6 md:top-8 md:right-8 lg:top-10 lg:right-10 opacity-90 " +
        (className ?? "")
      }
    >
      <SVG />
    </div>
  );
}

function Home() {
  // Mountain + sun composition. Turquoise mountains, Orange Peel sun, Azure
  // Blue accent. Fraunces-scale weight so it reads from across the room.
  return (
    <svg
      width="180"
      height="120"
      viewBox="0 0 180 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="130" cy="32" r="18" fill="#FFAD40" opacity="0.95" />
      <path
        d="M5 110 L50 40 L78 85 L98 60 L175 110 Z"
        fill="#00D8B9"
      />
      <path
        d="M50 40 L78 85 L98 60 L128 110 L5 110 Z"
        fill="#073393"
        opacity="0.35"
      />
      <path
        d="M50 40 L63 60 L43 60 Z"
        fill="white"
        opacity="0.85"
      />
    </svg>
  );
}

function Impact() {
  // Rising bars + ripple dot. Orange Peel bars on Light Sky backfield with
  // Fashion Fuchsia accent dot for the "wow" moment.
  return (
    <svg
      width="180"
      height="120"
      viewBox="0 0 180 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="8" y="78" width="22" height="32" rx="3" fill="#C3F8FF" />
      <rect x="38" y="58" width="22" height="52" rx="3" fill="#FFAD40" opacity="0.55" />
      <rect x="68" y="38" width="22" height="72" rx="3" fill="#FFAD40" opacity="0.8" />
      <rect x="98" y="22" width="22" height="88" rx="3" fill="#00D8B9" />
      <circle cx="145" cy="28" r="8" fill="#DE00A5" />
      <circle cx="145" cy="28" r="14" fill="none" stroke="#DE00A5" strokeOpacity="0.4" strokeWidth="1.5" />
      <circle cx="145" cy="28" r="20" fill="none" stroke="#DE00A5" strokeOpacity="0.2" strokeWidth="1.5" />
    </svg>
  );
}

function Schools() {
  // Cluster of building silhouettes. Varied heights and roof angles so it
  // reads as a small Indian cityscape, not a monolithic tower.
  return (
    <svg
      width="200"
      height="110"
      viewBox="0 0 200 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="10" y="55" width="30" height="55" rx="2" fill="#C3F8FF" />
      <path d="M10 55 L25 40 L40 55 Z" fill="#00D8B9" />
      <rect x="18" y="70" width="6" height="8" fill="white" />
      <rect x="26" y="70" width="6" height="8" fill="white" />
      <rect x="18" y="86" width="6" height="8" fill="white" />
      <rect x="26" y="86" width="6" height="8" fill="white" />

      <rect x="48" y="35" width="42" height="75" rx="2" fill="#073393" opacity="0.85" />
      <rect x="54" y="44" width="8" height="10" fill="#FFAD40" opacity="0.9" />
      <rect x="66" y="44" width="8" height="10" fill="#FFAD40" opacity="0.6" />
      <rect x="78" y="44" width="8" height="10" fill="#FFAD40" opacity="0.9" />
      <rect x="54" y="62" width="8" height="10" fill="#FFAD40" opacity="0.6" />
      <rect x="66" y="62" width="8" height="10" fill="#FFAD40" opacity="0.9" />
      <rect x="78" y="62" width="8" height="10" fill="#FFAD40" opacity="0.6" />
      <rect x="54" y="80" width="8" height="10" fill="#FFAD40" opacity="0.9" />
      <rect x="66" y="80" width="8" height="10" fill="#FFAD40" opacity="0.6" />
      <rect x="78" y="80" width="8" height="10" fill="#FFAD40" opacity="0.9" />

      <rect x="98" y="60" width="36" height="50" rx="2" fill="#C3F8FF" />
      <path d="M98 60 L116 46 L134 60 Z" fill="#00D8B9" />
      <rect x="110" y="88" width="12" height="22" fill="white" />

      <rect x="144" y="70" width="28" height="40" rx="2" fill="#00D8B9" opacity="0.6" />
      <rect x="150" y="78" width="4" height="4" fill="white" />
      <rect x="158" y="78" width="4" height="4" fill="white" />
      <rect x="166" y="78" width="4" height="4" fill="white" />
      <rect x="150" y="90" width="4" height="4" fill="white" />
      <rect x="158" y="90" width="4" height="4" fill="white" />
      <rect x="166" y="90" width="4" height="4" fill="white" />
    </svg>
  );
}

function Programmes() {
  // A path that climbs up. Turquoise steps on a soft Light Sky trail,
  // ending in a small Azure flag.
  return (
    <svg
      width="180"
      height="120"
      viewBox="0 0 180 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 110 Q 50 85 80 85 T 150 40"
        stroke="#C3F8FF"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="30" cy="100" r="10" fill="#00D8B9" />
      <circle cx="70" cy="85" r="10" fill="#00D8B9" opacity="0.7" />
      <circle cx="110" cy="65" r="10" fill="#00D8B9" opacity="0.85" />
      <circle cx="150" cy="40" r="14" fill="#FFAD40" />
      <rect x="148" y="10" width="2" height="30" fill="#073393" />
      <path d="M150 10 L170 18 L150 26 Z" fill="#073393" />
    </svg>
  );
}

function Playbooks() {
  // Stacked books with the top one open, Orange Peel covers, Azure pages.
  return (
    <svg
      width="180"
      height="120"
      viewBox="0 0 180 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="20" y="95" width="140" height="15" rx="2" fill="#073393" opacity="0.8" />
      <rect x="24" y="80" width="130" height="15" rx="2" fill="#FFAD40" opacity="0.9" />
      <rect x="16" y="65" width="136" height="15" rx="2" fill="#00D8B9" opacity="0.85" />
      <path
        d="M30 20 L90 12 L90 60 L30 65 Z"
        fill="#FFAD40"
      />
      <path
        d="M150 20 L90 12 L90 60 L150 65 Z"
        fill="#FFAD40"
        opacity="0.85"
      />
      <path
        d="M32 25 L90 18 L90 56 L32 60 Z"
        fill="white"
      />
      <path
        d="M148 25 L90 18 L90 56 L148 60 Z"
        fill="white"
        opacity="0.95"
      />
      <line x1="40" y1="32" x2="80" y2="28" stroke="#073393" strokeOpacity="0.3" strokeWidth="1.5" />
      <line x1="40" y1="40" x2="80" y2="36" stroke="#073393" strokeOpacity="0.3" strokeWidth="1.5" />
      <line x1="40" y1="48" x2="70" y2="45" stroke="#073393" strokeOpacity="0.3" strokeWidth="1.5" />
      <line x1="100" y1="28" x2="140" y2="32" stroke="#073393" strokeOpacity="0.3" strokeWidth="1.5" />
      <line x1="100" y1="36" x2="140" y2="40" stroke="#073393" strokeOpacity="0.3" strokeWidth="1.5" />
      <line x1="100" y1="45" x2="130" y2="48" stroke="#073393" strokeOpacity="0.3" strokeWidth="1.5" />
    </svg>
  );
}

function Skills() {
  // Network of nodes. Turquoise Sea nodes connected by soft Azure lines.
  // Reads as "interconnected frameworks", not a tech dashboard.
  return (
    <svg
      width="180"
      height="120"
      viewBox="0 0 180 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="40" y1="30" x2="90" y2="60" stroke="#073393" strokeOpacity="0.25" strokeWidth="1.5" />
      <line x1="90" y1="60" x2="150" y2="30" stroke="#073393" strokeOpacity="0.25" strokeWidth="1.5" />
      <line x1="90" y1="60" x2="50" y2="95" stroke="#073393" strokeOpacity="0.25" strokeWidth="1.5" />
      <line x1="90" y1="60" x2="140" y2="95" stroke="#073393" strokeOpacity="0.25" strokeWidth="1.5" />
      <line x1="40" y1="30" x2="90" y2="20" stroke="#073393" strokeOpacity="0.25" strokeWidth="1.5" />
      <line x1="150" y1="30" x2="90" y2="20" stroke="#073393" strokeOpacity="0.25" strokeWidth="1.5" />
      <circle cx="40" cy="30" r="10" fill="#00D8B9" />
      <circle cx="150" cy="30" r="10" fill="#00D8B9" />
      <circle cx="90" cy="20" r="8" fill="#FFAD40" />
      <circle cx="90" cy="60" r="14" fill="#073393" />
      <circle cx="50" cy="95" r="10" fill="#00D8B9" opacity="0.7" />
      <circle cx="140" cy="95" r="10" fill="#00D8B9" opacity="0.7" />
    </svg>
  );
}

const SVGS = {
  home: Home,
  impact: Impact,
  schools: Schools,
  programmes: Programmes,
  playbooks: Playbooks,
  skills: Skills
} as const;
