import { Metadata } from 'next';
import { PlayCircle, Clock, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Tutorials — ShefaFx',
    description: 'Video and interactive tutorials for ShefaFx.',
};

const tutorials = [
    { id: '1', title: 'Platform Overview', duration: '6:45', completed: true, level: 'Beginner', description: 'A full tour of the ShefaFx dashboard and all major features.' },
    { id: '2', title: 'Setting Up Your First Strategy', duration: '12:30', completed: true, level: 'Beginner', description: 'Watch how to create, configure, and activate a trading strategy from scratch.' },
    { id: '3', title: 'Understanding the Risk Agent', duration: '8:15', completed: false, level: 'Intermediate', description: 'Deep dive into how the Risk Agent monitors drawdowns and auto-pauses strategies.' },
    { id: '4', title: 'Human-in-the-Loop Approvals', duration: '5:20', completed: false, level: 'Intermediate', description: 'How to review and approve AI trade decisions in the Approvals dashboard.' },
    { id: '5', title: 'Advanced Strategy Builder', duration: '18:00', completed: false, level: 'Advanced', description: 'Using the visual builder to create complex multi-signal strategies.' },
    { id: '6', title: 'Backtesting & Performance Analysis', duration: '14:40', completed: false, level: 'Advanced', description: 'Running backtests and interpreting performance metrics for strategy optimisation.' },
];

const levelColor: Record<string, string> = {
    Beginner: 'text-[rgb(var(--success))] bg-[rgb(var(--success))]/10',
    Intermediate: 'text-[rgb(var(--warning))] bg-[rgb(var(--warning))]/10',
    Advanced: 'text-[rgb(var(--destructive))] bg-[rgb(var(--destructive))]/10',
};

const completed = tutorials.filter((t) => t.completed).length;

export default function TutorialsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Tutorials</h1>
                    <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Video tutorials to master ShefaFx</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-[rgb(var(--muted-foreground))]">Progress</p>
                    <p className="text-sm font-semibold text-[rgb(var(--foreground))]">{completed}/{tutorials.length} completed</p>
                </div>
            </div>

            {/* Progress bar */}
            <div>
                <div className="h-2 rounded-full bg-[rgb(var(--muted))]">
                    <div
                        className="h-2 rounded-full bg-[rgb(var(--primary))] transition-all duration-500"
                        style={{ width: `${(completed / tutorials.length) * 100}%` }}
                    />
                </div>
                <p className="text-xs text-[rgb(var(--muted-foreground))] mt-1">{Math.round((completed / tutorials.length) * 100)}% complete</p>
            </div>

            {/* Tutorial list */}
            <div className="space-y-3">
                {tutorials.map((t, i) => (
                    <div key={t.id} className={`rounded-xl border bg-[rgb(var(--card))] p-5 flex items-center gap-4 transition-all hover:border-[rgb(var(--primary))]/40 ${t.completed ? 'border-[rgb(var(--success))]/30' : 'border-[rgb(var(--border))]'}`}>
                        <span className="text-lg font-bold font-mono text-[rgb(var(--muted-foreground))] w-6 text-center flex-shrink-0">
                            {i + 1}
                        </span>
                        <button className={`flex-shrink-0 ${t.completed ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--primary))]'} hover:opacity-80 transition-opacity`}>
                            {t.completed
                                ? <CheckCircle2 className="h-10 w-10" strokeWidth={1.5} />
                                : <PlayCircle className="h-10 w-10" strokeWidth={1.5} />}
                        </button>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-[rgb(var(--foreground))] truncate">{t.title}</h3>
                                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase flex-shrink-0 ${levelColor[t.level]}`}>{t.level}</span>
                            </div>
                            <p className="text-xs text-[rgb(var(--muted-foreground))] leading-relaxed">{t.description}</p>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0 text-xs text-[rgb(var(--muted-foreground))]">
                            <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
                            {t.duration}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
