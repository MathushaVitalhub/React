import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AppointmentCard from '../../components/appointments/AppointmentCard.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import ErrorMessage from '../../components/common/ErrorMessage.jsx'
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'
import SearchBar from '../../components/common/SearchBar.jsx'
import { useAppointmentContext } from '../../context/AppointmentContext.jsx'
import { appointmentStatuses } from '../../data/mockData.js'

function Appointments() {
  const { appointments, loading, error } = useAppointmentContext()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  // useMemo recalculates the visible list only when the inputs change.
  const visibleAppointments = useMemo(() => {
    const query = search.trim().toLowerCase()

    return appointments.filter((appointment) => {
      const matchesStatus = statusFilter === 'All' || appointment.status === statusFilter
      const matchesSearch =
        query === '' ||
        appointment.patientName.toLowerCase().includes(query) ||
        appointment.providerName.toLowerCase().includes(query)

      return matchesStatus && matchesSearch
    })
  }, [appointments, search, statusFilter])

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Appointments</h1>
          <p>Sample visits only. Cancelling a visit keeps it in the list.</p>
        </div>
        <Link className="button primary" to="/appointments/new">
          Create appointment
        </Link>
      </div>
      <div className="toolbar">
        <SearchBar
          id="appointment-search"
          value={search}
          onChange={setSearch}
          placeholder="Search by patient or provider"
        />
        <label className="field" htmlFor="appointment-status">
          Status
          <select
            id="appointment-status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All</option>
            {appointmentStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>
      {visibleAppointments.length === 0 ? (
        <EmptyState message="No appointments match this filter." />
      ) : (
        <div className="card-grid">
          {visibleAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Appointments
