import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Newsletter from './components/newsletter';
import ScrollToTop from './components/scroll-to-top';
import ScrollProgress from './components/scroll-progress';

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <ScrollProgress />
      <header className="flex justify-between items-center px-10 h-24 border-b border-zinc-900">
        <div>
          <h1 className="text-2xl font-light tracking-[0.2em] uppercase">Hussain Ahmad</h1>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Writer & Director</p>
        </div>
        <nav className="flex gap-8 text-[11px] uppercase tracking-widest font-medium text-zinc-400">
          <Link to="/" className="text-white hover:text-white transition-colors">Selected Works</Link>
          <a href="https://linktr.ee/hussainwithacybershot" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Linktree</a>
          <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
        </nav>
      </header>
      
      <main className="flex-1 px-10 py-10">
        {children}
      </main>
      
      <Newsletter />
      
      <footer className="px-10 h-12 border-t border-zinc-900 flex items-center justify-between text-[9px] uppercase tracking-widest text-zinc-600">
        <div>© {new Date().getFullYear()} Hussain Ahmad</div>
        <div className="flex gap-6">
          <a href="https://letterboxd.com/hussainrates5_5/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Letterboxd</a>
          <a href="https://www.youtube.com/@HussainwithaCyber-shot/featured" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a>
          <a href="https://www.instagram.com/hussainwithacybershot" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
        </div>
      </footer>
      <ScrollToTop />
    </div>
  );
}
