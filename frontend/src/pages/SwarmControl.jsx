import { useCrisis } from "../context/CrisisContext";
import CrisisMapContainer from "../components/map/MapContainer";
import SectionHeader from "../components/ui/SectionHeader";

export default function SwarmControl() {
  const {
    victims,
    clusters,
    drones,
    paths,
    mesh,
    deadZones,
    startSimulation,
    resetSimulation,
    triggerSignalSimulation,
    simulationRunning,
  } = useCrisis();

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Swarm Control"
        title="Drone Swarm Mission Console"
        description="Control simulation state, trigger signal detections, and monitor drone routing against mesh resilience."
        action={
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={startSimulation}
              className="rounded-2xl border border-safe/30 bg-safe/15 px-4 py-3 text-sm font-medium text-safe transition hover:bg-safe/20"
            >
              Start Simulation
            </button>
            <button
              type="button"
              onClick={resetSimulation}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Reset Simulation
            </button>
            <button
              type="button"
              onClick={triggerSignalSimulation}
              className="rounded-2xl border border-danger/30 bg-danger/15 px-4 py-3 text-sm font-medium text-danger transition hover:bg-danger/20"
            >
              Simulate Signal Detection
            </button>
          </div>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <CrisisMapContainer
          victims={victims}
          clusters={clusters}
          drones={drones}
          paths={paths}
          meshLines={mesh.lines}
          deadZones={deadZones}
          height="h-[42rem]"
        />

        <div className="space-y-4">
          <div className="glass-panel rounded-3xl p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-electric/70">Mission State</p>
            <h3 className="mt-2 text-xl font-semibold text-white">
              {simulationRunning ? "Swarm actively surveying sectors" : "Swarm paused for reset"}
            </h3>
            <p className="mt-3 text-sm text-slate-400">
              Route animations represent A* path responses combined with overlay mesh redundancy.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Drone Registry</p>
            <div className="mt-4 space-y-3">
              {drones.map((drone) => (
                <div key={drone.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-white">{drone.label}</p>
                      <p className="text-xs text-slate-400">{drone.id}</p>
                    </div>
                    <span className="rounded-full border border-safe/30 bg-safe/10 px-2 py-1 text-xs text-safe">
                      {drone.battery}% battery
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
