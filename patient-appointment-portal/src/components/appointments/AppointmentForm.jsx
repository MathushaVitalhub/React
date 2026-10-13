import { useState } from 'react'
import Button from '../common/Button.jsx'
import {
  appointmentStatuses,
  appointmentTypes,
  providers,
} from '../../data/mockData.js'

const emptyValues = {
  patientId: '',
  providerName: '',
  type: '',
  date: '',
  time: '',
  notes: '',
  status: 'Scheduled',
}

function validate(values) {
  const nextErrors = {}

  if (!values.patientId) {
    nextErrors.patientId = 'Select a patient.'
  }

  if (!values.providerName) {
    nextErrors.providerName = 'Select a provider.'
  }

  if (!values.type) {
    nextErrors.type = 'Select an appointment type.'
  }

  if (!values.date) {
    nextErrors.date = 'Select a date.'
  }

  if (!values.time) {
    nextErrors.time = 'Select a time.'
  }

  if (values.notes.length > 200) {
    nextErrors.notes = 'Notes must be 200 characters or fewer.'
  }

  return nextErrors
}

// Reuse the same form for create and edit.
function AppointmentForm({ patients, initialValues, submitLabel, showStatus, onSubmit }) {
  const [values, setValues] = useState({ ...emptyValues, ...initialValues })
  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    const patient = patients.find((item) => item.id === values.patientId)

    onSubmit({
      ...values,
      patientName: patient ? patient.name : '',
    })
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="patientId">
        Patient
        <select
          id="patientId"
          name="patientId"
          value={values.patientId}
          onChange={handleChange}
        >
          <option value="">Select a patient</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name}
            </option>
          ))}
        </select>
        {errors.patientId && <span className="field-error">{errors.patientId}</span>}
      </label>

      <label htmlFor="providerName">
        Provider
        <select
          id="providerName"
          name="providerName"
          value={values.providerName}
          onChange={handleChange}
        >
          <option value="">Select a provider</option>
          {providers.map((provider) => (
            <option key={provider} value={provider}>
              {provider}
            </option>
          ))}
        </select>
        {errors.providerName && (
          <span className="field-error">{errors.providerName}</span>
        )}
      </label>

      <label htmlFor="type">
        Appointment type
        <select id="type" name="type" value={values.type} onChange={handleChange}>
          <option value="">Select a type</option>
          {appointmentTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.type && <span className="field-error">{errors.type}</span>}
      </label>

      <label htmlFor="date">
        Date
        <input id="date" name="date" type="date" value={values.date} onChange={handleChange} />
        {errors.date && <span className="field-error">{errors.date}</span>}
      </label>

      <label htmlFor="time">
        Time
        <input id="time" name="time" type="time" value={values.time} onChange={handleChange} />
        {errors.time && <span className="field-error">{errors.time}</span>}
      </label>

      {showStatus && (
        <label htmlFor="status">
          Status
          <select id="status" name="status" value={values.status} onChange={handleChange}>
            {appointmentStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      )}

      <label htmlFor="notes">
        Notes
        <textarea
          id="notes"
          name="notes"
          rows="4"
          value={values.notes}
          onChange={handleChange}
        />
        {errors.notes && <span className="field-error">{errors.notes}</span>}
      </label>

      <Button type="submit">{submitLabel}</Button>
    </form>
  )
}

export default AppointmentForm
