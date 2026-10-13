# Patient Appointment Portal

A small React learning project that looks like a clinic portal. It uses fictional patients and sample appointments only. It does not diagnose, recommend treatment, write prescriptions, or store real patient records.

The goal is to practice the React skills from a 3-month learning plan and explain them in a presentation.

## Technologies

- React 19 with functional components
- Vite
- JavaScript
- React Router
- React Hooks (`useState`, `useEffect`, `useContext`, `useMemo`)
- Context API
- Fetch API
- CSS

Redux is not used. There is no backend. Sample records are loaded with `fetch` from JSON files in `public/data`. New and edited appointments stay in memory for the browser session.

## How to run

From this folder:

```bash
npm install
npm run dev
```

Open the local address Vite prints, usually `http://localhost:5173`.

Other scripts:

```bash
npm run build
npm run preview
```

## Application overview

The portal has four main areas:

| Page | Address | What it shows |
| --- | --- | --- |
| Dashboard | `/` | Totals for patients, appointments, upcoming visits, and completed visits |
| Patients | `/patients` | Searchable list of fictional patients |
| Patient details | `/patients/:id` | One patient and that patient's upcoming appointments |
| Appointments | `/appointments` | Filterable list of sample appointments |
| Appointment details | `/appointments/:id` | One appointment, with edit and cancel actions |
| Create appointment | `/appointments/new` | A controlled form |
| Edit appointment | `/appointments/:id/edit` | The same form, filled with the selected appointment |
| Profile | `/profile` | A sample staff profile |

Cancelling an appointment changes its status to `Cancelled`. The record stays in the list.

## Features

- Reusable dashboard cards, patient cards, appointment cards, and one shared appointment form
- Search and status filters
- Dynamic routes for a patient id and an appointment id
- Create, edit, and cancel appointments
- Loading, error, and empty states
- Shared appointment state so a change on one page shows up on the others

## Project structure

```text
src/
  components/
    common/          Shared pieces used on more than one page
    patients/        Patient card and list
    appointments/    Appointment card and form
  pages/             One folder per screen
  context/           AppointmentContext
  hooks/             useAppointments
  services/          fetch calls
  data/              Providers, types, statuses, and the sample profile
  utils/             Small helpers for dates and status
  styles/app.css
  App.jsx            Routes and the appointment provider
  main.jsx           React entry point
public/
  data/
    patients.json
    appointments.json
```

`public/data` holds the sample JSON. Vite serves those files, so `fetch('/data/patients.json')` is a real GET request. `src/data/mockData.js` holds the lists the form needs (providers, appointment types, and statuses) plus the sample profile.

## React concepts demonstrated

### Components

The screen is split into small functions. `Header`, `Navigation`, and `Layout` build the frame. Pages fill the middle. A component is worth creating when the same markup would otherwise be copied, or when a piece has a clear job.

### Props

Props are inputs. `DashboardCard` receives `title`, `value`, and `detail`. `PatientCard` receives a `patient` object. `AppointmentForm` receives `patients`, `submitLabel`, and `onSubmit`. The parent owns the data. The child displays it or reports an event.

`Layout` uses the special `children` prop. Whatever you place between `<Layout>` and `</Layout>` is rendered in the main area.

### State

State is data that can change and should update the screen.

Local state (`useState`) is used for:

- the search text
- the status filter
- form fields and validation messages
- loading and error flags on a single page

Shared state (Context) is used for appointments, because the dashboard, the list, the details page, and the form all need the same list.

### React Hooks

- `useState` stores values that change.
- `useEffect` loads patients or appointments after the page appears.
- `useContext` reads the shared appointment value.
- `useMemo` builds the filtered patient and appointment lists.
- `useAppointments` is the custom hook that loads appointments and exposes add, update, and cancel.

Hooks are called at the top of a component, in the same order every render. They are not placed inside loops or conditions.

### API integration

`patientService.js` and `appointmentService.js` call `fetch`. Pages do not contain the request URL.

A service is useful because:

- the page component stays focused on the screen
- loading and error handling sit next to the request
- a future API URL can change in one file

Each request shows three outcomes:

- **Loading:** the page renders `Loading...`
- **Success:** the JSON is saved in state and rendered
- **Error:** a friendly message is shown

The patient GET is the clearest API example. Appointment changes after the first load are stored in Context, because this project has no server to save them.

### React Router

`BrowserRouter` watches the address bar. `Routes` picks one `Route`. `NavLink` highlights the menu item for the current address. `Link` moves to another page without a full reload.

`end` on the Dashboard link means `/` is highlighted only on the home page.

`/appointments/new` is a fixed path, so the word `new` is the create page. `/appointments/:id` reads the id from the address.

### Dynamic routing

`/patients/:id` and `/appointments/:id` are dynamic. `useParams()` returns the id. `PatientDetails` finds the matching patient. `AppointmentDetails` finds the matching appointment.

### Context API

`AppointmentProvider` wraps the app in `App.jsx`. It calls `useAppointments()` once and passes that value to every nested component. A page reads it with `useAppointmentContext()`, which calls `useContext`.

Context is used here because several pages must see the same appointments, including ones created during the session. Context is enough for this app. Redux is not needed.

### Custom hooks

`useAppointments` hides the load/add/update/cancel logic. The provider stays small, and the same logic is not copied into every page.

### Forms

`AppointmentForm` is a controlled form. Each input's `value` comes from state, and `onChange` writes the new value back. Create and edit both render this component. Edit passes `initialValues` and `showStatus`. Create leaves the status as `Scheduled`.

Validation checks that patient, provider, type, date, and time are filled in, and that notes are 200 characters or fewer. Error text is rendered only when that field has an error.

### Conditional rendering

The pages choose what to show:

- `loading` renders `LoadingSpinner`
- an error renders `ErrorMessage`
- an empty filter renders `EmptyState`
- a cancelled appointment hides the cancel button
- edit mode shows the status field

### Reusable components

| Component | Why it exists |
| --- | --- |
| `Header` | The title appears on every page |
| `Navigation` | The menu appears on every page |
| `Layout` | Puts the header, menu, and page content together |
| `DashboardCard` | The same card shape is used for four totals |
| `PatientCard` | One patient in the list |
| `PatientList` | Renders a card for each patient and supplies the list key |
| `AppointmentCard` | One appointment in the list |
| `AppointmentForm` | One form for create and edit |
| `SearchBar` | The same search box is used for patients and appointments |
| `StatusBadge` | Status colors live in one place |
| `Button` | Shared button styles for submit and cancel |
| `LoadingSpinner` | One loading message |
| `ErrorMessage` | One error message, with an optional Try again button |
| `EmptyState` | One message when a list or record is missing |

### Best practices used

- Functional components with clear names
- Small components that receive props
- State lives in the closest component that needs it, except appointments, which are shared
- Controlled form fields
- API calls live in services
- Lists use a stable `key`
- Loading, error, and empty outcomes are visible
- `useEffect` is used for loading data, not for values that can be calculated during render
- Filtered lists are derived with `useMemo` from state that already exists

## What I learned

I can build a multi-page React app, explain where state lives, load data with `fetch`, and share appointment changes across pages without Redux. The presentation script with file references is in `LEARNING_NOTES.md`.
