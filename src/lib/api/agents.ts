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
}

export interface AgentCreateInput {
    name: string;
    description?: string;
    model: string;
    dataSources?: string[];
    systemPrompt: string;
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

export const agentApi = {
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

    runAgent: async (id: string): Promise<{ success: boolean; message: string }> => {
        const response = await apiClient.post(`agents/${id}/run/`);
        return response.data;
    },

    getAgentStatistics: async (id: string): Promise<AgentStatistics> => {
        // Note: this endpoint might need adjustment depending on backend exact response
        const response = await apiClient.get(`agents/${id}/statistics/`);
        return response.data;
    },

    runConsensus: async (agentIds: string[], prompt: string): Promise<any> => {
        const response = await apiClient.post('agents/multi-agent-consensus/', {
            agents: agentIds,
            prompt,
        });
        return response.data;
    },
};
