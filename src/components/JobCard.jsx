export default function JobCard({ job, onDelete, onStatusChange, statusOptions }) {
  const appliedText = job.appliedDate
    ? new Date(job.appliedDate).toLocaleDateString()
    : "Date not set";

  return (
    <article className="job-card">
      <header>
        <div>
          <h3>{job.company}</h3>
          <p className="role">{job.role}</p>
        </div>
        <span className={`status-badge status-${job.status.toLowerCase()}`}>{job.status}</span>
      </header>

      <div className="meta-grid">
        <p>
          <strong>Location:</strong> {job.location || "Not specified"}
        </p>
        <p>
          <strong>Applied:</strong> {appliedText}
        </p>
      </div>

      {job.notes ? <p className="notes">{job.notes}</p> : null}

      <footer>
        <select value={job.status} onChange={(event) => onStatusChange(job.id, event.target.value)}>
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <button type="button" className="danger-btn" onClick={() => onDelete(job.id)}>
          Delete
        </button>
      </footer>
    </article>
  );
}