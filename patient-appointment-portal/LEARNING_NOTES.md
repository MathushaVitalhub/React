# Learning notes: Patient Appointment Portal

These notes match the sample portal in this folder. The people and appointments are fictional. The app does not make medical decisions.

Use this file as the script for the 3-month presentation. For each topic: say what it means, then open the file named below.

## 1. What is React?

React is a JavaScript library for building user interfaces. I describe the screen as components. When data changes, React updates the parts of the page that depend on that data.

In this app, `src/main.jsx` starts React and renders `App`.

## 2. Why React?

The portal has a shared header, lists, a form, and several pages. React lets me build those pieces once and reuse them. I can also show a new appointment on the dashboard, the list, and the details page after one state update.

The reusable pieces live in `src/components`.

## 3. JSX

JSX lets me write the screen in a syntax that looks like HTML, inside JavaScript. A component returns JSX. I can mix a variable into it with curly braces, such as `{patient.name}`.

Open `src/components/patients/PatientCard.jsx`.

## 4. Components

A component is a function that returns a piece of the screen. `Header` is the title bar. `PatientCard` is one patient. `Dashboard` is a whole page.

Components live in `src/components` and `src/pages`.

## 5. Functional components

Every component in this project is a function. There are no class components. `function Dashboard()` returns the dashboard screen. The last line of the file is `export default Dashboard`, so other files can import it.

Open `src/pages/Dashboard/Dashboard.jsx`.

## 6. Props

Props are the inputs a parent passes to a child. The child should display those inputs, or call a function prop when something happens.

Examples to show:

- `DashboardCard` takes `title`, `value`, and `detail` in `src/components/common/DashboardCard.jsx`
- `PatientCard` takes `patient` in `src/components/patients/PatientCard.jsx`
- `Layout` takes `children` in `src/components/common/Layout.jsx`
- `AppointmentForm` takes `patients`, `submitLabel`, `showStatus`, and `onSubmit`

`children` is the content written between the opening and closing tags. In `App.jsx`, the routes are the children of `Layout`.

## 7. State

State is data React remembers. When I update state, the component renders again.

There are two levels in this app:

- **Local state** belongs to one component. Search text on the Patients page is local.
- **Shared state** is the appointment list. Many pages read and update it through Context.

Say this sentence in the presentation: search belongs to the page, appointments belong to the whole app.

## 8. Events

An event handler runs when the user does something. `onChange` updates an input. `onSubmit` checks the form. `onClick` cancels an appointment.

Show the cancel button in `src/pages/AppointmentDetails/AppointmentDetails.jsx` and `handleSubmit` in `src/components/appointments/AppointmentForm.jsx`.

## 9. Conditional rendering

The page chooses different JSX for different situations.

- While data is loading, the page returns `<LoadingSpinner />`
- If the request fails, it returns `<ErrorMessage />`
- If a search has no matches, it returns `<EmptyState />`
- The cancel button is rendered only when the status is not `Cancelled`
- The status field is rendered only when `showStatus` is true

Show the `if (loading)` checks in `src/pages/Patients/Patients.jsx` and the status field in `AppointmentForm.jsx`.

## 10. Rendering lists and keys

`patients.map` creates one card per patient. React needs a `key` so it can tell the items apart. I use `patient.id` and `appointment.id` because those values are unique and do not change when the list is filtered.

Show `src/components/patients/PatientList.jsx`.

## 11. Forms

`AppointmentForm` is a controlled form. State holds the current value of every field. The input displays that state. Typing calls `handleChange`, which copies the state and updates the changed field.

Empty submit shows a short error under the missing field. A valid submit calls `onSubmit`, and the parent page decides whether to create or update.

Open `src/components/appointments/AppointmentForm.jsx`.

## 12. React Hooks

Hooks are functions whose names start with `use`. They let a function component remember state, load data, and read context.

Rules I follow:

- Call hooks at the top of the component
- Call them in the same order every time
- Do not call them inside a condition or a loop

This project uses `useState`, `useEffect`, `useContext`, `useMemo`, and the custom hook `useAppointments`.

## 13. useState

`useState` returns the current value and a function that updates it.

I use it for:

- search text and the status filter in `Patients.jsx` and `Appointments.jsx`
- form values and field errors in `AppointmentForm.jsx`
- patients, loading, and error on pages that fetch patients

Show this line in `Patients.jsx`:

```jsx
const [search, setSearch] = useState('')
```

`search` is the value. `setSearch` changes it. The `SearchBar` calls `setSearch` from `onChange`.

## 14. useEffect

`useEffect` runs after render. I use it to load data, because a request should not run while the component is calculating its JSX.

Show the effect in `src/pages/Dashboard/Dashboard.jsx`. It calls `getPatients()`, saves the count, and records an error if the request fails.

The `ignore` flag matters because React may run the effect twice in development. If the component has already been cleaned up, the response is ignored.

I do not use `useEffect` to filter lists. Filters are calculated during render with `useMemo`.

## 15. useContext

`useContext` reads a value from a provider higher in the tree. In `src/context/AppointmentContext.jsx`, `useAppointmentContext` calls `useContext(AppointmentContext)`.

Pages such as `Appointments.jsx` and `AppointmentDetails.jsx` call `useAppointmentContext()` instead of fetching the appointment list again.

## 16. useMemo

`useMemo` remembers a calculated value until its inputs change. Filtering a list is a calculation, not a new piece of state.

Show `visibleAppointments` in `src/pages/Appointments/Appointments.jsx`. It depends on `appointments`, `search`, and `statusFilter`. The Patients page and the dashboard counts use `useMemo` in the same way.

## 17. Custom hooks

A custom hook is a function that uses other hooks and shares that logic.

