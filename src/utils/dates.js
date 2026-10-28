export const PERIODS = [
  { label: "7 dias", days: 7 },
  { label: "15 dias", days: 15 },
  { label: "30 dias", days: 30 },
  { label: "3 meses", days: 90 },
  { label: "6 meses", days: 180 },
  { label: "1 ano", days: 365 },
  { label: "5 anos", days: 1825 },
  { label: "10 anos", days: 3650 },
];

const fmt = (d) => d.toISOString().slice(0, 10);

export function getRange(days) {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - days);
  return { start: fmt(start), end: fmt(end) };
}