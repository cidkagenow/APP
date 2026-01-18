import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

// Mock Data
const MOCK_MATCHES = [
  {
    id: 1,
    opponentName: "Chelsea",
    opponentLogoUrl: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
    isHome: false,
    date: "2026-01-12T15:00:00Z",
    stadium: "Build-Abri Stadium",
    homeScore: 1,
    awayScore: 5,
    attendance: "12 500",
    isFinished: true,
  },
  {
    id: 2,
    opponentName: "Arsenal",
    opponentLogoUrl: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
    isHome: true,
    date: "2026-01-15T19:45:00Z",
    stadium: "Kassam Stadium",
    homeScore: 2,
    awayScore: 1,
    attendance: "11 200",
    isFinished: true,
  }
];

const MOCK_UPCOMING = [
  {
    id: 3,
    opponentName: "Chelsea",
    opponentLogoUrl: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
    isHome: false,
    date: "2026-12-12T17:30:00Z",
    stadium: "Build-Abri Stadium",
    isFinished: false,
  }
];

const MOCK_NEWS = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "New signing announced for the upcoming season",
    summary: "The club is delighted to announce the arrival of a new star player to bolster the squad.",
    imageUrl: "https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Stadium expansion plans revealed",
    summary: "Detailed plans for the expansion of the Kassam Stadium have been unveiled to the public.",
    imageUrl: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=600&h=400&fit=crop",
  }
];

export default function Home() {
  const loadingMatches = false;
  const loadingNews = false;
  const recentMatches = MOCK_MATCHES;
  const upcomingMatches = MOCK_UPCOMING;
  const news = MOCK_NEWS;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[500px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&h=800&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-black/60" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-white">
          <h1 className="text-6xl font-black uppercase tracking-tighter mb-4 max-w-2xl leading-[0.9]">
            Oxford United Football Club
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mb-8 leading-relaxed">
            Experience the passion, the history, and the future of Oxford's premier football club. Join us at the Kassam Stadium.
          </p>
          <div className="flex gap-4">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 rounded-full border-none shadow-lg shadow-red-600/20 uppercase tracking-wide h-12">
              Club Features
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Matches Section */}
      <section className="bg-white py-16 dark:bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tight italic border-l-8 border-yellow-400 pl-4">
              Recent Match
            </h2>
            <p className="text-muted-foreground max-w-md text-right">
              Our latest performances on the pitch, bringing the action straight to you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {recentMatches.map(match => (
                <Card key={match.id} className="overflow-hidden border-none shadow-xl hover-elevate bg-zinc-50 dark:bg-zinc-800/50 group">
                  <CardContent className="p-8 flex items-center justify-between">
                    <div className="text-center flex-1">
                      <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center bg-white rounded-full p-2 shadow-sm group-hover:scale-105 transition-transform">
                        <img src="https://upload.wikimedia.org/wikipedia/en/e/e3/Oxford_United_FC_logo.svg" alt="OUFC" className="max-h-full" />
                      </div>
                      <span className="font-bold text-sm block uppercase tracking-wider text-muted-foreground">Oxford Utd</span>
                    </div>

                    <div className="text-center px-8">
                      <div className="text-5xl font-black tabular-nums tracking-tighter mb-2">
                        {match.homeScore} - {match.awayScore}
                      </div>
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">
                        {match.stadium}
                      </div>
                      <Badge variant="secondary" className="px-4 py-1 rounded-full font-bold">
                        {match.attendance}
                      </Badge>
                    </div>

                    <div className="text-center flex-1">
                      <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center bg-white rounded-full p-2 shadow-sm group-hover:scale-105 transition-transform">
                        <img src={match.opponentLogoUrl} alt={match.opponentName} className="max-h-full" />
                      </div>
                      <span className="font-bold text-sm block uppercase tracking-wider text-muted-foreground truncate max-w-[100px]">{match.opponentName}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="bg-zinc-950 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-8 mb-16">
            <h2 className="text-5xl font-black uppercase tracking-tighter leading-none shrink-0 border-r-2 border-zinc-800 pr-8">
              News<br/>Update
            </h2>
            <div className="h-px bg-zinc-800 flex-1" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {news?.map(item => (
                <div key={item.id} className="group cursor-pointer">
                  <div className="relative aspect-[16/10] overflow-hidden mb-4 rounded-lg">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold leading-tight mb-2 group-hover:text-yellow-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
                    {item.summary}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Upcoming Matches Section */}
      <section className="bg-zinc-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-12 flex items-center gap-4">
            <span className="w-12 h-1 bg-yellow-400 block" />
            Upcoming Match
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {upcomingMatches.map(match => (
                <Card key={match.id} className="bg-zinc-800/50 border-zinc-700/50 text-white hover:bg-zinc-800 transition-colors">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-yellow-400 font-black text-xl mb-1">
                        {format(new Date(match.date), "dd MMM")}
                      </span>
                      <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                        {format(new Date(match.date), "HH:mm")}
                      </span>
                    </div>

                    <div className="flex items-center gap-6 flex-1 justify-center px-4 border-x border-zinc-700/50 mx-6">
                      <div className="flex items-center gap-3">
                        <img src="https://upload.wikimedia.org/wikipedia/en/e/e3/Oxford_United_FC_logo.svg" className="w-8 h-8" alt="OUFC" />
                        <span className="font-bold uppercase tracking-tight">Oxford United</span>
                      </div>
                      <span className="text-zinc-600 font-black italic">VS</span>
                      <div className="flex items-center gap-3">
                        <span className="font-bold uppercase tracking-tight">{match.opponentName}</span>
                        <img src={match.opponentLogoUrl} className="w-8 h-8" alt={match.opponentName} />
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-bold text-zinc-500 uppercase tracking-tighter truncate max-w-[120px]">
                        {match.stadium}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
