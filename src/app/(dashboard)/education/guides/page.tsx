import { Metadata } from 'next';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Guides — ShefaFx',
    description: 'Step-by-step guides for AI trading and the ShefaFx platform.',
};

const guides = [
    { id: '1', title: 'Getting Started with ShefaFx', category: 'Beginner', readTime: '5 min', description: 'A complete walkthrough of setting up your portfolio, connecting a broker, and activating your first strategy.' },
    { id: '2', title: 'Understanding AI Trading Agents', category: 'Beginner', readTime: '8 min', description: 'Learn how the Analysis, Trade, Risk, and Approval agents work together to manage your portfolio.' },
    { id: '3', title: 'Risk Management Fundamentals', category: 'Intermediate', readTime: '12 min', description: 'Position sizing, drawdown limits, and how to set up risk guards to protect your capital.' },
    { id: '4', title: 'Creating Your First Strategy', category: 'Beginner', readTime: '10 min', description: 'Step-by-step guide to creating a momentum-based strategy using the visual builder.' },
    { id: '5', title: 'Reading Agent Logs and Decisions', category: 'Intermediate', readTime: '7 min', description: 'How to interpret agent decisions, confidence scores, and risk ratings.' },
    { id: '6', title: 'Advanced Strategy Configuration', category: 'Advanced', readTime: '20 min', description: 'Customise entry signals, multi-leg orders, and parameter optimisation for experienced users.' },
];

const categoryColor: Record<string, string> = {
    Beginner: 'text-[rgb(var(--success))] bg-[rgb(var(--success))]/10',
    Intermediate: 'text-[rgb(var(--warning))] bg-[rgb(var(--warning))]/10',
    Advanced: 'text-[rgb(var(--destructive))] bg-[rgb(var(--destructive))]/10',
};

export default function GuidesPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Guides</h1>
                <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Step-by-step guides for every feature</p>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2">
                {['All', 'Beginner', 'Intermediate', 'Advanced'].map((t, i) => (
                    <button key={t} className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${i === 0 ? 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border-[rgb(var(--primary))]/20' : 'text-[rgb(var(--muted-foreground))] border-[rgb(var(--border))] hover:text-[rgb(var(--foreground))]'}`}>
                        {t}
                    </button>
                ))}
            </div>

            {/* Guide cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {guides.map((guide) => (
                    <div key={guide.id} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5 flex flex-col hover:border-[rgb(var(--primary))]/40 transition-all group">
                        <div className="flex items-center gap-2 mb-3">
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${categoryColor[guide.category]}`}>
                                {guide.category}
                            </span>
                            <div className="flex items-center gap-1 text-xs text-[rgb(var(--muted-foreground))]">
                                <Clock className="h-3 w-3" strokeWidth={1.5} />
                                {guide.readTime}
                            </div>
                        </div>
                        <h3 className="font-semibold text-[rgb(var(--foreground))] mb-2">{guide.title}</h3>
                        <p className="text-xs text-[rgb(var(--muted-foreground))] leading-relaxed flex-1">{guide.description}</p>
                        <button className="mt-4 flex items-center gap-1.5 text-xs font-medium text-[rgb(var(--primary))] hover:underline transition-all">
                            <BookOpen className="h-3.5 w-3.5" strokeWidth={1.5} />
                            Read Guide
                            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" strokeWidth={2} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
