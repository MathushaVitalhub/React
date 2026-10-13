import PatientCard from './PatientCard.jsx'

function PatientList({ patients }) {
  return (
    <div className="card-grid">
      {patients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} />
      ))}
    </div>
  )
}

export default PatientList
