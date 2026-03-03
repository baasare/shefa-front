export default function ApprovalsPage() {
  return (
    <div>
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold">Approvals</h1>
        <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white">
          HITL
        </span>
      </div>
      <p className="mt-2 text-muted-foreground">Review pending trade approvals</p>
    </div>
  );
}
