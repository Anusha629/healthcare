import { Patient } from "../types";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

const statusStyles = {
  Stable: "status-pill stable",
  Critical: "status-pill critical",
  Monitoring: "status-pill monitoring",
  Discharged: "status-pill discharged",
};

function PatientListItem({ patient }: { patient: Patient }) {
  const navigate = useNavigate();

  return (
    <div
      className="patient-row"
      onClick={() => navigate(`/patients/${patient.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          navigate(`/patients/${patient.id}`);
        }
      }}
    >
      <div className="row-name">
        <img src={patient.avatar} alt={patient.name} loading="lazy" />
        <div>
          <strong>{patient.name}</strong>
          <span>{patient.condition}</span>
        </div>
      </div>
      <span>{patient.age} yrs</span>
      <span>{patient.room}</span>
      <span>{patient.lastVisit}</span>
      <span className={statusStyles[patient.status]}>{patient.status}</span>
    </div>
  );
}

export default memo(PatientListItem);
