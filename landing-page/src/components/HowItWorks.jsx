"use client";
import { useEffect, useRef, useState } from "react";

// ─── SCROLL REVEAL HOOK ───────────────────────────────────────────────────────
function useReveal(threshold = 0.18) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── STEP ILLUSTRATIONS ───────────────────────────────────────────────────────

/** Step 01 — Upload / Add Data: animated file upload with rows populating */
function UploadIllustration({ active }) {
  const rows = [
    ["Product", "Q1", "Q2", "Q3"],
    ["Alpha", "$42k", "$55k", "$71k"],
    ["Beta", "$28k", "$44k", "$60k"],
    ["Gamma", "$19k", "$33k", "$52k"],
  ];
  return (
    <svg width="100%" height="100%" viewBox="0 0 340 240" fill="none">
      <defs>
        <linearGradient id="u-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d1b2e" />
          <stop offset="100%" stopColor="#060d18" />
        </linearGradient>
        <linearGradient id="u-accent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <filter id="u-glow">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="u-card">
          <feDropShadow
            dx="0"
            dy="8"
            stdDeviation="16"
            floodColor="#000"
            floodOpacity="0.55"
          />
        </filter>
        <clipPath id="u-clip">
          <rect x="50" y="30" width="240" height="190" rx="14" />
        </clipPath>
      </defs>

      {/* Card */}
      <rect
        x="50"
        y="30"
        width="240"
        height="190"
        rx="14"
        fill="url(#u-bg)"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
        filter="url(#u-card)"
      />

      {/* Top chrome bar */}
      <rect x="50" y="30" width="240" height="36" rx="14" fill="#040b14" />
      <rect x="50" y="52" width="240" height="14" fill="#040b14" />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={66 + i * 14}
          cy={48}
          r="4.5"
          fill={["#ff5f57", "#febc2e", "#28c840"][i]}
          opacity="0.85"
        />
      ))}
      <text
        x="170"
        y="52"
        textAnchor="middle"
        fontSize="8.5"
        fontWeight="600"
        fill="rgba(148,163,184,0.5)"
        fontFamily="'JetBrains Mono', monospace"
      >
        data.csv — Graphy
      </text>

      {/* Drop zone */}
      <rect
        x="70"
        y="76"
        width="200"
        height="68"
        rx="10"
        fill="rgba(6,182,212,0.04)"
        stroke={active ? "#06b6d4" : "rgba(255,255,255,0.08)"}
        strokeWidth="1.2"
        strokeDasharray="5,4"
        style={{ transition: "stroke 0.6s" }}
      />

      {/* Upload arrow — bounces when active */}
      <g
        style={{
          transform: active ? "translateY(-3px)" : "translateY(0)",
          transition: "transform 0.5s ease",
        }}
      >
        <circle
          cx="170"
          cy="104"
          r="18"
          fill="rgba(6,182,212,0.1)"
          stroke="rgba(6,182,212,0.3)"
          strokeWidth="1"
        />
        <path
          d="M170 113 L170 97 M163 104 L170 97 L177 104"
          stroke="#06b6d4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <text
        x="170"
        y="132"
        textAnchor="middle"
        fontSize="7.5"
        fill="rgba(148,163,184,0.45)"
        fontFamily="'JetBrains Mono', monospace"
      >
        Drop CSV / JSON or paste data
      </text>

      {/* Table rows — stagger in when active */}
      {rows.map((row, ri) => (
        <g
          key={ri}
          style={{
            opacity: active ? 1 : 0,
            transform: active ? "translateY(0)" : "translateY(8px)",
            transition: `opacity 0.5s ${0.2 + ri * 0.12}s, transform 0.5s ${0.2 + ri * 0.12}s`,
          }}
        >
          <rect
            x="70"
            y={155 + ri * 15}
            width="200"
            height="14"
            rx="3"
            fill={ri === 0 ? "rgba(6,182,212,0.1)" : "rgba(255,255,255,0.03)"}
            stroke={ri === 0 ? "rgba(6,182,212,0.18)" : "none"}
            strokeWidth="0.5"
          />
          {row.map((cell, ci) => (
            <text
              key={ci}
              x={80 + ci * 52}
              y={165 + ri * 15}
              fontSize={ri === 0 ? 6.5 : 7}
              fontWeight={ri === 0 ? "700" : "400"}
              fill={ri === 0 ? "rgba(6,182,212,0.85)" : "rgba(203,213,225,0.6)"}
              fontFamily="'JetBrains Mono', monospace"
            >
              {cell}
            </text>
          ))}
        </g>
      ))}

      {/* Gradient accent line top */}
      <rect
        x="50"
        y="30"
        width="240"
        height="2"
        rx="1"
        fill="url(#u-accent)"
        opacity="0.6"
      />
    </svg>
  );
}

