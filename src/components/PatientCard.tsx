import { Patient } from "../types";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

const statusStyles = {
  Stable: "status-pill stable",
  Critical: "status-pill critical",
  Monitoring: "status-pill monitoring",
  Discharged: "status-pill discharged",
};

function PatientCard({ patient }: { patient: Patient }) {
  const navigate = useNavigate();

  return (
    <article
      className="patient-card"
      onClick={() => navigate(`/patients/${patient.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          navigate(`/patients/${patient.id}`);
        }
      }}
    >
      <img
        className="patient-avatar"
        src={patient.avatar}
        alt={patient.name}
        loading="lazy"
      />
      <div className="patient-content">
        <div className="patient-header">
          <div>
            <h3>{patient.name}</h3>
            <p>{patient.condition}</p>
          </div>
          <span className={statusStyles[patient.status]}>{patient.status}</span>
        </div>
        <div className="patient-meta">
          <span>{patient.room}</span>
          <span>{patient.lastVisit}</span>
          <span>Score {patient.score}%</span>
        </div>
      </div>
    </article>
  );
}

export default memo(PatientCard);
