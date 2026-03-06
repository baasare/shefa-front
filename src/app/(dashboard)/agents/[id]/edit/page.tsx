'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { agentApi } from '@/lib/api/agents';
import { routes } from '@/lib/config/routes';

const models = ['GPT-4o', 'Claude 3.5 Sonnet', 'Gemini 1.5 Pro'];
const dataSourceOptions = ['Market Data', 'Social Sentiment', 'Global News', 'On-chain Data'];

const editAgentSchema = z.object({
    name: z.string().min(3, 'Agent name must be at least 3 characters'),
    description: z.string().optional(),
    model: z.string().min(1, 'Please select a model'),
    dataSources: z.array(z.string()).min(1, 'Select at least one data source'),
    systemPrompt: z.string().min(10, 'Prompt must be at least 10 characters'),
});

type EditAgentFormValues = z.infer<typeof editAgentSchema>;

export default function EditAgentPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [serverError, setServerError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<EditAgentFormValues>({
        resolver: zodResolver(editAgentSchema),
        defaultValues: {
            name: '',
            description: '',
            model: 'GPT-4o',
            dataSources: [],
            systemPrompt: '',
        },
    });

    useEffect(() => {
        async function loadAgent() {
            try {
                const agent = await agentApi.getAgent(params.id);

                // Map backend data to form fields
                reset({
                    name: agent.name,
                    description: agent.description || '',
                    model: agent.model === 'gpt-4' ? 'GPT-4o' : agent.model === 'claude-3-sonnet' ? 'Claude 3.5 Sonnet' : 'GPT-4o',
                    dataSources: ['Market Data'], // Simplified - backend uses data_source not array
                    systemPrompt: agent.systemPrompt || '',
                });
            } catch (err) {
                setServerError('Failed to load agent details.');
            } finally {
                setFetching(false);
            }
        }
        loadAgent();
    }, [params.id, reset]);

    async function onSubmit(data: EditAgentFormValues) {
        setLoading(true);
        setServerError(null);

        try {
            // Map form data to backend schema
            const updateData = {
                name: data.name,
                description: data.description || '',
                model: data.model === 'GPT-4o' ? 'gpt-4' : data.model === 'Claude 3.5 Sonnet' ? 'claude-3-sonnet' : 'gpt-3.5-turbo',
                system_prompt: data.systemPrompt,
                // Keep other fields from current agent data
            };

            await agentApi.updateAgent(params.id, updateData);

            setSuccess(true);
            setTimeout(() => {
                router.push(routes.dashboard.agents.index);
            }, 1000);
        } catch (error: any) {
            console.error('Submission error:', error);
            setServerError(error.response?.data?.error || error.response?.data?.detail || 'Failed to update agent. Please try again.');
            setLoading(false);
        }
    }

    if (fetching) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-[rgb(var(--primary))] border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-3xl">
            {/* Header */}
            <div>
                <Link
                    href={routes.dashboard.agents.index}
                    className="flex items-center gap-1.5 text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] mb-2 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                    Back to Agents
                </Link>
                <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Edit Agent</h1>
                <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Modify configuration for this agent</p>
            </div>

            {serverError && (
                <div className="rounded-lg bg-[rgb(var(--destructive))]/10 p-4 border border-[rgb(var(--destructive))]/20 flex gap-3 text-sm text-[rgb(var(--destructive))]">
                    <AlertCircle className="h-5 w-5 shrink-0" strokeWidth={2} />
                    {serverError}
                </div>
            )}

            {/* Form Content */}
            <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 space-y-6">

                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Agent Name *</label>
                    <input
                        {...register('name')}
                        className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                    />
                    {errors.name && <p className="text-xs text-[rgb(var(--destructive))] mt-1.5">{errors.name.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Description (Optional)</label>
                    <textarea
                        {...register('description')}
                        rows={2}
                        className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] resize-none"
                    />
                </div>

                {/* Model Selection */}
                <div>
                    <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Model Selection *</label>
                    <select
                        {...register('model')}
                        className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                    >
                        {models.map((m) => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                    {errors.model && <p className="text-xs text-[rgb(var(--destructive))] mt-1.5">{errors.model.message}</p>}
                </div>

                {/* Data Sources Multi-Select Chips */}
                <div>
                    <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">Data Sources *</label>
                    <Controller
                        control={control}
                        name="dataSources"
                        render={({ field }) => (
                            <>
                                <div className="flex flex-wrap gap-2">
                                    {dataSourceOptions.map((ds) => {
                                        const isSelected = field.value.includes(ds);
                                        return (
                                            <button
                                                key={ds}
                                                type="button"
                                                onClick={() => {
                                                    const next = isSelected
                                                        ? field.value.filter((v: string) => v !== ds)
                                                        : [...field.value, ds];
                                                    field.onChange(next);
                                                }}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${isSelected
                                                        ? 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border-[rgb(var(--primary))]/30'
                                                        : 'text-[rgb(var(--muted-foreground))] border-[rgb(var(--border))] hover:border-[rgb(var(--foreground))]/30'
                                                    }`}
                                            >
                                                {ds}
                                            </button>
                                        );
                                    })}
                                </div>
                                {errors.dataSources && <p className="text-xs text-[rgb(var(--destructive))] mt-1.5">{errors.dataSources.message}</p>}
                            </>
                        )}
                    />
                </div>

                {/* System Prompt */}
                <div>
                    <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">System Prompt *</label>
                    <textarea
                        {...register('systemPrompt')}
                        rows={5}
                        className="font-mono w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-3 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-[rgb(var(--primary))] resize-y transition-colors"
                    />
                    <p className="text-xs text-[rgb(var(--muted-foreground))] mt-1.5">Define the persona, rules, and output format for this agent.</p>
                    {errors.systemPrompt && <p className="text-xs text-[rgb(var(--destructive))] mt-1.5">{errors.systemPrompt.message}</p>}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-[rgb(var(--border))]">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        disabled={loading || success}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--border))]/50 transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading || success}
                        className="flex items-center justify-center gap-2 min-w-[140px] rounded-lg bg-[rgb(var(--primary))] px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90 transition-all disabled:opacity-75"
                    >
                        {success ? (
                            <><Check className="h-4 w-4" strokeWidth={2} /> Saved!</>
                        ) : loading ? (
                            <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> Saving...</>
                        ) : (
                            'Save Changes'
                        )}
                    </button>
                </div>

            </form>
        </div>
    );
}
