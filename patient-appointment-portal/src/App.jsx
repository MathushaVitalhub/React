import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/common/Layout.jsx'
import { AppointmentProvider } from './context/AppointmentContext.jsx'
import AppointmentDetails from './pages/AppointmentDetails/AppointmentDetails.jsx'
import Appointments from './pages/Appointments/Appointments.jsx'
import CreateAppointment from './pages/CreateAppointment/CreateAppointment.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import EditAppointment from './pages/EditAppointment/EditAppointment.jsx'
import PatientDetails from './pages/PatientDetails/PatientDetails.jsx'
import Patients from './pages/Patients/Patients.jsx'
import Profile from './pages/Profile/Profile.jsx'

function App() {
  return (
    <AppointmentProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/patients/:id" element={<PatientDetails />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/appointments/new" element={<CreateAppointment />} />
            <Route path="/appointments/:id/edit" element={<EditAppointment />} />
            <Route path="/appointments/:id" element={<AppointmentDetails />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppointmentProvider>
  )
}

export default App
