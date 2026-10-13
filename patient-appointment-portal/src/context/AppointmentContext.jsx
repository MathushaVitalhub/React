import { createContext, useContext } from 'react'
import { useAppointments } from '../hooks/useAppointments.js'

const AppointmentContext = createContext(null)

// Appointment data is shared through Context.
export function AppointmentProvider({ children }) {
  const value = useAppointments()

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  )
}

export function useAppointmentContext() {
  const context = useContext(AppointmentContext)

  if (!context) {
    throw new Error('useAppointmentContext must be used inside AppointmentProvider')
  }

  return context
}
