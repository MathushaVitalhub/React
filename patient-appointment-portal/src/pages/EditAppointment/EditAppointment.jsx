import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppointmentForm from '../../components/appointments/AppointmentForm.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import ErrorMessage from '../../components/common/ErrorMessage.jsx'
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'
import { useAppointmentContext } from '../../context/AppointmentContext.jsx'
import { getPatients } from '../../services/patientService.js'

function EditAppointment() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { appointments, loading: appointmentsLoading, error: appointmentsError, updateAppointment } =
    useAppointmentContext()
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const appointment = appointments.find((item) => item.id === id)

  useEffect(() => {
    let ignore = false

    getPatients()
      .then((data) => {
        if (!ignore) {
          setPatients(data)
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
  }, [])

  function handleUpdate(values) {
    updateAppointment(id, values)
    navigate(`/appointments/${id}`)
  }

  if (loading || appointmentsLoading) {
    return <LoadingSpinner />
  }

  if (error || appointmentsError) {
    return <ErrorMessage message={error || appointmentsError} />
  }

  if (!appointment) {
    return <EmptyState message="No appointment found for this id." />
  }

  return (
    <section>
      <h1>Edit Appointment</h1>
      <AppointmentForm
        patients={patients}
        initialValues={appointment}
        submitLabel="Save changes"
        showStatus
        onSubmit={handleUpdate}
      />
    </section>
  )
}

export default EditAppointment
