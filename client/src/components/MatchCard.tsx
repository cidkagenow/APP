import { format } from "date-fns";
import { type Match } from "@shared/schema";
import { cn } from "@/lib/utils";
import { Calendar, MapPin } from "lucide-react";

interface MatchCardProps {
  match: Match;
  featured?: boolean;
}

export function MatchCard({ match, featured = false }: MatchCardProps) {
  const isFinished = match.isFinished;
  
  // Placeholder logos since we don't have real ones
  const homeLogo = match.isHome 
    ? "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=100&h=100&fit=crop" 
    : match.opponentLogoUrl || "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=100&h=100&fit=crop";
    
  const awayLogo = match.isHome 
    ? match.opponentLogoUrl || "https://images.unsplash.com/photo-1563299796-b729d0af54a5?w=100&h=100&fit=crop"
    : "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=100&h=100&fit=crop";

  const homeName = match.isHome ? "Oxford United" : match.opponentName;
  const awayName = match.isHome ? match.opponentName : "Oxford United";

  return (
    <div className={cn(
      "bg-card border border-white/5 rounded-lg overflow-hidden relative group hover:border-primary/50 transition-all duration-300",
      featured ? "p-8" : "p-6"
    )}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:bg-primary/10 transition-colors" />

      {/* Header Info */}
      <div className="flex justify-between items-center mb-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="font-medium">{format(new Date(match.date), "EEE, d MMM yyyy • HH:mm")}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          <span>{match.stadium}</span>
        </div>
      </div>

      {/* Teams & Score */}
      <div className="flex items-center justify-between">
        {/* Home Team */}
        <div className="flex flex-col items-center gap-3 w-1/3">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 p-2 flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors">
            {/* Using div as logo placeholder if no image */}
            <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center overflow-hidden">
             <span className="text-xs font-bold">{homeName.substring(0,2).toUpperCase()}</span>
            </div>
          </div>
          <span className="font-display font-bold uppercase text-center text-sm md:text-base leading-tight">
            {homeName}
          </span>
        </div>

        {/* Score / VS */}
        <div className="flex flex-col items-center justify-center w-1/3">
          {isFinished ? (
            <div className="text-3xl md:text-5xl font-display font-bold text-white tracking-widest bg-white/5 px-4 py-2 rounded-lg border border-white/10">
              {match.homeScore} - {match.awayScore}
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold font-display text-xl">
              VS
            </div>
          )}
          <span className="mt-2 text-xs font-bold uppercase tracking-widest text-primary/80">
            {isFinished ? "Full Time" : "Premier League"}
          </span>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center gap-3 w-1/3">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 p-2 flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors">
             <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center overflow-hidden">
               <span className="text-xs font-bold">{awayName.substring(0,2).toUpperCase()}</span>
             </div>
          </div>
          <span className="font-display font-bold uppercase text-center text-sm md:text-base leading-tight">
            {awayName}
          </span>
        </div>
      </div>
    </div>
  );
}
