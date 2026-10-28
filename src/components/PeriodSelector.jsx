import { PERIODS } from "../utils/dates";

export default function PeriodSelector({ days, onChange }) {
  return (
    <div>
      {PERIODS.map((p) => (
        <button
          key={p.days}
          onClick={() => onChange(p.days)}
          disabled={days === p.days}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}