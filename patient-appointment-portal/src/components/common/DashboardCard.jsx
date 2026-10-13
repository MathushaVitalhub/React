function DashboardCard({ title, value, detail }) {
  return (
    <article className="card stat-card">
      <h2>{title}</h2>
      <p className="stat-value">{value}</p>
      <p className="muted">{detail}</p>
    </article>
  )
}

export default DashboardCard
