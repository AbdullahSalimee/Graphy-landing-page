"use client";

import useReveal from "./useReveal";

const TESTI = [
  {
    name: "Sarah Chen",
    role: "Head of Analytics · Stripe",
    text: "I went from hours of Excel hell to a beautiful chart in 30 seconds. Absolute game changer.",
  },
  {
    name: "Marcus Reid",
    role: "CEO · Launchpad Ventures",
    text: "Our board presentations look like they came from a design agency. Nobody believes we made them ourselves.",
  },
  {
    name: "Aisha Kamara",
    role: "Data Lead · Shopify",
    text: "The AI understands my data intuitively. It picked the right chart type before I even had to ask.",
  },
  {
    name: "Tom Nguyen",
    role: "Founder · Clearpath",
    text: "5 days of reporting done in 4 hours. My team thought I'd hired a data scientist.",
  },
  {
    name: "Priya Sharma",
    role: "Product Manager · Linear",
    text: "Finally a tool that makes data beautiful without requiring a PhD in design.",
  },
  {
    name: "James Okafor",
    role: "CFO · Seedbank",
    text: "Our investors commented on how clear and beautiful our charts were. Never happened before.",
  },
];
const HUES = [210, 260, 180, 220, 300, 170];

function TestiCard({ t, i }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="relative bg-gradient-to-br from-surface to-panel border border-accent/10 rounded-2xl p-7 overflow-hidden transition-all duration-300 hover:border-accent/20 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] group"
      style={{ transitionDelay: `${i * 0.07}s` }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
      <div className="text-accent text-[0.8rem] tracking-widest mb-4">
        ★★★★★
      </div>
      <p className="font-playfair italic text-slate-400 leading-[1.7] mb-5">
        "{t.text}"
      </p>
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center font-sans text-[0.88rem] font-bold text-white shrink-0"
          style={{
            background: `hsl(${HUES[i]},60%,35%)`,
            border: `1px solid hsl(${HUES[i]},60%,45%)`,
          }}
        >
          {t.name[0]}
        </div>
        <div>
          <div className="font-sans text-[0.84rem] font-semibold text-slate-200">
            {t.name}
          </div>
          <div className="font-mono text-[0.65rem] text-slate-700 tracking-wide">
            {t.role}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const ref = useReveal();
  return (
    <section className="relative z-10 px-8 py-24 bg-gradient-to-b from-panel to-deep">
      <div ref={ref} className="text-center mb-16">
        <div className="font-mono text-[0.63rem] tracking-[0.16em] uppercase text-accent opacity-75 mb-5">
          Wall of love
        </div>
        <h2
          className="font-playfair font-bold text-slate-200 tracking-tight leading-[1.1] mb-5"
          style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)" }}
        >
          Loved by <em className="not-italic text-accent">data people</em>
        </h2>
        <p className="font-sans text-slate-400 leading-[1.8] max-w-[400px] mx-auto">
          Join thousands who've made data storytelling effortless.
        </p>
      </div>
      <div
        className="grid gap-5 max-w-[1100px] mx-auto"
        style={{ gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))" }}
      >
        {TESTI.map((t, i) => (
          <TestiCard key={i} t={t} i={i} />
        ))}
      </div>
    </section>
  );
}
