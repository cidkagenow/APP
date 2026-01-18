import { useMatches } from "@/hooks/use-matches";
import { MatchCard } from "@/components/MatchCard";
import { SectionHeader } from "@/components/SectionHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Schedule() {
  const { data: upcoming, isLoading: loadingUpcoming } = useMatches('upcoming');
  const { data: finished, isLoading: loadingFinished } = useMatches('finished');

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-4">
        <SectionHeader title="Match Schedule" subtitle="Follow Oxford United's journey through the season" />

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="bg-card border border-white/10 p-1 mb-8 w-full md:w-auto inline-flex h-auto">
            <TabsTrigger 
              value="upcoming"
              className="px-8 py-3 font-display font-bold uppercase data-[state=active]:bg-primary data-[state=active]:text-white rounded-sm text-muted-foreground transition-all"
            >
              Upcoming Matches
            </TabsTrigger>
            <TabsTrigger 
              value="results"
              className="px-8 py-3 font-display font-bold uppercase data-[state=active]:bg-primary data-[state=active]:text-white rounded-sm text-muted-foreground transition-all"
            >
              Results
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            {loadingUpcoming ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => <div key={i} className="h-32 bg-card animate-pulse rounded-lg" />)}
              </div>
            ) : upcoming?.length === 0 ? (
               <div className="text-center py-12 text-muted-foreground">No upcoming matches scheduled.</div>
            ) : (
              upcoming?.map(match => (
                <MatchCard key={match.id} match={match} />
              ))
            )}
          </TabsContent>
          
          <TabsContent value="results" className="space-y-4">
            {loadingFinished ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => <div key={i} className="h-32 bg-card animate-pulse rounded-lg" />)}
              </div>
            ) : finished?.length === 0 ? (
               <div className="text-center py-12 text-muted-foreground">No matches played yet this season.</div>
            ) : (
              finished?.map(match => (
                <MatchCard key={match.id} match={match} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
