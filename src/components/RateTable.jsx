import { useState } from "react";
import { filterRows, sortRows } from "../utils/tableUtils";
import { exportCsv } from "../utils/exportCsv";
import styles from "./RateTable.module.css";

const EMPTY = { startDate: "", endDate: "", minRate: "", maxRate: "" };

export default function RateTable({ rows }) {
  const [filters, setFilters] = useState(EMPTY);
  const [sortField, setSortField] = useState("date");
  const [sortDir, setSortDir] = useState("desc");

  function handleChange(e) {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }

  function toggleSort(field) {
    if (field === sortField) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  }

  const visible = sortRows(filterRows(rows, filters), sortField, sortDir);
  const arrow = (f) => (f === sortField ? (sortDir === "asc" ? " ↑" : " ↓") : "");

  return (
    <section className={styles.box}>
      <div className={styles.filters}>
        <label>
          De
          <input type="date" name="startDate" value={filters.startDate} onChange={handleChange} />
        </label>
        <label>
          Até
          <input type="date" name="endDate" value={filters.endDate} onChange={handleChange} />
        </label>
        <label>
          Cotação mín.
          <input type="number" step="any" name="minRate" value={filters.minRate} onChange={handleChange} />
        </label>
        <label>
          Cotação máx.
          <input type="number" step="any" name="maxRate" value={filters.maxRate} onChange={handleChange} />
        </label>
        <button onClick={() => setFilters(EMPTY)}>Limpar filtros</button>
        <button onClick={() => exportCsv(visible)} disabled={visible.length === 0}>
          Exportar CSV
        </button>
      </div>

      <p>{visible.length} registro(s) encontrado(s)</p>

      {visible.length === 0 ? (
        <p>Nenhum registro para os filtros aplicados.</p>
      ) : (
        <div className={styles.scroll}>
          <table>
            <thead>
              <tr>
                <th onClick={() => toggleSort("date")} className={styles.sortable}>
                  Data{arrow("date")}
                </th>
                <th>Origem</th>
                <th>Destino</th>
                <th onClick={() => toggleSort("rate")} className={styles.sortable}>
                  Cotação{arrow("rate")}
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((r) => (
                <tr key={r.date}>
                  <td>{r.date}</td>
                  <td>{r.from}</td>
                  <td>{r.to}</td>
                  <td>{r.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}