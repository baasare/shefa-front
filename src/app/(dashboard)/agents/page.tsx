import { Metadata } from 'next';
import AgentListClient from './AgentListClient';

export const metadata: Metadata = {
  title: 'AI Agents — ShefaFx',
  description: 'Monitor your AI trading agents.',
};

export default function AgentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">AI Agents</h1>
        <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Monitor and control your AI trading agents</p>
      </div>

      <AgentListClient />
    </div>
  );
}
