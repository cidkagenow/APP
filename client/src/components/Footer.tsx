import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center font-display font-bold text-2xl text-white">
                OX
              </div>
              <span className="font-display font-bold text-2xl tracking-wider text-white uppercase">
                Oxford <span className="text-primary">United</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Proudly representing our city since 1893. Join the legacy and be part of the passion.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white text-muted-foreground transition-colors">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-display font-bold uppercase mb-6 text-lg">Club</h4>
            <ul className="space-y-3">
              {['History', 'Stadium', 'Staff', 'Careers', 'Contact'].map(item => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-display font-bold uppercase mb-6 text-lg">Fanzone</h4>
            <ul className="space-y-3">
              {['Tickets', 'Membership', 'Supporters', 'Hospitality', 'Store'].map(item => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-display font-bold uppercase mb-6 text-lg">Newsletter</h4>
            <p className="text-muted-foreground text-sm mb-4">Subscribe to get the latest news and updates.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/5 border border-white/10 px-4 py-2 rounded-l-sm focus:outline-none focus:border-primary text-white w-full"
              />
              <button className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-r-sm font-display font-bold uppercase transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2024 Oxford United Football Club. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
