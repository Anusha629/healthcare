import { useMemo } from "react";
import { useAppStore } from "../store/useAppStore";
import {
  requestNotificationPermission,
  sendNotification,
} from "../hooks/useNotification";

const highlightCards = [
  { title: "Patient load", value: "24", subtitle: "patients active today" },
  { title: "Alerts", value: "3", subtitle: "critical events" },
  { title: "Capacity", value: "78%", subtitle: "ward utilization" },
  { title: "Team response", value: "92%", subtitle: "on-time closures" },
];

export default function DashboardPage() {
  const patients = useAppStore((state) => state.patients);

  const summary = useMemo(
    () => ({
      stable: patients.filter((patient) => patient.status === "Stable").length,
      critical: patients.filter((patient) => patient.status === "Critical")
        .length,
      monitoring: patients.filter((patient) => patient.status === "Monitoring")
        .length,
    }),
    [patients],
  );

  const notify = async () => {
    const granted = await requestNotificationPermission();
    if (!granted) {
      return;
    }

    await sendNotification("Medication reminder", {
      body: "A patient care task is due in 20 minutes.",
      icon: "/favicon.svg",
      data: { path: "/patients" },
    });
  };

  return (
    <div className="dashboard-page">
      <div className="hero-card">
        <div>
          <p className="eyebrow">Operational command</p>
          <h1>Deliver care with confidence.</h1>
          <p className="hero-copy">
            Monitor patient workflows, surface alerts, and coordinate care from
            one modern interface.
          </p>
        </div>
        <button className="primary-button" type="button" onClick={notify}>
          Send alert notification
        </button>
      </div>

      <div className="metrics-grid">
        {highlightCards.map((card) => (
          <article className="metric-card" key={card.title}>
            <span>{card.title}</span>
            <strong>{card.value}</strong>
            <p>{card.subtitle}</p>
          </article>
        ))}
      </div>

      <section className="status-section">
        <div className="status-panel">
          <h2>Patient status overview</h2>
          <div className="status-chips">
            <span>Stable: {summary.stable}</span>
            <span>Critical: {summary.critical}</span>
            <span>Monitoring: {summary.monitoring}</span>
          </div>
        </div>
        <div className="insight-card">
          <h3>Care intensity</h3>
          <p>
            Critical cases have increased by 15% this hour. Ensure triage staff
            have real-time visibility on patient status changes.
          </p>
        </div>
      </section>
    </div>
  );
}
