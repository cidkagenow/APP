import { type Player } from "@shared/schema";
import { cn } from "@/lib/utils";

export function PlayerCard({ player, minimal = false }: { player: Player, minimal?: boolean }) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-card border border-white/5 hover:border-primary/50 transition-all duration-500">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 z-10" />
      
      {/* Number Watermark */}
      <div className="absolute -top-4 -right-4 text-9xl font-display font-bold text-white/5 z-0 group-hover:text-primary/10 transition-colors">
        {player.number}
      </div>

      <div className="aspect-[3/4] overflow-hidden relative">
        <img 
          src={player.imageUrl} 
          alt={player.name}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" 
        />
      </div>

      <div className={cn(
        "absolute bottom-0 left-0 right-0 p-6 z-20 transform transition-transform duration-300",
        minimal ? "" : "translate-y-2 group-hover:translate-y-0"
      )}>
        <div className="flex items-end justify-between border-b border-white/20 pb-2 mb-2">
          <div>
            <span className="text-primary font-bold text-sm uppercase tracking-wider block mb-1">
              {player.position}
            </span>
            <h3 className="text-2xl font-display font-bold text-white uppercase leading-none">
              {player.name}
            </h3>
          </div>
          <span className="text-4xl font-display font-bold text-white/20 group-hover:text-primary transition-colors">
            {player.number}
          </span>
        </div>
        
        {!minimal && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2">
            <button className="text-xs font-bold uppercase text-white hover:text-primary transition-colors flex items-center gap-1">
              View Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
