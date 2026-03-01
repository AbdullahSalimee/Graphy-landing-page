"use client";

import useReveal from "./useReveal";

export default function CTA({ onLaunch }) {
  const ref = useReveal();
  return (
    <section className="relative z-10 px-8 py-36 text-center">
      {/* Radial glow */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse,rgba(56,189,248,0.07),transparent_70%)] pointer-events-none" />
      <div ref={ref}>
        <div className="font-mono text-[0.63rem] tracking-[0.16em] uppercase text-accent opacity-75 mb-8">
          Get started today
        </div>
        <h2
          className="font-playfair font-bold text-slate-200 tracking-tight leading-[0.97] mb-6"
          style={{ fontSize: "clamp(3rem,7vw,6.5rem)" }}
        >
          Start making
          <br />
          <em className="not-italic text-accent">beautiful charts</em>
          <br />
          right now.
        </h2>
        <p className="font-sans text-slate-400 leading-[1.8] mb-10">
          Free to use. No signup. 87 chart types. Instant results.
        </p>
        <button
          onClick={onLaunch}
          className="btn-sheen px-11 py-4 text-[1.05rem] bg-gradient-to-r from-sky-700 to-sky-600 text-white font-sans font-semibold rounded-xl tracking-wide shadow-[0_4px_32px_rgba(56,189,248,0.25)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_48px_rgba(56,189,248,0.35)]"
        >
          Launch Graphy AI →
        </button>
      </div>
    </section>
  );
}
