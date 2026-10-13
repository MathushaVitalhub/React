import { useEffect, useState } from 'react'
import { getAppointments } from '../services/appointmentService.js'

// Reusable appointment logic: load the list, then add, edit, or cancel.
export function useAppointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    // Fetch appointment data when the provider first loads.
    getAppointments()
      .then((data) => {
        if (!ignore) {
          setAppointments(data)
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

  function addAppointment(appointment) {
    setAppointments((current) => [appointment, ...current])
  }

  function updateAppointment(id, changes) {
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === id ? { ...appointment, ...changes } : appointment,
      ),
    )
  }

  function cancelAppointment(id) {
    updateAppointment(id, { status: 'Cancelled' })
  }

  return {
    appointments,
    loading,
    error,
    addAppointment,
    updateAppointment,
    cancelAppointment,
  }
}
