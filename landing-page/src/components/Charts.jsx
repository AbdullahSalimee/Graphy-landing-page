// ── Shared mini SVG charts used across Hero, Marquee & HowItWorks ──

export function BarSVG() {
  const bars = [
    { h: 52, c: "#60a5fa" },
    { h: 76, c: "#34d399" },
    { h: 60, c: "#f472b6" },
    { h: 88, c: "#fbbf24" },
    { h: 68, c: "#a78bfa" },
    { h: 82, c: "#fb7185" },
    { h: 44, c: "#38bdf8" },
  ];
  return (
    <svg viewBox="0 0 200 115" style={{ width: "100%", height: "100%" }}>
      <text
        x="8"
        y="13"
        fontSize="7.5"
        fill="rgba(232,237,248,0.55)"
        fontFamily="DM Sans"
        fontWeight="600"
      >
        Revenue by Quarter
      </text>
      {bars.map((b, i) => (
        <g key={i}>
          <rect
            x={12 + i * 26}
            y={98 - b.h}
            width={18}
            height={b.h}
            rx="2.5"
            fill={b.c}
            opacity="0.15"
          />
          <rect
            x={12 + i * 26}
            y={98 - b.h}
            width={18}
            height={b.h}
            rx="2.5"
            fill="none"
            stroke={b.c}
            strokeWidth="1"
            opacity="0.7"
          />
          <rect
            x={12 + i * 26}
            y={98 - b.h}
            width={18}
            height="2.5"
            rx="1"
            fill={b.c}
            opacity="1"
          />
        </g>
      ))}
      <line
        x1="8"
        y1="98"
        x2="192"
        y2="98"
        stroke="rgba(56,189,248,0.15)"
        strokeWidth="1"
      />
    </svg>
  );
}

export function LineSVG() {
  const pts = [
    [12, 78],
    [38, 55],
    [64, 68],
    [90, 32],
    [116, 48],
    [142, 18],
    [168, 30],
  ];
  const d = `M${pts.map((p) => p.join(",")).join(" L")}`;
  const area = `${d} L168,92 L12,92 Z`;
  const cols = [
    "#60a5fa",
    "#34d399",
    "#f472b6",
    "#fbbf24",
    "#a78bfa",
    "#fb7185",
    "#38bdf8",
  ];
  return (
    <svg viewBox="0 0 200 108" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="lsvg-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <text
        x="8"
        y="13"
        fontSize="7.5"
        fill="rgba(232,237,248,0.55)"
        fontFamily="DM Sans"
        fontWeight="600"
      >
        Monthly Growth
      </text>
      <path d={area} fill="url(#lsvg-g)" />
      <path
        d={d}
        fill="none"
        stroke="#38bdf8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p[0]} cy={p[1]} r="4.5" fill={cols[i]} opacity="0.15" />
          <circle cx={p[0]} cy={p[1]} r="2.5" fill={cols[i]} />
          <circle cx={p[0]} cy={p[1]} r="1" fill="#fff" opacity="0.9" />
        </g>
      ))}
    </svg>
  );
}

export function DonutSVG() {
  const cx = 60,
    cy = 64,
    r = 40,
    ir = 24;
  const slices = [
    { s: -1.571, e: 0.571, c: "#38bdf8" },
    { s: 0.571, e: 2.285, c: "#a78bfa" },
    { s: 2.285, e: 3.713, c: "#34d399" },
    { s: 3.713, e: 4.712, c: "#f472b6" },
  ];
  return (
    <svg viewBox="0 0 200 128" style={{ width: "100%", height: "100%" }}>
      <text
        x="8"
        y="13"
        fontSize="7.5"
        fill="rgba(232,237,248,0.55)"
        fontFamily="DM Sans"
        fontWeight="600"
      >
        Market Share 2024
      </text>
      {slices.map((s, i) => {
        const x1o = cx + r * Math.cos(s.s),
          y1o = cy + r * Math.sin(s.s);
        const x2o = cx + r * Math.cos(s.e),
          y2o = cy + r * Math.sin(s.e);
        const x1i = cx + ir * Math.cos(s.e),
          y1i = cy + ir * Math.sin(s.e);
        const x2i = cx + ir * Math.cos(s.s),
          y2i = cy + ir * Math.sin(s.s);
        const lg = s.e - s.s > Math.PI ? 1 : 0;
        return (
          <g key={i}>
            <path
              d={`M${x1o},${y1o} A${r},${r} 0 ${lg} 1 ${x2o},${y2o} L${x1i},${y1i} A${ir},${ir} 0 ${lg} 0 ${x2i},${y2i}Z`}
              fill={s.c}
              opacity="0.15"
            />
            <path
              d={`M${x1o},${y1o} A${r},${r} 0 ${lg} 1 ${x2o},${y2o} L${x1i},${y1i} A${ir},${ir} 0 ${lg} 0 ${x2i},${y2i}Z`}
              fill="none"
              stroke={s.c}
              strokeWidth="1.2"
              opacity="0.75"
            />
          </g>
        );
      })}
      <text
        x={cx}
        y={cy + 4}
        fontSize="8"
        fill="rgba(232,237,248,0.7)"
        textAnchor="middle"
        fontFamily="DM Mono"
      >
        Sales
      </text>
      {[
        ["#38bdf8", "Series A"],
        ["#a78bfa", "Series B"],
        ["#34d399", "Series C"],
        ["#f472b6", "Other"],
      ].map(([c, l], i) => (
        <g key={i}>
          <rect
            x="115"
            y={22 + i * 19}
            width="7"
            height="7"
            rx="2"
            fill={c}
            opacity="0.8"
          />
          <text
            x="127"
            y={30 + i * 19}
            fontSize="6.5"
            fill="rgba(232,237,248,0.45)"
            fontFamily="DM Mono"
          >
            {l}
          </text>
        </g>
      ))}
    </svg>
  );
}
