export function LogsTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-background-secondary/60">
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Started</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Ended</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Duration</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                {Array.from({ length: 4 }).map((_, j) => (
                  <td key={j} className="px-4 py-3">
                    <div className="h-4 w-28 animate-pulse rounded bg-background-secondary" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}