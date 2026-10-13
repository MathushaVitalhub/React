import { useEffect, useMemo, useState } from 'react'
import EmptyState from '../../components/common/EmptyState.jsx'
import ErrorMessage from '../../components/common/ErrorMessage.jsx'
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'
import SearchBar from '../../components/common/SearchBar.jsx'
import PatientList from '../../components/patients/PatientList.jsx'
import { useAppointmentContext } from '../../context/AppointmentContext.jsx'
import { appointmentStatuses } from '../../data/mockData.js'
import { getPatients } from '../../services/patientService.js'
import { getPatientStatus } from '../../utils/appointmentHelpers.js'

const statusFilters = ['All', ...appointmentStatuses, 'No appointment']

function Patients() {
  const {
    appointments,
    loading: appointmentsLoading,
    error: appointmentsError,
  } = useAppointmentContext()
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  // Local state controls the search value.
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  function loadPatients() {
    setLoading(true)
    setError('')

    getPatients()
      .then((data) => {
        setPatients(data)
      })
      .catch((loadError) => {
        setError(loadError.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

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

  const visiblePatients = useMemo(() => {
    const query = search.trim().toLowerCase()

    return patients
      .map((patient) => ({
        ...patient,
        status: getPatientStatus(patient.id, appointments),
      }))
      .filter((patient) => {
        const matchesSearch =
          query === '' ||
          patient.name.toLowerCase().includes(query) ||
          patient.id.toLowerCase().includes(query)
        const matchesStatus = statusFilter === 'All' || patient.status === statusFilter

        return matchesSearch && matchesStatus
      })
  }, [patients, appointments, search, statusFilter])

  if (loading || appointmentsLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadPatients} />
  }

  if (appointmentsError) {
    return <ErrorMessage message={appointmentsError} />
  }

  return (
    <section>
      <h1>Patients</h1>
      <p>Fictional patients only. Status comes from their sample appointments.</p>
      <div className="toolbar">
        <SearchBar
          id="patient-search"
          value={search}
          onChange={setSearch}
          placeholder="Search by name or ID"
        />
        <label className="field" htmlFor="patient-status">
          Status
          <select
            id="patient-status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            {statusFilters.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>
      {visiblePatients.length === 0 ? (
        <EmptyState message="No patients match this search." />
      ) : (
        <PatientList patients={visiblePatients} />
      )}
    </section>
  )
}

export default Patients
