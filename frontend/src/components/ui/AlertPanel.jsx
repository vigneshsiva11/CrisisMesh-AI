export default function AlertPanel({
  victims = [],
  eyebrow = "Priority Queue",
  title = "Priority-1 Victims",
}) {
  return (
    <div className="glass-panel rounded-3xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-danger/80">{eyebrow}</p>
          <h3 className="mt-1 text-xl font-semibold text-white">{title}</h3>
        </div>
        <span className="rounded-full border border-danger/30 bg-danger/10 px-3 py-1 text-xs text-danger">
          Auto-updating
        </span>
      </div>

      <div className="scrollbar-thin max-h-[26rem] space-y-3 overflow-y-auto pr-1">
        {victims.map((victim) => (
          <div
            key={victim.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-danger/30 hover:bg-white/10"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">{victim.id}</p>
                <p className="mt-1 text-xs text-slate-400">
                  {victim.coordinates.lat.toFixed(4)}, {victim.coordinates.lng.toFixed(4)}
                </p>
              </div>
              <span className="rounded-full border border-alert/30 bg-alert/10 px-2 py-1 text-xs text-alert">
                Urgency {victim.urgencyScore}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-midnight/50 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Signal</p>
                <p className="mt-1 font-medium text-white">{victim.signalStrength}%</p>
              </div>
              <div className="rounded-2xl bg-midnight/50 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Drone</p>
                <p className="mt-1 font-medium text-white">{victim.detectedBy || "Unknown Unit"}</p>
              </div>
            </div>
          </div>
        ))}

        {!victims.length && (
          <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-slate-400">
            No active Priority-1 victims in the current feed.
          </div>
        )}
      </div>
    </div>
  );
}
