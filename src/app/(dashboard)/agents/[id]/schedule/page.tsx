import { Metadata } from 'next';
import ScheduleClient from './ScheduleClient';

export const metadata: Metadata = {
    title: 'Agent Schedule — ShefaFx',
    description: 'Configure agent execution schedule and automation',
};

export default function AgentSchedulePage({ params }: { params: { id: string } }) {
    return <ScheduleClient agentId={params.id} />;
}
