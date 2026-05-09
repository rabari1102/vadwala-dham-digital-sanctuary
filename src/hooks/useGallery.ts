import { useQuery } from '@tanstack/react-query';
import { api, type GalleryItem } from '@/services/api';

export function useGallery(tag?: string) {
  return useQuery<GalleryItem[]>({
    queryKey: ['gallery', tag],
    queryFn: async () => {
      const data = await api.getGallery(tag);
      return data ?? [];
    },
  });
}
