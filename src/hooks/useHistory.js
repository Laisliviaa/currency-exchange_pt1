import { useState, useEffect } from "react";
import { getHistory } from "../services/frankfurter";
import { getRange } from "../utils/dates";

export function useHistory(from, to, days) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!from || !to || from === to) return;
    let cancelled = false;
    const { start, end } = getRange(days);

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const json = await getHistory(from, to, start, end);
        const rows = Object.entries(json.rates).map(([date, r]) => ({
          date,
          from,
          to,
          rate: r[to],
        }));
        if (!cancelled) setData(rows);
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [from, to, days]);

  return { data, loading, error };
}