import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardCard from '../../components/common/DashboardCard.jsx'
import ErrorMessage from '../../components/common/ErrorMessage.jsx'
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'
import { useAppointmentContext } from '../../context/AppointmentContext.jsx'
import { getPatients } from '../../services/patientService.js'
import { getTodayString, isUpcoming } from '../../utils/appointmentHelpers.js'

function Dashboard() {
  const {
    appointments,
    loading: appointmentsLoading,
    error: appointmentsError,
  } = useAppointmentContext()
  const [patientCount, setPatientCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    // Fetch patient data when the page loads.
    getPatients()
      .then((patients) => {
        if (!ignore) {
          setPatientCount(patients.length)
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

  const counts = useMemo(() => {
    const today = getTodayString()

    return {
      upcoming: appointments.filter((appointment) => isUpcoming(appointment, today)).length,
      completed: appointments.filter((appointment) => appointment.status === 'Completed').length,
    }
  }, [appointments])

  if (loading || appointmentsLoading) {
    return <LoadingSpinner />
  }

  if (error || appointmentsError) {
    return <ErrorMessage message={error || appointmentsError} />
  }

  return (
    <section>
      <h1>Dashboard</h1>
      <p>Sample totals for the fictional clinic list.</p>
      <div className="card-grid">
        <DashboardCard
          title="Total Patients"
          value={patientCount}
          detail="Fictional patients in the sample list"
        />
        <DashboardCard
          title="Total Appointments"
          value={appointments.length}
          detail="Scheduled, completed, and cancelled"
        />
        <DashboardCard
          title="Upcoming Appointments"
          value={counts.upcoming}
          detail="Scheduled on or after today"
        />
        <DashboardCard
          title="Completed Appointments"
          value={counts.completed}
          detail="Visits marked completed"
        />
      </div>
      <p className="page-links">
        <Link className="content-link" to="/patients">
          View patients
        </Link>
        <Link className="content-link" to="/appointments">
          View appointments
        </Link>
      </p>
    </section>
  )
}

export default Dashboard