`src/hooks/useAppointments.js` loads appointments and returns:

- `appointments`
- `loading`
- `error`
- `addAppointment`
- `updateAppointment`
- `cancelAppointment`

`AppointmentProvider` calls this hook once. Every page then shares the same result. I did not put this logic in each page, because create, edit, and cancel would have been copied.

## 18. API integration

`src/services/patientService.js` and `src/services/appointmentService.js` use `fetch`.

`getPatients()` requests `/data/patients.json`. That file is in `public/data`, so Vite serves it like an API response. The same function shape would call a remote URL.

The page does three things with the result:

1. Set `loading` to true before the request, and show `Loading...`
2. Save the JSON in state when the response is successful
3. Save a friendly message when `fetch` fails or the response is not ok

I kept the request in a service so the page describes the screen, and the service describes the network.

Appointment edits are not sent to a server. After the first GET, Context stores the working list.

## 19. React Router

React Router shows a component for the current address.

In `src/App.jsx`:

- `BrowserRouter` listens to the address bar
- `Routes` contains the route table
- each `Route` has a `path` and an `element`

`src/components/common/Navigation.jsx` uses `NavLink`. The active link receives the class `active`. The Dashboard link uses `end` so it is highlighted only when the address is exactly `/`.

`Link` is used for "View details" and "Create appointment".

## 20. Dynamic routing

A colon marks a route parameter.

- `/patients/:id` matches `/patients/P-1001`
- `/appointments/:id` matches `/appointments/A-501`

`useParams()` returns `{ id: 'P-1001' }`. `PatientDetails.jsx` uses that id to find the patient. `AppointmentDetails.jsx` uses it to find the appointment.

`/appointments/new` is listed as its own route. The word `new` is the create page. It is not treated as an appointment id.

Edit uses `/appointments/:id/edit` and the same form.

## 21. State management

I pick the smallest place that needs the data.

| Data | Where it lives | Why |
| --- | --- | --- |
| Search text | `useState` in the page | Only that page searches |
| Status filter | `useState` in the page | Only that page filters |
| Form fields | `useState` in the form | The form owns what the user is typing |
| Loading and error for patients | `useState` in the page that fetches | That request belongs to that page |
| Appointments | Context | Dashboard, lists, details, and the form must share them |

I did not put the search text in Context. Other pages do not need it.

## 22. Context API

`AppointmentProvider` in `src/context/AppointmentContext.jsx` wraps the router in `App.jsx`.

When I create an appointment, `addAppointment` updates the shared list. The dashboard totals, the appointment list, and the patient status all read that same list, so they update together.

Context is a good fit because the shared data is one list and a few functions. A larger library such as Redux would add setup this project does not need.

## 23. Reusable components

I made a component when it had a clear job or removed copied markup.

- `Layout`, `Header`, and `Navigation` are the shell
- `DashboardCard` is one total, used four times
- `PatientCard` and `AppointmentCard` are one record in a list
- `StatusBadge` colors a status
- `SearchBar` is the search input
- `AppointmentForm` is both the create form and the edit form
- `Button`, `LoadingSpinner`, `ErrorMessage`, and `EmptyState` keep messages and actions consistent

`PatientList` exists so the list and its keys are separate from the page that searches.

## 24. Project structure

Pages are screens. Components are pieces of screens. Services talk to data. The hook and context share appointment behavior. Helpers calculate status and format dates.

I can point to a folder and say what kind of code belongs there. That makes the presentation easier to follow.

See the tree in `README.md`.

## 25. React best practices

Practices I can defend in the presentation:

- Function components and descriptive names
- Props for inputs, state for values that change
- The form is controlled
- `fetch` stays in the service files
- Every list item has a stable key
- The user can see loading, error, and empty results
- `useEffect` is for loading, not for derived data
- Appointment state has one owner: the provider
- Create and edit share `AppointmentForm`
- Cancel changes status and keeps the record

## 26. Challenges and lessons learned

- The first menu used local state, so the address never changed. React Router made the address the source of truth.
- If each page kept its own appointment array, a new appointment would disappear after navigation. Context fixed that.
- `/appointments/new` has to stay a fixed route so `new` is not read as an id.
- Copying the create form into an edit form would mean fixing bugs twice. One form with `initialValues` is easier to explain.
- A cancelled visit should remain visible, so cancel is an update, not a delete.
- Patient status is calculated from appointments. It is not stored a second time on the patient, so the badge stays correct after create, edit, or cancel.

## 27. What I learned during the 3-month goal

I can build a React application that demonstrates:

- reusable components and props
- `useState` for search, filters, and forms
- `useEffect` for loading data
- `useContext` for appointments shared across pages
- a custom hook for that shared logic
- `fetch` with loading and error handling
- React Router, including dynamic routes
- controlled forms and simple validation
- conditional rendering for loading, errors, and empty lists

I can open a file and explain why that code is there.

## 28. Future learning areas

- React Testing Library for the form, filters, and cancel action
- TypeScript for the appointment and patient shapes
- A real backend when the data must survive a refresh
- Accessibility review for the form and menu
- React Query, or a similar data library, if many requests need caching
- Redux only if Context becomes hard to follow because many unrelated values are shared

## Suggested demo order

1. Open the dashboard and explain `DashboardCard` props.
2. Search and filter patients. Mention local state and `useMemo`.
3. Open a patient and show the id in the address. Mention `useParams`.
4. Open appointments, filter by status, and open one record.
5. Create an appointment, then show it on the details page and the dashboard.
6. Edit it with the same form.
7. Cancel it and show that the status changes to Cancelled and the card remains.
8. Open `AppointmentContext.jsx` and `useAppointments.js` and explain shared state.
9. Open `patientService.js` and explain why `fetch` is outside the component.
