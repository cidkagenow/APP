import { format } from "date-fns";
import { Link } from "wouter";
import { type NewsItem } from "@shared/schema";
import { ArrowRight } from "lucide-react";

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link href={`/news/${item.id}`} className="group block h-full">
      <div className="bg-card border border-white/5 rounded-lg overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
        <div className="relative aspect-video overflow-hidden">
          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
          <img 
            src={item.imageUrl} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-primary text-white text-xs font-bold uppercase px-3 py-1 rounded-sm shadow-lg">
              News
            </span>
          </div>
        </div>
        
        <div className="p-6 flex flex-col flex-grow relative">
          <div className="text-xs text-muted-foreground font-medium mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            {format(new Date(item.createdAt || new Date()), "MMMM d, yyyy")}
          </div>
          
          <h3 className="text-xl font-display font-bold uppercase text-white mb-3 leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {item.title}
          </h3>
          
          <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow">
            {item.summary}
          </p>
          
          <div className="flex items-center text-primary font-bold uppercase text-xs tracking-wider mt-auto group-hover:translate-x-2 transition-transform">
            Read Article <ArrowRight className="w-4 h-4 ml-2" />
          </div>
        </div>
      </div>
    </Link>
  );
}
