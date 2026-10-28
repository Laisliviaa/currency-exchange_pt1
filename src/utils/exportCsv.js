export function exportCsv(rows) {
  if (!rows.length) return false;
  const header = "data,origem,destino,cotacao";
  const lines = rows.map((r) => `${r.date},${r.from},${r.to},${r.rate}`);
  const blob = new Blob([[header, ...lines].join("\n")], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `cotacoes_${rows[0].from}-${rows[0].to}_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  return true;
}