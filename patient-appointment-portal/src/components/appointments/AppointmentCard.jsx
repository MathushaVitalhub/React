import { Link } from 'react-router-dom'
import StatusBadge from '../common/StatusBadge.jsx'
import { formatDisplayDate } from '../../utils/appointmentHelpers.js'

function AppointmentCard({ appointment }) {
  return (
    <article className="card">
      <div className="card-top">
        <h2>{appointment.patientName}</h2>
        <StatusBadge status={appointment.status} />
      </div>
      <p>{appointment.providerName}</p>
      <p>
        {formatDisplayDate(appointment.date)} at {appointment.time}
      </p>
      <p>{appointment.type}</p>
      <Link className="content-link" to={`/appointments/${appointment.id}`}>
        View details
      </Link>
    </article>
  )
}

export default AppointmentCard
