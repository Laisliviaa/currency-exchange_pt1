export function filterRows(rows, { startDate, endDate, minRate, maxRate }) {
  return rows.filter((r) => {
    if (startDate && r.date < startDate) return false;
    if (endDate && r.date > endDate) return false;
    if (minRate !== "" && r.rate < Number(minRate)) return false;
    if (maxRate !== "" && r.rate > Number(maxRate)) return false;
    return true;
  });
}

export function sortRows(rows, field, direction) {
  const factor = direction === "asc" ? 1 : -1;
  return [...rows].sort((a, b) =>
    field === "date"
      ? a.date.localeCompare(b.date) * factor
      : (a.rate - b.rate) * factor
  );
}