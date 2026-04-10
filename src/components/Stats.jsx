const safePercent = (part, total) => {
  if (!total) {
    return "0%";
  }

  return `${Math.round((part / total) * 100)}%`;
};

export default function Stats({ stats }) {
  const cards = [
    { label: "Total", value: stats.total, tone: "neutral" },
    { label: "Applied", value: stats.applied, tone: "applied" },
    { label: "Interview", value: stats.interview, tone: "interview" },
    { label: "Offer", value: stats.offer, tone: "offer" },
    { label: "Rejected", value: stats.rejected, tone: "rejected" },
  ];

  return (
    <section className="stats-grid">
      {cards.map((card) => (
        <article key={card.label} className={`stat-card stat-${card.tone}`}>
          <p>{card.label}</p>
          <h3>{card.value}</h3>
        </article>
      ))}

      <article className="stat-card stat-highlight">
        <p>Interview Rate</p>
        <h3>{safePercent(stats.interview, stats.total)}</h3>
      </article>

      <article className="stat-card stat-highlight">
        <p>Offer Rate</p>
        <h3>{safePercent(stats.offer, stats.total)}</h3>
      </article>
    </section>
  );
}