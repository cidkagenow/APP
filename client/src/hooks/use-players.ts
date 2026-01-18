import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function usePlayers() {
  return useQuery({
    queryKey: [api.players.list.path],
    queryFn: async () => {
      const res = await fetch(api.players.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch players");
      return api.players.list.responses[200].parse(await res.json());
    },
  });
}

export function useFeaturedPlayers() {
  return useQuery({
    queryKey: [api.players.featured.path],
    queryFn: async () => {
      const res = await fetch(api.players.featured.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch featured players");
      return api.players.featured.responses[200].parse(await res.json());
    },
  });
}
