import { ChatInterface } from '@/components/features/advisor/ChatInterface';

export default function AdvisorPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Advisor</h1>
        <p className="mt-1 text-sm text-[rgb(var(--muted-foreground))]">
          Chat with your AI Financial Advisor in plain English and approve suggested trades.
        </p>
      </div>

      <ChatInterface />
    </div>
  );
}
