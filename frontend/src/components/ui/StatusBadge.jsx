export default function StatusBadge({ label, tone = "info", pulse = false }) {
  const tones = {
    info: "border-electric/30 bg-electric/10 text-electric",
    danger: "border-danger/30 bg-danger/10 text-danger",
    alert: "border-alert/30 bg-alert/10 text-alert",
    safe: "border-safe/30 bg-safe/10 text-safe",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${tones[tone]} ${
        pulse ? "animate-pulse-soft" : ""
      }`}
    >
      <span className="h-2 w-2 rounded-full bg-current" />
      {label}
    </span>
  );
}
