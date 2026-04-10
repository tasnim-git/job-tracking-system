import { useEffect, useMemo, useState } from "react";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import Stats from "./components/Stats";
import "./App.css";

const STATUS_OPTIONS = ["Applied", "Interview", "Offer", "Rejected"];

const SORT_OPTIONS = {
  newest: "Newest",
  oldest: "Oldest",
  companyAsc: "Company A-Z",
  companyDesc: "Company Z-A",
};

const createId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const normalizeJob = (job) => ({
  id: job.id ?? createId(),
  company: job.company ?? "",
  role: job.role ?? "",
  status: STATUS_OPTIONS.includes(job.status) ? job.status : "Applied",
  location: job.location ?? "",
  appliedDate: job.appliedDate ?? "",
  notes: job.notes ?? "",
  createdAt: job.createdAt ?? new Date().toISOString(),
});

function App() {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const raw = localStorage.getItem("jobs");

    if (!raw) {
      return;
    }

    try {
      const saved = JSON.parse(raw);

      if (Array.isArray(saved)) {
        setJobs(saved.map(normalizeJob));
      }
    } catch {
      setJobs([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (payload) => {
    const newJob = normalizeJob({
      ...payload,
      id: createId(),
      createdAt: new Date().toISOString(),
    });

    setJobs((prev) => [newJob, ...prev]);
  };

  const deleteJob = (id) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  const updateJobStatus = (id, status) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status } : job)),
    );
  };

  const filteredJobs = useMemo(() => {
    const lowered = query.trim().toLowerCase();

    const result = jobs.filter((job) => {
      const matchStatus = statusFilter === "All" || job.status === statusFilter;
      const matchQuery =
        !lowered ||
        [job.company, job.role, job.location, job.notes]
          .join(" ")
          .toLowerCase()
          .includes(lowered);

      return matchStatus && matchQuery;
    });

    result.sort((a, b) => {
      if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }

      if (sortBy === "companyAsc") {
        return a.company.localeCompare(b.company);
      }

      if (sortBy === "companyDesc") {
        return b.company.localeCompare(a.company);
      }

      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return result;
  }, [jobs, query, statusFilter, sortBy]);

  const stats = useMemo(
    () => ({
      total: jobs.length,
      applied: jobs.filter((job) => job.status === "Applied").length,
      interview: jobs.filter((job) => job.status === "Interview").length,
      offer: jobs.filter((job) => job.status === "Offer").length,
      rejected: jobs.filter((job) => job.status === "Rejected").length,
    }),
    [jobs],
  );

  const clearAll = () => {
    setJobs([]);
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Career Pipeline</p>
          <h1>Job Tracker</h1>
        </div>
        <button
          type="button"
          className="ghost-btn"
          onClick={clearAll}
          disabled={!jobs.length}
        >
          Clear All
        </button>
      </header>

      <Stats stats={stats} />

      <section className="dashboard-grid">
        <JobForm onAddJob={addJob} statusOptions={STATUS_OPTIONS} />

        <JobList
          jobs={filteredJobs}
          totalJobs={jobs.length}
          query={query}
          onQueryChange={setQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          statusOptions={STATUS_OPTIONS}
          sortOptions={SORT_OPTIONS}
          onDelete={deleteJob}
          onStatusChange={updateJobStatus}
        />
      </section>
    </main>
  );
}

export default App;