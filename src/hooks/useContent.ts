import { useQuery } from '@tanstack/react-query';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function fetchContent(): Promise<Record<string, string>> {
  try {
    const res = await fetch(`${BASE_URL}/content`);
    if (!res.ok) return {};
    return res.json();
  } catch {
    return {};
  }
}

export function useContent() {
  return useQuery<Record<string, string>>({
    queryKey: ['content'],
    queryFn: fetchContent,
    staleTime: 10 * 60 * 1000,
  });
}
