import { useMatches } from "@/hooks/use-matches";
import { useNews } from "@/hooks/use-news";
import { useFeaturedPlayers } from "@/hooks/use-players";
import { MatchCard } from "@/components/MatchCard";
import { NewsCard } from "@/components/NewsCard";
import { PlayerCard } from "@/components/PlayerCard";
import { SectionHeader } from "@/components/SectionHeader";
import { Link } from "wouter";
import { ArrowRight, ChevronRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: recentMatches, isLoading: loadingRecent } = useMatches('finished');
  const { data: upcomingMatches, isLoading: loadingUpcoming } = useMatches('upcoming');
  const { data: news, isLoading: loadingNews } = useNews();
  const { data: featuredPlayers, isLoading: loadingPlayers } = useFeaturedPlayers();

  // Get most recent match
  const lastMatch = recentMatches?.[0];
  
  // Get next matches (limit to 3)
  const nextMatches = upcomingMatches?.slice(0, 3);
  
  // Latest news (limit to 3)
  const latestNews = news?.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        {/* Unsplash stadium image for hero */}
        {/* soccer stadium night floodlights atmosphere */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://pixabay.com/get/ge909f7aa0bcf8b98bb4ddccbe6a8a3719147865273e17be2ae8ee8e5a5cb37093243c4fb37dcbebc9a1f11e4ec71c3e70ec373ae191500bb891beedfeb633939_1280.jpg" 
            alt="Stadium" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <span className="inline-block py-1 px-3 rounded bg-primary/20 border border-primary/50 text-primary font-bold uppercase tracking-widest text-sm mb-6 backdrop-blur-sm">
              Official Website of
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold uppercase text-white leading-[0.9] mb-6 drop-shadow-2xl">
              Oxford <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">United FC</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-xl mb-8 leading-relaxed font-light border-l-4 border-primary pl-6">
              Experience the passion, the glory, and the history of Oxford's premier football club. Join us at the stadium this season.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/history">
                <button className="bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-sm font-display font-bold uppercase tracking-wider text-lg clip-diagonal transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30">
                  Club History
                </button>
              </Link>
              <Link href="/schedule">
                <button className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white px-8 py-4 rounded-sm font-display font-bold uppercase tracking-wider text-lg transition-all hover:-translate-y-1">
                  View Schedule
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest">Scroll Down</span>
          <ChevronRight className="rotate-90 w-5 h-5" />
        </motion.div>
      </section>

      {/* Stats / Quick Info Bar */}
      <div className="bg-primary text-white py-6 border-y border-white/10 relative z-20 -mt-10 mx-4 md:mx-auto max-w-7xl rounded-lg shadow-2xl shadow-black/50">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
          {[
            { label: "League Rank", value: "3rd" },
            { label: "Matches Played", value: "24" },
            { label: "Goals Scored", value: "45" },
            { label: "Next Match", value: "2 Days" },
          ].map((stat, i) => (
            <div key={i} className="text-center px-4">
              <div className="text-3xl font-display font-bold">{stat.value}</div>
              <div className="text-xs font-bold uppercase tracking-wider opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Match Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <SectionHeader title="Recent Match" subtitle="Latest results from the Premier League" />
          
          {loadingRecent ? (
            <div className="h-64 bg-card animate-pulse rounded-lg" />
          ) : lastMatch ? (
            <MatchCard match={lastMatch} featured />
          ) : (
            <div className="text-center text-muted-foreground py-12 border border-dashed border-white/10 rounded-lg">
              No recent matches found.
            </div>
          )}
        </div>
      </section>

      {/* News Section */}
      <section className="py-24 bg-card/30 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <SectionHeader title="News Update" className="mb-0" />
            <Link href="/news" className="hidden md:flex items-center text-primary font-bold uppercase text-sm tracking-wider hover:text-white transition-colors">
              View All News <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          {loadingNews ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => <div key={i} className="h-96 bg-card animate-pulse rounded-lg" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestNews?.map(item => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          )}
          
          <div className="mt-8 md:hidden text-center">
            <Link href="/news">
              <button className="btn-outline">View All News</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Matches */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeader title="Upcoming Matches" subtitle="Don't miss the action" centered />
          
          <div className="max-w-4xl mx-auto space-y-4">
            {loadingUpcoming ? (
               [1, 2, 3].map(i => <div key={i} className="h-24 bg-card animate-pulse rounded-lg" />)
            ) : (
              nextMatches?.map(match => (
                <div key={match.id} className="bg-card border border-white/5 p-6 rounded-lg flex items-center justify-between hover:border-primary/50 transition-colors group">
                  <div className="flex items-center gap-6">
                    <div className="text-center w-24 border-r border-white/10 pr-6 hidden md:block">
                      <div className="text-primary font-bold text-xl font-display">{new Date(match.date).getDate()}</div>
                      <div className="text-muted-foreground text-xs uppercase font-bold">{new Date(match.date).toLocaleString('default', { month: 'short' })}</div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                       <span className="font-display font-bold uppercase text-lg group-hover:text-primary transition-colors">
                        {match.isHome ? 'Oxford United' : match.opponentName}
                       </span>
                       <span className="text-muted-foreground text-sm font-bold">VS</span>
                       <span className="font-display font-bold uppercase text-lg group-hover:text-primary transition-colors">
                        {match.isHome ? match.opponentName : 'Oxford United'}
                       </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      <div className="text-white font-bold text-sm">{match.stadium}</div>
                      <div className="text-primary text-xs uppercase font-bold">{new Date(match.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                    </div>
                    <Link href="/tickets">
                      <button className="bg-white/5 hover:bg-primary hover:text-white text-white p-2 rounded-full transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Players */}
      <section className="py-24 bg-gradient-to-b from-transparent to-black/50">
        <div className="container mx-auto px-4">
          <SectionHeader title="Featured Players" subtitle="Stars of the season" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {loadingPlayers ? (
               [1, 2, 3, 4].map(i => <div key={i} className="aspect-[3/4] bg-card animate-pulse rounded-lg" />)
            ) : (
              featuredPlayers?.map(player => (
                <PlayerCard key={player.id} player={player} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary z-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase text-white mb-6">
            Join the Club
          </h2>
          <p className="text-white/80 text-xl max-w-2xl mx-auto mb-10">
            Become an official member today and get exclusive access to tickets, merchandise discounts, and more.
          </p>
          <div className="flex justify-center gap-4">
             <button className="bg-white text-primary px-8 py-4 rounded-sm font-display font-bold uppercase tracking-wider text-lg shadow-xl hover:scale-105 transition-transform">
               Become a Member
             </button>
          </div>
        </div>
      </section>
    </div>
  );
}