/** Step 02 — AI builds chart: animated bar chart drawing itself */
function AIIllustration({ active }) {
  const bars = [
    { h: 82, x: 58, color: "#06b6d4", label: "Jan" },
    { h: 55, x: 92, color: "#818cf8", label: "Feb" },
    { h: 95, x: 126, color: "#10b981", label: "Mar" },
    { h: 68, x: 160, color: "#f59e0b", label: "Apr" },
    { h: 78, x: 194, color: "#f43f5e", label: "May" },
    { h: 110, x: 228, color: "#06b6d4", label: "Jun" },
  ];
  const BASE = 185;

  return (
    <svg width="100%" height="100%" viewBox="0 0 340 240" fill="none">
      <defs>
        <linearGradient id="ai-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d1b2e" />
          <stop offset="100%" stopColor="#060d18" />
        </linearGradient>
        <filter id="ai-glow">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="ai-card">
          <feDropShadow
            dx="0"
            dy="8"
            stdDeviation="16"
            floodColor="#000"
            floodOpacity="0.55"
          />
        </filter>
        {bars.map((b, i) => (
          <linearGradient
            key={i}
            id={`ai-bar-${i}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor={b.color} stopOpacity="0.95" />
            <stop offset="100%" stopColor={b.color} stopOpacity="0.45" />
          </linearGradient>
        ))}
        <linearGradient id="ai-accent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      <rect
        x="50"
        y="30"
        width="240"
        height="190"
        rx="14"
        fill="url(#ai-bg)"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
        filter="url(#ai-card)"
      />
      <rect
        x="50"
        y="30"
        width="240"
        height="2"
        rx="1"
        fill="url(#ai-accent)"
        opacity="0.7"
      />

      {/* Chrome */}
      <rect x="50" y="30" width="240" height="36" rx="14" fill="#040b14" />
      <rect x="50" y="52" width="240" height="14" fill="#040b14" />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={66 + i * 14}
          cy={48}
          r="4.5"
          fill={["#ff5f57", "#febc2e", "#28c840"][i]}
          opacity="0.85"
        />
      ))}

      {/* AI badge */}
      <rect
        x="196"
        y="39"
        width="74"
        height="18"
        rx="9"
        fill="rgba(99,102,241,0.15)"
        stroke="rgba(99,102,241,0.35)"
        strokeWidth="0.8"
      />
      <circle cx="209" cy="48" r="3.5" fill="#818cf8" />
      <text
        x="218"
        y="52"
        fontSize="7"
        fontWeight="700"
        fill="rgba(167,139,250,0.9)"
        fontFamily="'JetBrains Mono', monospace"
      >
        AI Analyzing
      </text>

      {/* Grid lines */}
      {[0.25, 0.5, 0.75].map((f, i) => (
        <line
          key={i}
          x1="50"
          y1={BASE - f * 110}
          x2="290"
          y2={BASE - f * 110}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="0.7"
          strokeDasharray="4,4"
        />
      ))}
      <line
        x1="50"
        y1={BASE}
        x2="290"
        y2={BASE}
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="0.8"
      />

      {/* Bars — grow from bottom when active */}
      {bars.map((b, i) => (
        <g key={i}>
          <rect
            x={b.x}
            y={active ? BASE - b.h : BASE}
            width={22}
            height={active ? b.h : 0}
            rx="3"
            fill={`url(#ai-bar-${i})`}
            style={{
              transition: `y 0.7s ${0.15 + i * 0.1}s cubic-bezier(0.34,1.56,0.64,1), height 0.7s ${0.15 + i * 0.1}s cubic-bezier(0.34,1.56,0.64,1)`,
            }}
            filter="url(#ai-glow)"
          />
          {/* Highlight */}
          <rect
            x={b.x + 2}
            y={active ? BASE - b.h + 3 : BASE}
            width={5}
            height={active ? b.h * 0.4 : 0}
            rx="2"
            fill="rgba(255,255,255,0.18)"
            style={{
              transition: `y 0.7s ${0.15 + i * 0.1}s, height 0.7s ${0.15 + i * 0.1}s`,
            }}
          />
          <text
            x={b.x + 11}
            y={BASE + 11}
            textAnchor="middle"
            fontSize="6.5"
            fill="rgba(148,163,184,0.4)"
            fontFamily="'JetBrains Mono', monospace"
          >
            {b.label}
          </text>
        </g>
      ))}

      {/* Value badge on tallest bar */}
      <g
        style={{
          opacity: active ? 1 : 0,
          transform: active ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 0.5s 1s, transform 0.5s 1s",
        }}
      >
        <rect
          x={216}
          y={BASE - 110 - 22}
          width={42}
          height={18}
          rx={5}
          fill="rgba(6,182,212,0.15)"
          stroke="rgba(6,182,212,0.35)"
          strokeWidth="0.8"
        />
        <text
          x={237}
          y={BASE - 110 - 9}
          textAnchor="middle"
          fontSize="7.5"
          fontWeight="700"
          fill="#06b6d4"
          fontFamily="'JetBrains Mono', monospace"
        >
          +34.8%
        </text>
      </g>
    </svg>
  );
}

/** Step 03 — Export / Share: animated export panel with live link */
function ExportIllustration({ active }) {
  const formats = [
    { icon: "PNG", color: "#06b6d4", desc: "High-res image" },
    { icon: "SVG", color: "#8b5cf6", desc: "Vector file" },
    { icon: "CSV", color: "#10b981", desc: "Raw data" },
  ];

  // Animated donut
  const cx = 170,
    cy = 108,
    R = 42,
    r = 26;
  const segs = [
    { val: 130, c1: "#6366f1", c2: "#4338ca" },
    { val: 85, c1: "#06b6d4", c2: "#0e7490" },
    { val: 65, c1: "#10b981", c2: "#047857" },
    { val: 80, c1: "#f59e0b", c2: "#b45309" },
  ];
  const total = segs.reduce((s, x) => s + x.val, 0);
  let angle = -90;
  const paths = segs.map((s) => {
    const sweep = (s.val / total) * 360;
    const s1 = ((angle - 90) * Math.PI) / 180,
      e1 = ((angle + sweep - 90) * Math.PI) / 180;
    const x1o = cx + R * Math.cos(s1),
      y1o = cy + R * Math.sin(s1);
    const x2o = cx + R * Math.cos(e1),
      y2o = cy + R * Math.sin(e1);
    const x1i = cx + r * Math.cos(e1),
      y1i = cy + r * Math.sin(e1);
    const x2i = cx + r * Math.cos(s1),
      y2i = cy + r * Math.sin(s1);
    const large = sweep > 180 ? 1 : 0;
    const path = `M${x1o},${y1o} A${R},${R} 0 ${large},1 ${x2o},${y2o} L${x1i},${y1i} A${r},${r} 0 ${large},0 ${x2i},${y2i} Z`;
    angle += sweep;
    return { ...s, path };
  });

  return (
    <svg width="100%" height="100%" viewBox="0 0 340 240" fill="none">
      <defs>
        <linearGradient id="ex-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d1b2e" />
          <stop offset="100%" stopColor="#060d18" />
        </linearGradient>
        <filter id="ex-card">
          <feDropShadow
            dx="0"
            dy="8"
            stdDeviation="16"
            floodColor="#000"
            floodOpacity="0.55"
          />
        </filter>
        <filter id="ex-glow">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {segs.map((s, i) => (
          <linearGradient key={i} id={`ex-dg${i}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={s.c1} />
            <stop offset="100%" stopColor={s.c2} />
          </linearGradient>
        ))}
        <linearGradient id="ex-accent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      <rect
        x="50"
        y="30"
        width="240"
        height="190"
        rx="14"
        fill="url(#ex-bg)"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
        filter="url(#ex-card)"
      />
      <rect
        x="50"
        y="30"
        width="240"
        height="2"
        rx="1"
        fill="url(#ex-accent)"
        opacity="0.7"
      />

      {/* Chrome */}
      <rect x="50" y="30" width="240" height="36" rx="14" fill="#040b14" />
      <rect x="50" y="52" width="240" height="14" fill="#040b14" />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={66 + i * 14}
          cy={48}
          r="4.5"
          fill={["#ff5f57", "#febc2e", "#28c840"][i]}
          opacity="0.85"
        />
      ))}

      {/* Donut chart — appears when active */}
      {paths.map((s, i) => (
        <g
          key={i}
          style={{
            opacity: active ? 1 : 0,
            transform: active ? "scale(1)" : "scale(0.85)",
            transformOrigin: `${cx}px ${cy}px`,
            transition: `opacity 0.6s ${0.1 + i * 0.1}s, transform 0.6s ${0.1 + i * 0.1}s cubic-bezier(0.34,1.56,0.64,1)`,
          }}
        >
          <path
            d={s.path}
            fill={`url(#ex-dg${i})`}
            stroke="rgba(10,15,28,0.9)"
            strokeWidth="2"
            filter="url(#ex-glow)"
          />
        </g>
      ))}
      <circle cx={cx} cy={cy} r={r - 2} fill="#060d18" />
      <text
        x={cx}
        y={cy - 4}
        textAnchor="middle"
        fontSize="11"
        fontWeight="800"
        fill="white"
        style={{ opacity: active ? 1 : 0, transition: "opacity 0.5s 0.6s" }}
      >
        74%
      </text>
      <text
        x={cx}
        y={cy + 9}
        textAnchor="middle"
        fontSize="6"
        fill="rgba(148,163,184,0.6)"
        fontFamily="'JetBrains Mono', monospace"
        style={{ opacity: active ? 1 : 0, transition: "opacity 0.5s 0.7s" }}
      >
        Growth
      </text>

      {/* Export buttons row */}
      {formats.map((f, i) => (
        <g
          key={i}
          style={{
            opacity: active ? 1 : 0,
            transform: active ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 0.5s ${0.5 + i * 0.12}s, transform 0.5s ${0.5 + i * 0.12}s`,
          }}
        >
          <rect
            x={62 + i * 76}
            y={163}
            width={68}
            height={26}
            rx={7}
            fill={`rgba(${f.color === "#06b6d4" ? "6,182,212" : f.color === "#8b5cf6" ? "139,92,246" : "16,185,129"},0.1)`}
            stroke={`${f.color}44`}
            strokeWidth="1"
          />
          <text
            x={96 + i * 76}
            y={173}
            textAnchor="middle"
            fontSize="8"
            fontWeight="700"
            fill={f.color}
            fontFamily="'JetBrains Mono', monospace"
          >
            ↓ {f.icon}
          </text>
          <text
            x={96 + i * 76}
            y={183}
            textAnchor="middle"
            fontSize="5.5"
            fill="rgba(148,163,184,0.45)"
            fontFamily="'JetBrains Mono', monospace"
          >
            {f.desc}
          </text>
        </g>
      ))}

      {/* Share link bar */}
      <g
        style={{
          opacity: active ? 1 : 0,
          transform: active ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.5s 0.8s, transform 0.5s 0.8s",
        }}
      >
        <rect
          x="62"
          y="198"
          width="180"
          height="18"
          rx="5"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="0.8"
        />
        <circle cx="73" cy="207" r="3.5" fill="rgba(40,200,64,0.7)" />
        <text
          x="82"
          y="211"
          fontSize="6.5"
          fill="rgba(148,163,184,0.4)"
          fontFamily="'JetBrains Mono', monospace"
        >
          graphy.ai/share/q7xkp2
        </text>
        <rect
          x="218"
          y="200"
          width="22"
          height="14"
          rx="4"
          fill="rgba(6,182,212,0.15)"
          stroke="rgba(6,182,212,0.3)"
          strokeWidth="0.7"
        />
        <text
          x="229"
          y="210"
          textAnchor="middle"
          fontSize="6"
          fontWeight="700"
          fill="#06b6d4"
          fontFamily="'JetBrains Mono', monospace"
        >
          Copy
        </text>
      </g>
    </svg>
  );
}

// ─── STEPS DATA ───────────────────────────────────────────────────────────────
const STEPS = [
  {
    n: "01",
    title: "Add your data",
    flip: false,
    tag: "Data Input",
    accent: "#06b6d4",
    body: "Upload CSV or JSON, paste values, or describe what you want. No formatting required — Graphy AI reads every row and extracts exact values automatically.",
    Illustration: UploadIllustration,
  },
  {
    n: "02",
    title: "Let AI work its magic",
    flip: true,
    tag: "AI Engine",
    accent: "#818cf8",
    body: "Our AI inspects your dataset and builds the perfect visualization — right chart type, right colors, right labels. Ask for changes in plain English and watch it update live.",
    Illustration: AIIllustration,
  },
  {
    n: "03",
    title: "Share & export instantly",
    flip: false,
    tag: "Export",
    accent: "#10b981",
    body: "Download high-resolution PNG, scalable SVG, raw CSV, or share a live link anyone can view. Your data, looking its absolute best, in under two seconds.",
    Illustration: ExportIllustration,
  },
];

// ─── CONNECTOR LINE ───────────────────────────────────────────────────────────
function Connector({ accent }) {
  return (
    <div className="flex justify-center my-2" style={{ height: 48 }}>
      <div
        style={{
          width: 2,
          height: "100%",
          background: `linear-gradient(to bottom, ${accent}88, transparent)`,
          borderRadius: 99,
        }}
      />
    </div>
  );
}

// ─── STEP ROW ─────────────────────────────────────────────────────────────────
function StepRow({ step, index }) {
  const [textRef, textVisible] = useReveal(0.15);
  const [vizRef, vizVisible] = useReveal(0.15);
  const { Illustration, flip, accent } = step;

  const slideText = flip
    ? {
        opacity: textVisible ? 1 : 0,
        transform: textVisible ? "translateX(0)" : "translateX(40px)",
        transition:
          "opacity 0.75s 0.1s, transform 0.75s 0.1s cubic-bezier(0.16,1,0.3,1)",
      }
    : {
        opacity: textVisible ? 1 : 0,
        transform: textVisible ? "translateX(0)" : "translateX(-40px)",
        transition:
          "opacity 0.75s 0.1s, transform 0.75s 0.1s cubic-bezier(0.16,1,0.3,1)",
      };
  const slideViz = flip
    ? {
        opacity: vizVisible ? 1 : 0,
        transform: vizVisible ? "translateX(0)" : "translateX(-40px)",
        transition:
          "opacity 0.75s 0.2s, transform 0.75s 0.2s cubic-bezier(0.16,1,0.3,1)",
      }
    : {
        opacity: vizVisible ? 1 : 0,
        transform: vizVisible ? "translateX(0)" : "translateX(40px)",
        transition:
          "opacity 0.75s 0.2s, transform 0.75s 0.2s cubic-bezier(0.16,1,0.3,1)",
      };

  return (
    <div
      className={`flex items-center gap-12 flex-wrap ${flip ? "flex-row-reverse" : ""}`}
      style={{ marginBottom: "4.5rem" }}
    >
      {/* Text block */}
      <div ref={textRef} className="flex-1 basis-[280px]" style={slideText}>
        {/* Step badge */}
        <div className="flex items-center gap-3 mb-5">
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: `${accent}18`,
              border: `1.5px solid ${accent}44`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                fontWeight: 800,
                color: accent,
              }}
            >
              {step.n}
            </span>
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: `${accent}bb`,
              fontWeight: 600,
            }}
          >
            {step.tag}
          </span>
        </div>

        {/* Big ghost number */}
        <div
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(4rem,9vw,6rem)",
            fontWeight: 900,
            lineHeight: 1,
            color: "rgba(255,255,255,0.04)",
            marginBottom: "-0.5rem",
            letterSpacing: "-0.02em",
            userSelect: "none",
          }}
        >
          {step.n}
        </div>

        <h3
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.7rem,3.2vw,2.4rem)",
            fontWeight: 800,
            color: "rgba(226,232,240,0.95)",
            lineHeight: 1.1,
            marginBottom: "1rem",
            letterSpacing: "-0.015em",
          }}
        >
          {step.title.split(" ").map((w, wi) =>
            wi === (flip ? 0 : step.title.split(" ").length - 1) ? (
              <em key={wi} style={{ fontStyle: "normal", color: accent }}>
                {w}{" "}
              </em>
            ) : (
              <span key={wi}>{w} </span>
            ),
          )}
        </h3>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.96rem",
            color: "rgba(148,163,184,0.85)",
            lineHeight: 1.85,
            maxWidth: 380,
          }}
        >
          {step.body}
        </p>

        {/* Mini CTA pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginTop: "1.6rem",
            padding: "8px 18px",
            background: `${accent}12`,
            border: `1px solid ${accent}30`,
            borderRadius: 99,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: `${accent}cc`,
            textTransform: "uppercase",
            cursor: "default",
          }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8">
            <circle cx="4" cy="4" r="3" fill={accent} opacity="0.7" />
          </svg>
          {step.n === "01"
            ? "Supports 12+ formats"
            : step.n === "02"
              ? "87 chart types"
              : "Share in one click"}
        </div>
      </div>

      {/* Illustration card */}
      <div ref={vizRef} style={slideViz} className="flex-1 basis-[340px]">
        <div
          style={{
            position: "relative",
            borderRadius: 18,
            border: "1px solid rgba(255,255,255,0.07)",
            background: "linear-gradient(145deg, #0a1628 0%, #060d18 100%)",
            boxShadow: `0 30px 100px rgba(0,0,0,0.6), 0 0 0 1px ${accent}18, inset 0 1px 0 rgba(255,255,255,0.04)`,
            overflow: "hidden",
            aspectRatio: "340/240",
            transition: "box-shadow 0.4s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = `0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px ${accent}40, 0 0 40px ${accent}18, inset 0 1px 0 rgba(255,255,255,0.06)`)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow = `0 30px 100px rgba(0,0,0,0.6), 0 0 0 1px ${accent}18, inset 0 1px 0 rgba(255,255,255,0.04)`)
          }
        >
          {/* Radial glow behind */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: `radial-gradient(ellipse at 50% 0%, ${accent}10 0%, transparent 65%)`,
            }}
          />
          {/* Top accent line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              borderRadius: 2,
              background: `linear-gradient(to right, transparent, ${accent}99, transparent)`,
            }}
          />
          <Illustration active={vizVisible} />
        </div>
      </div>
    </div>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────
export default function HowItWorks() {
  const [headRef, headVisible] = useReveal(0.2);

  return (
    <section
      style={{
        position: "relative",
        zIndex: 10,
        padding: "7rem 2rem 6rem",
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      {/* Section header */}
      <div
        ref={headRef}
        style={{
          textAlign: "center",
          marginBottom: "5rem",
          opacity: headVisible ? 1 : 0,
          transform: headVisible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.8s, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: "1.2rem",
            padding: "6px 18px",
            borderRadius: 99,
            background: "rgba(6,182,212,0.07)",
            border: "1px solid rgba(6,182,212,0.2)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            color: "rgba(6,182,212,0.8)",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#06b6d4",
              boxShadow: "0 0 8px #06b6d4",
              animation: "pulse 1.8s infinite",
            }}
          />
          How it works
        </div>

        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2.2rem,5vw,3.8rem)",
            fontWeight: 900,
            color: "rgba(226,232,240,0.95)",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            marginBottom: "1.1rem",
          }}
        >
          Three steps to{" "}
          <em
            style={{
              fontStyle: "normal",
              background: "linear-gradient(135deg, #06b6d4, #818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            clarity
          </em>
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1rem",
            color: "rgba(148,163,184,0.7)",
            lineHeight: 1.8,
            maxWidth: 440,
            margin: "0 auto",
          }}
        >
          From raw data to a chart you're proud to share — in under a minute.
        </p>
      </div>

      {/* Steps */}
      {STEPS.map((s, i) => (
        <div key={s.n}>
          <StepRow step={s} index={i} />
          {i < STEPS.length - 1 && <Connector accent={STEPS[i + 1].accent} />}
        </div>
      ))}

      <style>{`
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.5; transform:scale(1.4); }
        }
      `}</style>
    </section>
  );
}
