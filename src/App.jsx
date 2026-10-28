import { useState, useEffect } from "react";
import { getCurrencies } from "./services/frankfurter";
import { useHistory } from "./hooks/useHistory";
import Converter from "./components/Converter";
import PeriodSelector from "./components/PeriodSelector";
import RateChart from "./components/RateChart";
import RateTable from "./components/RateTable";
import styles from "./App.module.css";

export default function App() {
  const [currencies, setCurrencies] = useState({});
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("BRL");
  const [days, setDays] = useState(30);

  const { data, loading, error } = useHistory(from, to, days);

  useEffect(() => {
    getCurrencies().then(setCurrencies).catch(() => {});
  }, []);

  function swap() {
    setFrom(to);
    setTo(from);
  }

  return (
    <main className={styles.container}>
      <h1>Currency Exchange</h1>
      <Converter
        currencies={currencies}
        from={from}
        to={to}
        onFromChange={setFrom}
        onToChange={setTo}
        onSwap={swap}
      />
      <PeriodSelector days={days} onChange={setDays} />
      {loading && <p>Carregando...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && data.length === 0 && <p>Nenhum dado encontrado.</p>}
      {!loading && !error && data.length > 0 && (
        <>
          <RateChart data={data} />
          <RateTable rows={data} />
        </>
      )}
    </main>
  );
}