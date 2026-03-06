import { Metadata } from 'next';
import PerformanceClient from './PerformanceClient';

export const metadata: Metadata = {
    title: 'Agent Performance — ShefaFx',
    description: 'Performance metrics and analytics for AI agents',
};

export default function AgentPerformancePage({ params }: { params: { id: string } }) {
    return <PerformanceClient agentId={params.id} />;
}
