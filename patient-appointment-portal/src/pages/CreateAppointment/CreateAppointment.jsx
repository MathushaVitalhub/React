import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppointmentForm from '../../components/appointments/AppointmentForm.jsx'
import ErrorMessage from '../../components/common/ErrorMessage.jsx'
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'
import { useAppointmentContext } from '../../context/AppointmentContext.jsx'
import { getPatients } from '../../services/patientService.js'

function CreateAppointment() {
  const navigate = useNavigate()
  const { addAppointment, loading: appointmentsLoading } = useAppointmentContext()
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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

  function handleCreate(values) {
    const appointment = {
      ...values,
      id: `A-${Date.now()}`,
      status: 'Scheduled',
    }

    addAppointment(appointment)
    navigate(`/appointments/${appointment.id}`)
  }

  if (loading || appointmentsLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  return (
    <section>
      <h1>Create Appointment</h1>
      <p>Add a fictional appointment. It stays in this browser session.</p>
      <AppointmentForm
        patients={patients}
        submitLabel="Create appointment"
        onSubmit={handleCreate}
      />
    </section>
  )
}

export default CreateAppointment
