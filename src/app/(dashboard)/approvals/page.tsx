import { Metadata } from 'next';
import ApprovalsClient from './ApprovalsClient';

export const metadata: Metadata = {
  title: 'Approvals — ShefaFx',
  description: 'Review and approve AI-generated trading suggestions.',
};

export default function ApprovalsPage() {
  return <ApprovalsClient />;
}
