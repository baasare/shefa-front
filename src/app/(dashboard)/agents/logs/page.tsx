import { Metadata } from 'next';
import LogsClient from './LogsClient';

export const metadata: Metadata = {
    title: 'Agent Logs — ShefaFx',
    description: 'Full activity log stream from all AI agents.',
};

export default function AgentLogsPage() {
    return <LogsClient />;
}
