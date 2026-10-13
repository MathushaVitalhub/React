function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}

// The service keeps fetch outside the page components.
export async function getPatients() {
  try {
    const response = await fetch('/data/patients.json')
    // A short delay makes the loading message easy to see during a demo.
    await wait(400)

    if (!response.ok) {
      throw new Error('Unable to load patients.')
    }

    return await response.json()
  } catch {
    throw new Error('Unable to load patients. Please try again.')
  }
}
