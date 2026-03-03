/**
 * UI Store
 * Manages theme and sidebar state with localStorage persistence
 */

'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';

interface UIState {
    theme: Theme;
    sidebarOpen: boolean;
    sidebarCollapsed: boolean;

    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
    setSidebarOpen: (open: boolean) => void;
    toggleSidebar: () => void;
    setSidebarCollapsed: (collapsed: boolean) => void;
}

export const useUIStore = create<UIState>()(
    persist(
        (set, get) => ({
            theme: 'dark',
            sidebarOpen: true,
            sidebarCollapsed: false,

            setTheme: (theme) => set({ theme }),

            toggleTheme: () => {
                const current = get().theme;
                set({ theme: current === 'dark' ? 'light' : 'dark' });
            },

            setSidebarOpen: (open) => set({ sidebarOpen: open }),

            toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

            setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
        }),
        {
            name: 'shefa-ui',
            // Only persist theme and sidebar collapse state
            partialize: (state) => ({
                theme: state.theme,
                sidebarCollapsed: state.sidebarCollapsed,
            }),
        }
    )
);
