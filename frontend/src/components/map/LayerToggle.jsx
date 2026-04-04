export default function LayerToggle({ options, onChange }) {
  return (
    <div className="glass-panel absolute right-4 top-4 z-[700] w-56 rounded-2xl p-4">
      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Map Layers</p>
      <div className="mt-3 space-y-3">
        {options.map((option) => (
          <label key={option.key} className="flex items-center justify-between gap-3 text-sm text-slate-200">
            <span>{option.label}</span>
            <input
              type="checkbox"
              checked={option.enabled}
              onChange={() => onChange(option.key)}
              className="h-4 w-4 rounded border-white/20 bg-transparent text-electric focus:ring-electric"
            />
          </label>
        ))}
      </div>
    </div>
  );
}
