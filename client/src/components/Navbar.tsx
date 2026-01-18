import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/team", label: "Team" },
    { href: "/schedule", label: "Schedule" },
    { href: "/news", label: "News" },
    { href: "/shop", label: "Shop" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-background/95 backdrop-blur-md border-white/10 py-3" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-display font-bold text-xl text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform">
            OX
          </div>
          <span className="font-display font-bold text-xl tracking-wider text-white uppercase hidden md:block">
            Oxford <span className="text-primary">United</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={cn(
              "font-display font-bold uppercase tracking-wider text-sm transition-colors relative hover:text-primary",
              location === link.href ? "text-primary" : "text-white/80"
            )}>
              {link.label}
              {location === link.href && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/shop" className="relative group">
            <ShoppingBag className="w-6 h-6 text-white group-hover:text-primary transition-colors" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full text-[10px] flex items-center justify-center font-bold text-white">0</span>
          </Link>
          
          <button 
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
          
          <Link href="/tickets" className="hidden md:block">
            <button className="bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white font-display font-bold uppercase text-sm px-6 py-2 rounded-sm clip-diagonal transition-all hover:translate-y-[-2px] hover:shadow-lg hover:shadow-primary/25">
              Get Tickets
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={cn(
                    "font-display font-bold uppercase text-lg p-2 hover:bg-white/5 rounded",
                    location === link.href ? "text-primary" : "text-white"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <button className="bg-primary text-white font-display font-bold uppercase w-full py-3 rounded-sm mt-2">
                Get Tickets
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
