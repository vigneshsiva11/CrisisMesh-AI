import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/dashboard", short: "DS" },
  { label: "Live Map", path: "/map", short: "LM" },
  { label: "Swarm Control", path: "/swarm", short: "SC" },
  { label: "Victim Monitor", path: "/victims", short: "VM" },
];

export default function Sidebar() {
  return (
    <aside className="glass-panel hidden w-72 flex-col border-r border-white/10 px-4 py-6 lg:flex">
      <div className="mb-8 rounded-3xl border border-electric/20 bg-white/5 p-5">
        <p className="text-xs uppercase tracking-[0.35em] text-electric/80">Command Grid</p>
        <h1 className="mt-3 text-2xl font-semibold text-white">CrisisMesh AI</h1>
        <p className="mt-2 text-sm text-slate-400">
          Autonomous disaster intelligence for swarm-driven response.
        </p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition duration-300 ${
                isActive
                  ? "bg-electric/15 text-white shadow-lg shadow-electric/10"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xs font-semibold tracking-[0.2em]">
              {item.short}
            </span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto rounded-3xl border border-safe/20 bg-safe/10 p-4 text-sm text-slate-300">
        <p className="font-medium text-safe">Ops Readiness</p>
        <p className="mt-2 text-slate-400">
          Mesh redundancy and drone telemetry remain within mission thresholds.
        </p>
      </div>
    </aside>
  );
}
