import { Link, useParams } from 'react-router-dom'
import Button from '../../components/common/Button.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import ErrorMessage from '../../components/common/ErrorMessage.jsx'
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'
import StatusBadge from '../../components/common/StatusBadge.jsx'
import { useAppointmentContext } from '../../context/AppointmentContext.jsx'
import { formatDisplayDate } from '../../utils/appointmentHelpers.js'

function AppointmentDetails() {
  const { id } = useParams()
  const { appointments, loading, error, cancelAppointment } = useAppointmentContext()
  const appointment = appointments.find((item) => item.id === id)

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  if (!appointment) {
    return <EmptyState message="No appointment found for this id." />
  }

  return (
    <section>
      <h1>Appointment Details</h1>
      <dl className="details">
        <dt>Patient</dt>
        <dd>
          <Link className="content-link" to={`/patients/${appointment.patientId}`}>
            {appointment.patientName}
          </Link>
        </dd>
        <dt>Provider</dt>
        <dd>{appointment.providerName}</dd>
        <dt>Date</dt>
        <dd>{formatDisplayDate(appointment.date)}</dd>
        <dt>Time</dt>
        <dd>{appointment.time}</dd>
        <dt>Type</dt>
        <dd>{appointment.type}</dd>
        <dt>Status</dt>
        <dd>
          <StatusBadge status={appointment.status} />
        </dd>
        <dt>Notes</dt>
        <dd>{appointment.notes || 'No notes'}</dd>
      </dl>
      <div className="actions">
        <Link className="button secondary" to={`/appointments/${appointment.id}/edit`}>
          Edit appointment
        </Link>
        {appointment.status !== 'Cancelled' && (
          <Button variant="danger" onClick={() => cancelAppointment(appointment.id)}>
            Cancel appointment
          </Button>
        )}
      </div>
    </section>
  )
}

export default AppointmentDetails
