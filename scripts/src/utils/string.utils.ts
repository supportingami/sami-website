/** Minimal function to format a json array as a centered markdown table */
export function jsonToMDTable(opts: { headers: string[]; rows: any[] }) {
  const { headers, rows } = opts;
  let output = "";
  // Add top header and separator lines
  addLine(headers);
  addLine(headers.map((h) => new Array(h.length).fill("-").join("")));
  // Add row entries
  for (const row of rows) {
    const values = headers.map((h) => {
      if (row.hasOwnProperty(h)) return row[h];
      return "";
    });
    addLine(values);
  }
  return output;

  function addLine(data: string[]) {
    output += `| ${data.join(" | ")} |\n`;
  }
}
