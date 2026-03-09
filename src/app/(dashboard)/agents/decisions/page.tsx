import { Metadata } from 'next';
import DecisionsClient from './DecisionsClient';

export const metadata: Metadata = {
    title: 'Agent Decisions — ShefaFx',
    description: 'Review and approve AI agent trade decisions.',
};

export default function AgentDecisionsPage() {
    return <DecisionsClient />;
}
