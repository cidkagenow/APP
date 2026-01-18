import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";

export function useMatches(status?: 'upcoming' | 'finished') {
  return useQuery({
    queryKey: [api.matches.list.path, status],
    queryFn: async () => {
      // Build URL with query params if status exists
      const url = status 
        ? `${api.matches.list.path}?status=${status}`
        : api.matches.list.path;
        
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch matches");
      return api.matches.list.responses[200].parse(await res.json());
    },
  });
}
