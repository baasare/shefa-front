'use client';

import { useState } from 'react';
import { Key, Plus, Copy, Eye, EyeOff, Trash2 } from 'lucide-react';

const initialKeys = [
    { id: 'key-001', name: 'Production API', prefix: 'sfx_live_', masked: '••••••••••••4a2f', scopes: ['Read', 'Trade'], created: 'Nov 15, 2024', lastUsed: '2 min ago', active: true },
    { id: 'key-002', name: 'Backtesting Service', prefix: 'sfx_live_', masked: '••••••••••••9b7c', scopes: ['Read'], created: 'Oct 3, 2024', lastUsed: '1 hour ago', active: true },
    { id: 'key-003', name: 'Old Integration', prefix: 'sfx_live_', masked: '••••••••••••2d1e', scopes: ['Read', 'Trade', 'Admin'], created: 'Aug 20, 2024', lastUsed: '45 days ago', active: false },
];

export default function ApiKeysPage() {
    const [showCreate, setShowCreate] = useState(false);
    const [newKeyName, setNewKeyName] = useState('');
    const [generatedKey, setGeneratedKey] = useState('');
    const [showKey, setShowKey] = useState(false);

    function handleCreate() {
        if (!newKeyName) return;
        setGeneratedKey(`sfx_live_${Math.random().toString(36).slice(2, 18)}`);
        setShowCreate(false);
        setNewKeyName('');
    }

    return (
        <div className="space-y-6 max-w-2xl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">API Keys</h1>
                    <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Manage API access for developer integrations</p>
                </div>
                <button
                    onClick={() => setShowCreate(true)}
                    className="flex items-center gap-2 rounded-full bg-[rgb(var(--primary))] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-all shadow-[var(--shadow-glow)]"
                >
                    <Plus className="h-4 w-4" strokeWidth={2} />
                    New Key
                </button>
            </div>

            {/* Newly generated key banner */}
            {generatedKey && (
                <div className="rounded-xl border border-[rgb(var(--success))]/30 bg-[rgb(var(--success))]/5 p-4">
                    <p className="text-sm font-semibold text-[rgb(var(--foreground))] mb-2">🎉 New API key created — copy it now, it won&apos;t be shown again.</p>
                    <div className="flex items-center gap-2">
                        <code className="flex-1 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2 font-mono text-xs text-[rgb(var(--foreground))] overflow-x-auto">
                            {showKey ? generatedKey : generatedKey.replace(/./g, '•').slice(0, 20) + generatedKey.slice(-6)}
                        </code>
                        <button onClick={() => setShowKey((s) => !s)} className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors">
                            {showKey ? <EyeOff className="h-4 w-4" strokeWidth={1.5} /> : <Eye className="h-4 w-4" strokeWidth={1.5} />}
                        </button>
                        <button onClick={() => navigator.clipboard.writeText(generatedKey)} className="text-[rgb(var(--primary))] hover:opacity-80 transition-opacity">
                            <Copy className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
            )}

            {/* API keys list */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden">
                <div className="px-5 py-4 border-b border-[rgb(var(--border))]">
                    <h2 className="text-sm font-semibold text-[rgb(var(--foreground))]">Your API Keys</h2>
                </div>
                <div className="divide-y divide-[rgb(var(--border))]">
                    {initialKeys.map((k) => (
                        <div key={k.id} className="px-5 py-4 hover:bg-[rgb(var(--muted))]/20 transition-colors">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3">
                                    <Key className={`h-4 w-4 mt-0.5 flex-shrink-0 ${k.active ? 'text-[rgb(var(--primary))]' : 'text-[rgb(var(--muted-foreground))]'}`} strokeWidth={1.5} />
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-medium text-[rgb(var(--foreground))]">{k.name}</p>
                                            {!k.active && (
                                                <span className="rounded-full bg-[rgb(var(--muted))] px-1.5 py-0.5 text-[10px] font-bold text-[rgb(var(--muted-foreground))] uppercase">Inactive</span>
                                            )}
                                        </div>
                                        <code className="text-xs font-mono text-[rgb(var(--muted-foreground))]">{k.prefix}{k.masked}</code>
                                        <div className="flex gap-2 mt-1.5 flex-wrap">
                                            {k.scopes.map((scope) => (
                                                <span key={scope} className="rounded-md bg-[rgb(var(--muted))] px-1.5 py-0.5 text-[10px] text-[rgb(var(--muted-foreground))]">{scope}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 flex-shrink-0">
                                    <div className="text-right">
                                        <p className="text-[10px] text-[rgb(var(--muted-foreground))]">Created {k.created}</p>
                                        <p className="text-[10px] text-[rgb(var(--muted-foreground))]">Last used {k.lastUsed}</p>
                                    </div>
                                    <button className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--destructive))] transition-colors">
                                        <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Create key dialog */}
            {showCreate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-xl w-full max-w-sm mx-4">
                        <h3 className="text-base font-semibold text-[rgb(var(--foreground))] mb-4">Create API Key</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Key Name *</label>
                                <input
                                    value={newKeyName}
                                    onChange={(e) => setNewKeyName(e.target.value)}
                                    placeholder="e.g. My Integration"
                                    className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">Scopes</label>
                                <div className="space-y-2">
                                    {['Read (portfolio, positions, strategies)', 'Trade (place and cancel orders)', 'Admin (account management)'].map((s) => (
                                        <label key={s} className="flex items-center gap-2 text-sm text-[rgb(var(--foreground))] cursor-pointer">
                                            <input type="checkbox" defaultChecked={s.startsWith('Read')} className="rounded" />
                                            {s}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-5">
                            <button onClick={handleCreate} disabled={!newKeyName} className="flex-1 rounded-full bg-[rgb(var(--primary))] py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40">
                                Generate Key
                            </button>
                            <button onClick={() => setShowCreate(false)} className="flex-1 rounded-full border border-[rgb(var(--border))] py-2.5 text-sm font-medium text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))]">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
