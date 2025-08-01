
  export type ChartData = { name: string; value: number; color: string };

// Leyenda
  export const renderCustomLegend = (payload: ChartData[]) => (
    <ul className="flex flex-wrap justify-center mt-4 gap-x-8">
      {payload.map((entry, idx) => (
        <li key={`item-${idx}`} className="flex items-center mb-2">
          <span style={{ background: entry.color, width: 16, height: 16, display: 'inline-block', borderRadius: 4, marginRight: 8 }}></span>
          <span style={{ color: entry.color, fontWeight: 600 }}>{entry.name}</span>
        </li>
      ))}
    </ul>
  );