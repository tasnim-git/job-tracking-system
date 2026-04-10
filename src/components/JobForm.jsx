import { useMemo, useState } from "react";

const EMPTY_FORM = {
  company: "",
  role: "",
  location: "",
  appliedDate: "",
  status: "Applied",
  notes: "",
};

export default function JobForm({ onAddJob, statusOptions }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [touched, setTouched] = useState(false);

  const companyError = touched && !form.company.trim() ? "Company is required." : "";
  const roleError = touched && !form.role.trim() ? "Role is required." : "";

  const canSubmit = useMemo(
    () => Boolean(form.company.trim() && form.role.trim()),
    [form.company, form.role],
  );

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched(true);

    if (!canSubmit) {
      return;
    }

    onAddJob(form);
    setForm(EMPTY_FORM);
    setTouched(false);
  };

  return (
    <section className="panel form-panel">
      <h2>Add New Application</h2>
      <p className="helper-text">Track each application with key details and notes.</p>

      <form onSubmit={handleSubmit} className="job-form">
        <label>
          Company
          <input
            type="text"
            placeholder="e.g. Google"
            value={form.company}
            onChange={(event) => updateField("company", event.target.value)}
          />
          {companyError ? <span className="field-error">{companyError}</span> : null}
        </label>

        <label>
          Role
          <input
            type="text"
            placeholder="e.g. Frontend Engineer"
            value={form.role}
            onChange={(event) => updateField("role", event.target.value)}
          />
          {roleError ? <span className="field-error">{roleError}</span> : null}
        </label>

        <div className="row-2">
          <label>
            Location
            <input
              type="text"
              placeholder="Remote / Dhaka"
              value={form.location}
              onChange={(event) => updateField("location", event.target.value)}
            />
          </label>

          <label>
            Applied Date
            <input
              type="date"
              value={form.appliedDate}
              onChange={(event) => updateField("appliedDate", event.target.value)}
            />
          </label>
        </div>

        <label>
          Status
          <select
            value={form.status}
            onChange={(event) => updateField("status", event.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Notes
          <textarea
            rows={4}
            placeholder="Add recruiter name, referral note, links, or interview plan"
            value={form.notes}
            onChange={(event) => updateField("notes", event.target.value)}
          />
        </label>

        <button type="submit" className="primary-btn" disabled={!canSubmit}>
          Save Job
        </button>
      </form>
    </section>
  );
}