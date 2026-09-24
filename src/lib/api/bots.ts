import apiClient from './client';

export interface PaperBot {
  id: string;
  name: string;
  idea: string;
  symbols: string[];
  status: 'draft' | 'active' | 'paused' | 'stopped' | 'error';
  portfolio_mode: 'paper';
  max_order_value: string;
  max_open_positions: number;
  daily_loss_limit_pct: string;
  run_frequency_minutes: number;
  next_run_at: string | null;
  last_run_at: string | null;
  last_run_status: string | null;
}

export interface PaperBotRun {
  id: string;
  status: string;
  result: { decisions?: Array<Record<string, unknown>> };
  error_message: string;
  queued_at: string;
  completed_at: string | null;
}

export interface PaperBotEvent {
  id: number;
  event_type: string;
  message: string;
  data: Record<string, unknown>;
  created_at: string;
}

export interface PaperBotInput {
  name: string;
  idea: string;
  symbols: string[];
  max_order_value: number;
  max_open_positions: number;
  daily_loss_limit_pct: number;
  run_frequency_minutes: number;
}

export const botsApi = {
  list: async () => (await apiClient.get<PaperBot[]>('bots/')).data,
  create: async (input: PaperBotInput) => (await apiClient.post<PaperBot>('bots/', input)).data,
  draft: async (idea: string) => (await apiClient.post<{ name: string; instructions: string; summary: string }>('bots/draft/', { idea })).data,
  start: async (id: string) => (await apiClient.post<PaperBot>(`bots/${id}/start/`)).data,
  pause: async (id: string) => (await apiClient.post<PaperBot>(`bots/${id}/pause/`)).data,
  stop: async (id: string) => (await apiClient.post<PaperBot>(`bots/${id}/stop/`)).data,
  run: async (id: string) => (await apiClient.post<PaperBotRun>(`bots/${id}/run/`)).data,
  runs: async (id: string) => (await apiClient.get<PaperBotRun[]>(`bots/${id}/runs/`)).data,
  events: async (id: string) => (await apiClient.get<PaperBotEvent[]>(`bots/${id}/events/`)).data,
};
