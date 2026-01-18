import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useNews() {
  return useQuery({
    queryKey: [api.news.list.path],
    queryFn: async () => {
      const res = await fetch(api.news.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch news");
      return api.news.list.responses[200].parse(await res.json());
    },
  });
}

export function useNewsItem(id: number) {
  return useQuery({
    queryKey: [api.news.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.news.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch news item");
      return api.news.get.responses[200].parse(await res.json());
    },
  });
}
