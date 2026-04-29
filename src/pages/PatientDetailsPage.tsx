import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";

export default function PatientDetailsPage() {
  const { id } = useParams();
  const patients = useAppStore((state) => state.patients);

  const patient = useMemo(
    () => patients.find((item) => item.id === id),
    [patients, id],
  );

  if (!patient) {
    return (
      <div className="details-page empty-state">
        <h2>Patient not found</h2>
        <p>That patient record does not exist in the current workspace.</p>
        <Link className="secondary-button" to="/patients">
          Back to patient list
        </Link>
      </div>
    );
  }

  return (
    <div className="details-page">
      <div className="patient-detail-card">
        <div className="patient-detail-header">
          <div className="patient-detail-avatar">
            <img src={patient.avatar} alt={patient.name} loading="lazy" />
          </div>
          <div>
            <p className="eyebrow">Patient detail</p>
            <h1>{patient.name}</h1>
            <p>{patient.condition}</p>
          </div>
        </div>
        <div className="detail-grid">
          <div>
            <span>Age</span>
            <strong>{patient.age}</strong>
          </div>
          <div>
            <span>Room</span>
            <strong>{patient.room}</strong>
          </div>
          <div>
            <span>Status</span>
            <strong>{patient.status}</strong>
          </div>
          <div>
            <span>Last visit</span>
            <strong>{patient.lastVisit}</strong>
          </div>
          <div className="wide-cell">
            <span>Care score</span>
            <strong>{patient.score}%</strong>
          </div>
        </div>
        <div className="notes-panel">
          <h2>Care notes</h2>
          <p>{patient.notes}</p>
        </div>
        <Link className="secondary-button" to="/patients">
          Back to patient list
        </Link>
      </div>
    </div>
  );
}
