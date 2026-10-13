export function getTodayString() {
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${today.getFullYear()}-${month}-${day}`
}

export function formatDisplayDate(value) {
  const date = new Date(`${value}T00:00:00`)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function isUpcoming(appointment, today) {
  return appointment.status === 'Scheduled' && appointment.date >= today
}

// A patient's status comes from their appointments, so the list stays in sync.
export function getPatientStatus(patientId, appointments) {
  const matches = appointments.filter((appointment) => appointment.patientId === patientId)

  if (matches.some((appointment) => appointment.status === 'Scheduled')) {
    return 'Scheduled'
  }

  if (matches.some((appointment) => appointment.status === 'Completed')) {
    return 'Completed'
  }

  if (matches.some((appointment) => appointment.status === 'Cancelled')) {
    return 'Cancelled'
  }

  return 'No appointment'
}
