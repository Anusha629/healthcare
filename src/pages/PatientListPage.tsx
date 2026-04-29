import { useState } from "react";
import { useAppStore } from "../store/useAppStore";
import PatientCard from "../components/PatientCard";
import PatientListItem from "../components/PatientListItem";
import ViewToggle from "../components/ViewToggle";

export default function PatientListPage() {
  const patients = useAppStore((state) => state.patients);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="patients-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Patient hub</p>
          <h1>Patients under care</h1>
          <p>
            Manage the patient directory with quick view toggles and fast access
            to care details.
          </p>
        </div>
        <ViewToggle currentView={viewMode} onChange={setViewMode} />
      </div>

      {viewMode === "grid" ? (
        <div className="patient-grid">
          {patients.map((patient) => (
            <PatientCard patient={patient} key={patient.id} />
          ))}
        </div>
      ) : (
        <div className="patient-list">
          <div className="patient-row header-row">
            <span>Patient</span>
            <span>Age</span>
            <span>Room</span>
            <span>Last visit</span>
            <span>Status</span>
          </div>
          {patients.map((patient) => (
            <PatientListItem patient={patient} key={patient.id} />
          ))}
        </div>
      )}
    </div>
  );
}
