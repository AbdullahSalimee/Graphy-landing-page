const LINKS = ["Terms", "Privacy", "Blog"];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-accent/10 px-10 py-10 flex items-center justify-between flex-wrap gap-4 bg-gradient-to-b from-transparent to-panel/60">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-[26px] h-[26px] rounded-[7px] bg-gradient-to-br from-sky-700 to-violet-700 flex items-center justify-center text-[0.7rem]">
          📊
        </div>
        <span className="font-playfair font-bold text-[0.95rem] text-slate-400">
          Graph<span className="text-accent">AI</span>
        </span>
      </div>

      <div className="font-mono text-[0.65rem] text-slate-700 tracking-wide">
        Powered by Groq · Llama 3.3-70B · Plotly.js · React · © 2026
      </div>

      <div className="flex gap-6">
        {LINKS.map((l) => (
          <span
            key={l}
            className="font-mono text-[0.65rem] text-slate-700 tracking-wide cursor-pointer hover:text-slate-400 transition-colors duration-200"
          >
            {l}
          </span>
        ))}
      </div>
    </footer>
  );
}
