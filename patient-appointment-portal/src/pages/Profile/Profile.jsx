import { profile } from '../../data/mockData.js'

function Profile() {
  return (
    <section>
      <h1>Profile</h1>
      <p>This is a sample staff profile for the learning project.</p>
      <dl className="details">
        <dt>Name</dt>
        <dd>{profile.name}</dd>
        <dt>Role</dt>
        <dd>{profile.role}</dd>
        <dt>Email</dt>
        <dd>{profile.email}</dd>
        <dt>Clinic</dt>
        <dd>{profile.clinic}</dd>
      </dl>
    </section>
  )
}

export default Profile
