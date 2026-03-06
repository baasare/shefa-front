'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Check, AlertCircle, Sparkles } from 'lucide-react';
import { agentApi } from '@/lib/api/agents';
import { routes } from '@/lib/config/routes';
import { agentTemplates, templateCategories, type AgentTemplate } from '@/lib/data/agent-templates';

const models = ['GPT-4o', 'Claude 3.5 Sonnet', 'Gemini 1.5 Pro'];
const dataSourceOptions = ['Market Data', 'Social Sentiment', 'Global News', 'On-chain Data'];

const createAgentSchema = z.object({
    name: z.string().min(3, 'Agent name must be at least 3 characters'),
    description: z.string().optional(),
    model: z.string().min(1, 'Please select a model'),
    dataSources: z.array(z.string()).min(1, 'Select at least one data source'),
    systemPrompt: z.string().min(10, 'Prompt must be at least 10 characters'),
});

type CreateAgentFormValues = z.infer<typeof createAgentSchema>;

export default function CreateAgentPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [showTemplates, setShowTemplates] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<CreateAgentFormValues>({
        resolver: zodResolver(createAgentSchema),
        defaultValues: {
            name: '',
            description: '',
            model: 'GPT-4o',
            dataSources: [],
            systemPrompt: '',
        },
    });

    function applyTemplate(template: AgentTemplate) {
        setValue('name', template.name);
        setValue('description', template.description);
        setValue('model', template.model === 'gpt-4' ? 'GPT-4o' : template.model === 'claude-3-sonnet' ? 'Claude 3.5 Sonnet' : 'GPT-4o');
        setValue('dataSources', template.dataSources);
        setValue('systemPrompt', template.systemPrompt);
        setShowTemplates(false);
    }

    const filteredTemplates = selectedCategory === 'all'
        ? agentTemplates
        : agentTemplates.filter(t => t.category === selectedCategory);

    async function onSubmit(data: CreateAgentFormValues) {
        setLoading(true);
        setServerError(null);

        try {
            // Map frontend fields to backend schema
            const agentData = {
                name: data.name,
                description: data.description || '',
                agent_type: 'general', // Default since we removed the multi-select
                model: data.model === 'GPT-4o' ? 'gpt-4' : data.model === 'Claude 3.5 Sonnet' ? 'claude-3-sonnet' : 'gpt-3.5-turbo',
                temperature: 0.7,
                max_tokens: 4000,
                data_source: data.dataSources && data.dataSources.length > 0 ? 'polygon' : 'polygon',
                system_prompt: data.systemPrompt,
                analysis_frequency: 30,
            };

            await agentApi.createAgent(agentData);

            setSuccess(true);
            setTimeout(() => {
                router.push(routes.dashboard.agents.index);
            }, 1000);
        } catch (error: any) {
            console.error('Submission error:', error);
            setServerError(error.response?.data?.error || error.response?.data?.detail || 'Failed to create agent. Please try again.');
            setLoading(false);
        }
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
                    Agents / Create New Agent
                </Link>
                <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Create New Agent</h1>
                <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Configure an AI bot for your trading dashboard</p>
            </div>

            {serverError && (
                <div className="rounded-lg bg-[rgb(var(--destructive))]/10 p-4 border border-[rgb(var(--destructive))]/20 flex gap-3 text-sm text-[rgb(var(--destructive))]">
                    <AlertCircle className="h-5 w-5 shrink-0" strokeWidth={2} />
                    {serverError}
                </div>
            )}

            {/* Template Selector */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
                <button
                    type="button"
                    onClick={() => setShowTemplates(!showTemplates)}
                    className="flex items-center gap-2 text-sm font-medium text-[rgb(var(--primary))] hover:text-[rgb(var(--primary))]/80 transition-colors"
                >
                    <Sparkles className="h-4 w-4" />
                    {showTemplates ? 'Hide Templates' : 'Start from a Template'}
                </button>

                {showTemplates && (
                    <div className="mt-4 space-y-4">
                        {/* Category Filter */}
                        <div className="flex gap-2 flex-wrap">
                            <button
                                type="button"
                                onClick={() => setSelectedCategory('all')}
                                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                                    selectedCategory === 'all'
                                        ? 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border-[rgb(var(--primary))]/30'
                                        : 'text-[rgb(var(--muted-foreground))] border-[rgb(var(--border))] hover:border-[rgb(var(--foreground))]/30'
                                }`}
                            >
                                All Templates
                            </button>
                            {templateCategories.map((cat) => (
                                <button
                                    key={cat.value}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat.value)}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                                        selectedCategory === cat.value
                                            ? 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border-[rgb(var(--primary))]/30'
                                            : 'text-[rgb(var(--muted-foreground))] border-[rgb(var(--border))] hover:border-[rgb(var(--foreground))]/30'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Template Cards */}
                        <div className="grid gap-3 sm:grid-cols-2">
                            {filteredTemplates.map((template) => (
                                <button
                                    key={template.id}
                                    type="button"
                                    onClick={() => applyTemplate(template)}
                                    className="text-left p-4 rounded-lg border border-[rgb(var(--border))] hover:border-[rgb(var(--primary))]/50 hover:bg-[rgb(var(--muted))]/20 transition-all group"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-sm font-semibold text-[rgb(var(--foreground))] group-hover:text-[rgb(var(--primary))]">
                                            {template.name}
                                        </h3>
                                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]">
                                            {template.category}
                                        </span>
                                    </div>
                                    <p className="text-xs text-[rgb(var(--muted-foreground))] line-clamp-2">
                                        {template.description}
                                    </p>
                                    <div className="flex gap-1 mt-2 flex-wrap">
                                        {template.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[10px] px-1.5 py-0.5 rounded bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))]"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 space-y-6">

                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Agent Name *</label>
                    <input
                        {...register('name')}
                        placeholder="e.g. Sentiment Scanner"
                        className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                    />
                    {errors.name && <p className="text-xs text-[rgb(var(--destructive))] mt-1.5">{errors.name.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Description (Optional)</label>
                    <textarea
                        {...register('description')}
                        rows={2}
                        placeholder="What does this agent do?"
                        className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] resize-none"
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
                        placeholder="You are an expert financial analyst. Your task is to..."
                        className="font-mono w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-3 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-[rgb(var(--primary))] resize-y transition-colors"
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
                            <><Check className="h-4 w-4" strokeWidth={2} /> Created!</>
                        ) : loading ? (
                            <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> Creating...</>
                        ) : (
                            'Create Agent'
                        )}
                    </button>
                </div>

            </form>
        </div>
    );
}
