export default function StatCard({ label, value, hint, tone = "electric" }) {
  const accents = {
    electric: "from-electric/25 to-transparent text-electric",
    danger: "from-danger/25 to-transparent text-danger",
    alert: "from-alert/25 to-transparent text-alert",
    safe: "from-safe/25 to-transparent text-safe",
  };

  return (
    <div className="glass-panel group relative overflow-hidden rounded-3xl p-5 transition duration-300 hover:-translate-y-1">
      <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-br ${accents[tone]} opacity-70`} />
      <div className="relative">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{label}</p>
        <p className="mt-5 text-4xl font-semibold text-white">{value}</p>
        <p className="mt-3 text-sm text-slate-400">{hint}</p>
      </div>
    </div>
  );
}
