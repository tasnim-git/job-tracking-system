import JobCard from "./JobCard";

export default function JobList({
  jobs,
  totalJobs,
  query,
  onQueryChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortChange,
  statusOptions,
  sortOptions,
  onDelete,
  onStatusChange,
}) {
  return (
    <section className="panel list-panel">
      <div className="list-head">
        <div>
          <h2>Applications</h2>
          <p className="helper-text">
            Showing {jobs.length} of {totalJobs}
          </p>
        </div>
      </div>

      <div className="list-controls">
        <input
          type="search"
          placeholder="Search company, role, location, notes"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(event) => onStatusFilterChange(event.target.value)}
        >
          <option value="All">All Status</option>
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select value={sortBy} onChange={(event) => onSortChange(event.target.value)}>
          {Object.entries(sortOptions).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="cards-wrap">
        {jobs.length ? (
          jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
              statusOptions={statusOptions}
            />
          ))
        ) : (
          <div className="empty-state">
            <p>No jobs found for current filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}
