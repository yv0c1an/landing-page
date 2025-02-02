import { create } from 'zustand';
import axios from 'axios';

interface UrlState {
  safeUrl: string | null;
  isLoading: boolean;
  error: string | null;
  initializeUrl: () => Promise<void>;
}

export const useUrlStore = create<UrlState>((set) => ({
  safeUrl: null,
  isLoading: false,
  error: null,
  initializeUrl: async () => {
    // 如果已经有 URL，不需要再次获取
    const state = useUrlStore.getState();
    if (state.safeUrl || state.isLoading) return;

    set({ isLoading: true });
    try {
      const response = await axios.get('/api/urls');
      set({ safeUrl: response.data.url, isLoading: false, error: null });
    } catch (error) {
      console.error('Error fetching safe URL:', error);
      set({ error: 'Failed to fetch safe URL', isLoading: false });
    }
  },
}));
