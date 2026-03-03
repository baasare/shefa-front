export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">Portfolio overview and insights</p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Total Value</h3>
          <p className="mt-2 text-3xl font-bold">$0.00</p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Today&apos;s Change</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">+$0.00</p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Active Strategies</h3>
          <p className="mt-2 text-3xl font-bold">0</p>
        </div>
      </div>
    </div>
  );
}
