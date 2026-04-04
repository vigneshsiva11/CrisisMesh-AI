import { useMemo } from "react";
import { useCrisis } from "../context/CrisisContext";
import AlertPanel from "../components/ui/AlertPanel";
import SectionHeader from "../components/ui/SectionHeader";

export default function VictimMonitor() {
  const { victims, priorityVictims } = useCrisis();

  const sortedVictims = useMemo(
    () => [...victims].sort((a, b) => b.urgencyScore - a.urgencyScore),
    [victims],
  );

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Victim Monitor"
        title="Victim Prioritization Feed"
        description="Live triage board for urgency score, signal strength, geolocation confidence, and rescue timing."
      />

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <AlertPanel victims={priorityVictims} />

        <div className="glass-panel rounded-3xl p-5">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.25em] text-electric/70">All Victims</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Realtime Triage Table</h3>
          </div>

          <div className="scrollbar-thin overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-white/10 text-xs uppercase tracking-[0.2em] text-slate-500">
                <tr>
                  <th className="px-3 py-3">Victim</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Urgency</th>
                  <th className="px-3 py-3">Signal</th>
                  <th className="px-3 py-3">Drone</th>
                  <th className="px-3 py-3">Coordinates</th>
                  <th className="px-3 py-3">Detected</th>
                </tr>
              </thead>
              <tbody>
                {sortedVictims.map((victim) => (
                  <tr key={victim.id} className="border-b border-white/5 text-slate-300">
                    <td className="px-3 py-4 font-medium text-white">{victim.id}</td>
                    <td className="px-3 py-4">
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          victim.status === "Priority-1"
                            ? "bg-danger/10 text-danger"
                            : victim.status === "Priority-2"
                              ? "bg-alert/10 text-alert"
                              : "bg-safe/10 text-safe"
                        }`}
                      >
                        {victim.status}
                      </span>
                    </td>
                    <td className="px-3 py-4">{victim.urgencyScore}</td>
                    <td className="px-3 py-4">{victim.signalStrength}%</td>
                    <td className="px-3 py-4">{victim.detectedBy || "Unknown Unit"}</td>
                    <td className="px-3 py-4">
                      {victim.coordinates.lat.toFixed(4)}, {victim.coordinates.lng.toFixed(4)}
                    </td>
                    <td className="px-3 py-4">
                      {new Date(victim.detectedAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
