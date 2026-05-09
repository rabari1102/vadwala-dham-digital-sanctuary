import { useQuery } from '@tanstack/react-query';
import { api, type FestivalData } from '@/services/api';

export function useEvents() {
  return useQuery<FestivalData[]>({
    queryKey: ['events'],
    queryFn: async () => {
      const data = await api.getFestivals();
      return data ?? [];
    },
  });
}
