import { useNews } from "@/hooks/use-news";
import { NewsCard } from "@/components/NewsCard";
import { SectionHeader } from "@/components/SectionHeader";

export default function News() {
  const { data: news, isLoading } = useNews();

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-4">
        <SectionHeader title="Club News" subtitle="Latest updates, interviews, and match reports" />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-96 bg-card animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news?.map(item => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
