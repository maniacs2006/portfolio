import { ReactNode, useState, UIEvent, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Newsletter from './components/newsletter';
import { ArrowUp } from 'lucide-react';

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [scrollProgress, setScrollProgress] = useState(0);
  const mainRef = useRef<HTMLElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo(0, 0);
    }
  }, [location.pathname]);

  const handleScroll = (e: UIEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const scrollAmount = target.scrollTop;
    const maxScroll = target.scrollHeight - target.clientHeight;
    
    if (scrollAmount > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }

    if (maxScroll <= 0) {
      setScrollProgress(0);
      return;
    }
    
    const progress = (scrollAmount / maxScroll) * 100;
    setScrollProgress(progress);
  };

  const scrollToTop = () => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-[260px_1fr] h-screen bg-bg text-ink font-sans overflow-hidden">
      {/* Fixed Progress Bar Container */}
      <div className="fixed top-0 left-0 md:left-[260px] right-0 h-[2px] z-50 pointer-events-none">
        <div 
          className="h-full bg-accent transition-all duration-150 ease-out origin-left" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <aside className="border-b md:border-b-0 md:border-r border-ink-faint flex flex-row md:flex-col justify-between p-4 md:p-8 h-auto md:h-screen relative z-10 shrink-0">
        <div className="top flex flex-row md:flex-col items-center md:items-start justify-between w-full md:w-auto">
          <div className="brand md:mb-16 flex items-center md:items-start gap-3 md:block">
            <h1 className="font-display text-lg md:text-2xl leading-[0.95] tracking-[-0.04em] uppercase mb-0 md:mb-2">
              Hussain<br className="hidden md:block" /><span className="md:hidden"> </span>Ahmad
            </h1>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-ink-dim hidden md:block">Writer & Director</span>
          </div>
          <nav className="flex flex-row md:flex-col gap-4 md:gap-4 items-center md:items-start">
            <Link to="/" className={`font-medium text-[0.65rem] md:text-[0.8rem] uppercase tracking-[0.05em] transition-colors ${isActive('/') ? 'text-ink' : 'text-ink-dim hover:text-ink'}`}>Selected Works</Link>
            <a href="https://linktr.ee/hussainwithacybershot" target="_blank" rel="noopener noreferrer" className="font-medium text-[0.65rem] md:text-[0.8rem] uppercase tracking-[0.05em] text-ink-dim hover:text-ink transition-colors">Linktree</a>
            <Link to="/contact" className={`font-medium text-[0.65rem] md:text-[0.8rem] uppercase tracking-[0.05em] transition-colors ${isActive('/contact') ? 'text-ink' : 'text-ink-dim hover:text-ink'}`}>Contact</Link>
          </nav>
        </div>
        <div className="bottom hidden md:block">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-ink-dim">Folio © {new Date().getFullYear()}</span>
        </div>
      </aside>

      <main 
        ref={mainRef}
        className="flex-1 overflow-y-auto overflow-x-hidden px-4 md:px-16 snap-y snap-proximity relative"
        onScroll={handleScroll}
      >
        {children}
        
        {/* Footer Content */}
        <div className="py-24 grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-16 snap-start">
          <div className="newsletter">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-ink-dim block mb-4">Mailing List</span>
            <Newsletter />
          </div>
          <div className="contacts"></div>
        </div>

        <footer className="py-10 border-t border-ink-faint flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-ink-dim snap-start">
          <div>© {new Date().getFullYear()} Hussain Ahmad</div>
          <div className="flex gap-8">
            <a href="https://letterboxd.com/hussainrates5_5/" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">Letterboxd</a>
            <a href="https://www.youtube.com/@HussainwithaCyber-shot/featured" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">YouTube</a>
            <a href="https://www.instagram.com/hussainwithacybershot" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">Instagram</a>
          </div>
        </footer>
      </main>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-3 bg-ink text-bg rounded-full shadow-lg transition-all duration-300 ease-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
}
