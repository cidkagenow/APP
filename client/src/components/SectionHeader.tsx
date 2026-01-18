import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

export function SectionHeader({ title, subtitle, className, centered = false }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      <div className={cn(
        "w-12 h-1 bg-primary mb-4",
        centered && "mx-auto"
      )} />
      <h2 className="text-3xl md:text-5xl font-display font-bold uppercase text-white tracking-tight mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
