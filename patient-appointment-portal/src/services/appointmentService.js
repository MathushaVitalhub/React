function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}

// Initial appointments come from a GET request.
// Later edits stay in Context because this project has no backend.
export async function getAppointments() {
  try {
    const response = await fetch('/data/appointments.json')
    await wait(400)

    if (!response.ok) {
      throw new Error('Unable to load appointments.')
    }

    return await response.json()
  } catch {
    throw new Error('Unable to load appointments. Please try again.')
  }
}
