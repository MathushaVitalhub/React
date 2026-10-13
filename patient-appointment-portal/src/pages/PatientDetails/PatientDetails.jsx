import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import EmptyState from '../../components/common/EmptyState.jsx'
import ErrorMessage from '../../components/common/ErrorMessage.jsx'
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'
import StatusBadge from '../../components/common/StatusBadge.jsx'
import { useAppointmentContext } from '../../context/AppointmentContext.jsx'
import { getPatients } from '../../services/patientService.js'
import {
  formatDisplayDate,
  getPatientStatus,
  getTodayString,
  isUpcoming,
} from '../../utils/appointmentHelpers.js'

function PatientDetails() {
  const { id } = useParams()
  const {
    appointments,
    loading: appointmentsLoading,
    error: appointmentsError,
  } = useAppointmentContext()
  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    getPatients()
      .then((patients) => {
        if (!ignore) {
          setPatient(patients.find((item) => item.id === id) || null)
        }
      })
      .catch((loadError) => {
        if (!ignore) {
          setError(loadError.message)
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false)
        }
      })

    return () => {
      ignore = true
    }
  }, [id])

  const upcomingAppointments = useMemo(() => {
    const today = getTodayString()

    return appointments.filter(
      (appointment) => appointment.patientId === id && isUpcoming(appointment, today),
    )
  }, [appointments, id])

  if (loading || appointmentsLoading) {
    return <LoadingSpinner />
  }

  if (error || appointmentsError) {
    return <ErrorMessage message={error || appointmentsError} />
  }

  if (!patient) {
    return <EmptyState message="No patient found for this id." />
  }

  const status = getPatientStatus(patient.id, appointments)

  return (
    <section>
      <h1>{patient.name}</h1>
      <dl className="details">
        <dt>Patient ID</dt>
        <dd>{patient.id}</dd>
        <dt>Age</dt>
        <dd>{patient.age}</dd>
        <dt>Appointment status</dt>
        <dd>
          <StatusBadge status={status} />
        </dd>
      </dl>

      <h2 className="section-title">Upcoming appointments</h2>
      {upcomingAppointments.length === 0 ? (
        <EmptyState message="No upcoming appointments for this patient." />
      ) : (
        <ul className="plain-list">
          {upcomingAppointments.map((appointment) => (
            <li key={appointment.id}>
              <Link className="content-link" to={`/appointments/${appointment.id}`}>
                {formatDisplayDate(appointment.date)} at {appointment.time} with{' '}
                {appointment.providerName}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default PatientDetails
