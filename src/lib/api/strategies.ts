import apiClient from './client';

export interface Strategy {
    id: string;
    name: string;
    status: string;
    type: string;
    isAutonomous: boolean;
}

export const strategyApi = {
    updateStrategy: async (id: string, data: Partial<Strategy>): Promise<Strategy> => {
        const response = await apiClient.patch(`/api/strategies/strategies/${id}/`, data);
        return response.data;
    },
};
