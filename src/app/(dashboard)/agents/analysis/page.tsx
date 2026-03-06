import { Metadata } from 'next';
import AgentAnalysisClient from './AgentAnalysisClient';

export const metadata: Metadata = {
    title: 'New Analysis — ShefaFx',
    description: 'Request a new market analysis from your AI agents.',
};

export default function AgentAnalysisPage() {
    return <AgentAnalysisClient />;
}
