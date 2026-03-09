import apiClient from './client';

export interface Agent {
    id: string;
    name: string;
    description: string;
    model: string;
    dataSources: string[];
    systemPrompt: string;
    status: string;
    statusColor: string;
    is_active?: boolean;
    last_run_at?: string;
    agent_type?: string;
    run_count?: number;
    success_rate?: number;
}

export interface AgentCreateInput {
    name: string;
    description?: string;
    model: string;
    dataSources?: string[];
    systemPrompt?: string;
    system_prompt?: string;
    agent_type?: string;
    temperature?: number;
    max_tokens?: number;
    data_source?: string;
    analysis_frequency?: number;
}

export interface AgentStatistics {
    id: string;
    totalRuns: number;
    successRate: number;
    lastRunTime?: string;
    recentRuns: Array<{
        id: string;
        status: string;
        timestamp: string;
        duration: string;
    }>;
}

export interface AgentDecision {
    id: string;
    agent: string;
    decision: string;
    status: string;
    created_at: string;
    confidence?: string | number;
    symbol?: string;
    action?: string;
    quantity?: number;
    rationale?: string;
    approved_at?: string;
    rejected_at?: string;
}

export interface AgentLog {
    id: string;
    agent: string;
    message: string;
    level: string;
    timestamp?: string;
    created_at: string;
    agent_run?: {
        strategy?: {
            name: string;
        };
    };
}

export const agentApi = {
    // Custom Agent CRUD operations
    getAgents: async (): Promise<Agent[]> => {
        const response = await apiClient.get('agents/');
        return response.data;
    },

    getAgent: async (id: string): Promise<Agent> => {
        const response = await apiClient.get(`agents/${id}/`);
        return response.data;
    },

    createAgent: async (data: AgentCreateInput): Promise<Agent> => {
        const response = await apiClient.post('agents/', data);
        return response.data;
    },

    updateAgent: async (id: string, data: Partial<AgentCreateInput>): Promise<Agent> => {
        const response = await apiClient.patch(`agents/${id}/`, data);
        return response.data;
    },

    deleteAgent: async (id: string): Promise<void> => {
        await apiClient.delete(`agents/${id}/`);
    },

    // Custom Agent actions
    activateAgent: async (id: string): Promise<{ success: boolean; message: string }> => {
        const response = await apiClient.post(`agents/${id}/activate/`);
        return response.data;
    },

    deactivateAgent: async (id: string): Promise<{ success: boolean; message: string }> => {
        const response = await apiClient.post(`agents/${id}/deactivate/`);
        return response.data;
    },

    runAgent: async (id: string): Promise<{ success: boolean; task_id: string; message: string }> => {
        const response = await apiClient.post(`agents/${id}/run/`);
        return response.data;
    },

    getAgentStatistics: async (id: string): Promise<AgentStatistics> => {
        const response = await apiClient.get(`agents/${id}/statistics/`);
        return response.data;
    },

    // Built-in Multi-Agent Analysis System
    analyzeStock: async (portfolioId: string, symbol: string): Promise<{
        success: boolean;
        task_id: string;
        portfolio_id: string;
        symbol: string;
        message: string;
    }> => {
        const response = await apiClient.post('agent-analysis/analyze-stock/', {
            portfolio_id: portfolioId,
            symbol,
        });
        return response.data;
    },

    multiAgentConsensus: async (portfolioId: string, symbols: string[]): Promise<{
        success: boolean;
        task_id: string;
        portfolio_id: string;
        symbols_count: number;
        message: string;
    }> => {
        const response = await apiClient.post('agent-analysis/multi-agent-consensus/', {
            portfolio_id: portfolioId,
            symbols,
        });
        return response.data;
    },

    getTaskStatus: async (taskId: string): Promise<{
        task_id: string;
        state: 'PENDING' | 'STARTED' | 'SUCCESS' | 'FAILURE';
        result?: Record<string, unknown>;
        error?: string;
    }> => {
        const response = await apiClient.get(`agent-analysis/task-status/${taskId}/`);
        return response.data;
    },

    // Agent Decisions (for HITL approval)
    getPendingDecisions: async (): Promise<AgentDecision[]> => {
        const response = await apiClient.get('agent-decisions/');
        return response.data;
    },

    // Agent Logs
    getAgentLogs: async (params?: { limit?: number; offset?: number }): Promise<{ results: AgentLog[]; count: number }> => {
        const response = await apiClient.get('agent-logs/', { params });
        return response.data;
    },
};
