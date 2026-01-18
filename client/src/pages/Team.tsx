import { usePlayers } from "@/hooks/use-players";
import { PlayerCard } from "@/components/PlayerCard";
import { SectionHeader } from "@/components/SectionHeader";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Team() {
  const { data: players, isLoading } = usePlayers();
  const [filter, setFilter] = useState("All");

  const positions = ["All", "Forward", "Midfielder", "Defender", "Goalkeeper"];

  const filteredPlayers = filter === "All" 
    ? players 
    : players?.filter(p => p.position === filter);

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <SectionHeader title="First Team Squad" subtitle="Meet the players representing Oxford United this season" className="mb-0" />
          
          <div className="flex flex-wrap gap-2">
            {positions.map(pos => (
              <button
                key={pos}
                onClick={() => setFilter(pos)}
                className={cn(
                  "px-4 py-2 rounded-sm font-display font-bold uppercase text-sm border transition-all",
                  filter === pos 
                    ? "bg-primary border-primary text-white" 
                    : "bg-transparent border-white/10 text-muted-foreground hover:border-white/30 hover:text-white"
                )}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="aspect-[3/4] bg-card animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {filteredPlayers?.map(player => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
