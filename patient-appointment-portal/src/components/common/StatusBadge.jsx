function StatusBadge({ status }) {
  const statusClass = status.toLowerCase().replace(' ', '-')

  return <span className={`badge badge-${statusClass}`}>{status}</span>
}

export default StatusBadge
