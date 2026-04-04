function formatCountdown(seconds) {
  const safeSeconds = Math.max(0, seconds);
  const hours = String(Math.floor(safeSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((safeSeconds % 3600) / 60)).padStart(2, "0");
  const remainingSeconds = String(safeSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${remainingSeconds}`;
}

export default function TimerCard({ seconds }) {
  const critical = seconds < 20 * 60;

  return (
    <div className="glass-panel relative overflow-hidden rounded-3xl p-5">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-danger to-transparent" />
      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Golden Hour Countdown</p>
      <div className="mt-5 flex items-end justify-between gap-4">
        <div>
          <p className={`text-4xl font-semibold ${critical ? "text-danger" : "text-white"}`}>
            {formatCountdown(seconds)}
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Priority-1 rescue window before survivability confidence drops sharply.
          </p>
        </div>
        <div className={`h-14 w-14 rounded-2xl ${critical ? "bg-danger/20" : "bg-electric/15"}`} />
      </div>
    </div>
  );
}
