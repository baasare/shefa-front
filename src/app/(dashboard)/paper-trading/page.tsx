import { Metadata } from 'next';
import PaperTradingClient from './PaperTradingClient';

export const metadata: Metadata = {
  title: 'Paper Trading — ShefaFx',
  description: 'Create and run AI-assisted paper trading bots.',
};

export default function PaperTradingPage() {
  return <PaperTradingClient />;
}
