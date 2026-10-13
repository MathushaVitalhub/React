import { Link } from 'react-router-dom'
import StatusBadge from '../common/StatusBadge.jsx'

function PatientCard({ patient }) {
  return (
    <article className="card">
      <div className="card-top">
        <h2>{patient.name}</h2>
        <StatusBadge status={patient.status} />
      </div>
      <p>Patient ID: {patient.id}</p>
      <p>Age: {patient.age}</p>
      <Link className="content-link" to={`/patients/${patient.id}`}>
        View details
      </Link>
    </article>
  )
}

export default PatientCard
