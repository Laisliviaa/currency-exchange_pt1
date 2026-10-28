import { useState } from "react";
import { getLatestRate } from "../services/frankfurter";
import styles from "./Converter.module.css";

export default function Converter({ currencies, from, to, onFromChange, onToChange, onSwap }) {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function handleConvert() {
    const value = Number(amount);
    if (!amount || isNaN(value) || value <= 0) {
      setError("Informe um valor válido maior que zero.");
      setResult(null);
      return;
    }
    if (from === to) {
      setError("Escolha moedas diferentes.");
      setResult(null);
      return;
    }
    try {
      setError("");
      const json = await getLatestRate(from, to);
      const rate = json.rates[to];
      setResult({ value: value * rate, rate, date: json.date });
    } catch (e) {
      setError(e.message);
    }
  }

  const codes = Object.keys(currencies);

  return (
    <section className={styles.box}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Valor"
      />
      <select value={from} onChange={(e) => onFromChange(e.target.value)}>
        {codes.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
      <button onClick={onSwap}>⇄</button>
      <select value={to} onChange={(e) => onToChange(e.target.value)}>
        {codes.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
      <button onClick={handleConvert}>Converter</button>

      {error && <p className={styles.error}>{error}</p>}
      {result && (
        <p>
          {amount} {from} = <strong>{result.value.toFixed(2)} {to}</strong>
          <br />
          Taxa: {result.rate} | Cotação de {result.date}
        </p>
      )}
    </section>
  );
}