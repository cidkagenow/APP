import { useNewsItem } from "@/hooks/use-news";
import { useRoute } from "wouter";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NewsDetail() {
  const [, params] = useRoute("/news/:id");
  const id = params ? parseInt(params.id) : 0;
  const { data: item, isLoading } = useNewsItem(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-32 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-background pt-32 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-display font-bold text-white mb-4">Article Not Found</h1>
        <Link href="/news" className="text-primary hover:underline">Return to News</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <article className="container mx-auto px-4 max-w-4xl">
        <Link href="/news" className="inline-flex items-center text-muted-foreground hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to News
        </Link>
        
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
              News Update
            </span>
            <time className="text-muted-foreground text-sm font-medium">
              {format(new Date(item.createdAt || new Date()), "MMMM d, yyyy")}
            </time>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase text-white leading-none mb-8">
            {item.title}
          </h1>
          
          <div className="aspect-video w-full rounded-xl overflow-hidden mb-8 border border-white/10 shadow-2xl">
            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
          </div>
        </header>
        
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:uppercase prose-a:text-primary">
          <p className="text-xl text-white/80 font-light leading-relaxed mb-8 border-l-4 border-primary pl-6">
            {item.summary}
          </p>
          <div dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>
      </article>
    </div>
  );
}
