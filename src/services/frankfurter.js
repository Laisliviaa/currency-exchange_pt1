const BASE_URL = "https://api.frankfurter.dev/v1";

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`Erro ${res.status} ao consultar a API`);
  return res.json();
}

export const getCurrencies = () => request("/currencies");

export const getLatestRate = (from, to) =>
  request(`/latest?base=${from}&symbols=${to}`);

export const getHistory = (from, to, start, end) =>
  request(`/${start}..${end}?base=${from}&symbols=${to}`);