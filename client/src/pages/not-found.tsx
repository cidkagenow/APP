import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-9xl font-display font-bold text-primary opacity-20">404</h1>
      <div className="absolute flex flex-col items-center">
        <h2 className="text-3xl font-display font-bold uppercase mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link href="/">
          <button className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-sm font-display font-bold uppercase tracking-wider transition-colors">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
