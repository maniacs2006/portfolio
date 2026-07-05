import { useState, useRef, useEffect } from 'react';
import { extractdriveid } from '../utils/helpers';
import { project } from '../data/projects';
import { X } from 'lucide-react';

export default function Projectcard({ data }: { data: project }) {
  const [expandedView, setExpandedView] = useState<{ type: string; url: string; title: string } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.15,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const scriptid = extractdriveid(data.scriptpdfurl);
  const storyboardid = extractdriveid(data.storyboardpdfurl);

  const calcProgress = () => {
    const len = data.description.length;
    return Math.min(100, Math.max(15, Math.floor((len / 120) * 100)));
  };
  const progressPercent = calcProgress();
  const radius = 6;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <section 
      ref={sectionRef}
      id={data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')} 
      className={`min-h-[100vh] snap-start flex flex-col justify-center py-16 border-b border-ink-faint transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 lg:mb-12 gap-8">
        <div className="flex-1 min-w-0 pr-0 lg:pr-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[0.9rem] text-accent block">Release / {data.year}</span>
            <div className="relative flex items-center justify-center" title="Project Scope Indicator">
              <svg width="20" height="20" className="transform -rotate-90">
                <circle 
                  cx="10" cy="10" r={radius} 
                  fill="transparent" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  className="text-ink-faint"
                />
                <circle 
                  cx="10" cy="10" r={radius} 
                  fill="transparent" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  className="text-accent transition-all duration-1000 ease-out"
                  strokeDasharray={circumference}
                  strokeDashoffset={isVisible ? strokeDashoffset : circumference}
                />
              </svg>
              <span className="absolute text-[0.45rem] font-mono text-ink-dim opacity-70">
                {progressPercent}
              </span>
            </div>
          </div>
          <h2 className="font-display text-[clamp(1.5rem,3.5vw,3.5rem)] leading-[0.9] tracking-[-0.04em] mb-4 group cursor-pointer break-all md:break-words" style={{ position: 'relative', display: 'inline-block' }}>
            <span className="relative z-10 transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-ink">
              {data.title.split('|').map((part, index) => (
                index === 0 ? <span key={index} className="uppercase">{part}</span> : <span key={index} className="lowercase">|{part}</span>
              ))}
            </span>
          </h2>
          <p className="max-w-[500px] text-[1.1rem] text-ink-dim leading-relaxed">
            {data.description}
          </p>
        </div>
        <div className="pb-1 shrink-0">
          <a 
            href={data.substackurl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-ink border border-ink py-3 px-6 text-[0.7rem] uppercase tracking-[0.1em] hover:bg-ink hover:text-bg transition-colors whitespace-nowrap inline-block"
          >
            Project Substack
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[450px]">
        <div className="bg-[#151518] border border-ink-faint flex flex-col relative transition-all duration-500 ease-out hover:scale-[1.02] hover:border-ink/30 hover:shadow-[0_0_25px_rgba(255,255,255,0.04)] z-10 hover:z-20 h-[300px] lg:h-auto">
          <div className="p-3 flex justify-between items-center border-b border-ink-faint">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-ink-dim">[01] Script.pdf</span>
          </div>
          <div className="flex-1 relative overflow-hidden group cursor-pointer" onClick={() => setExpandedView({ type: 'script', url: `https://drive.google.com/file/d/${scriptid}/preview`, title: `${data.title} Script` })}>
            {scriptid ? (
              <>
                <div className="absolute inset-0 z-20" /> {/* Click overlay */}
                <iframe
                  src={`https://drive.google.com/file/d/${scriptid}/preview`}
                  className="w-full h-full border-0 absolute inset-0 z-10"
                  allow="autoplay"
                  title={`${data.title} script`}
                  loading="lazy"
                />
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-[10px] uppercase tracking-widest text-zinc-600">invalid script url</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-[#151518] border border-ink-faint flex flex-col relative transition-all duration-500 ease-out hover:scale-[1.02] hover:border-ink/30 hover:shadow-[0_0_25px_rgba(255,255,255,0.04)] z-10 hover:z-20 h-[300px] lg:h-auto">
          <div className="p-3 flex justify-between items-center border-b border-ink-faint">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-ink-dim">[02] Storyboard.pdf</span>
          </div>
          <div className="flex-1 relative overflow-hidden group cursor-pointer" onClick={() => setExpandedView({ type: 'storyboard', url: `https://drive.google.com/file/d/${storyboardid}/preview`, title: `${data.title} Storyboard` })}>
            {storyboardid ? (
              <>
                <div className="absolute inset-0 z-20" /> {/* Click overlay */}
                <iframe
                  src={`https://drive.google.com/file/d/${storyboardid}/preview`}
                  className="w-full h-full border-0 absolute inset-0 z-10"
                  allow="autoplay"
                  title={`${data.title} storyboard`}
                  loading="lazy"
                />
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                 <span className="text-[10px] uppercase tracking-widest text-zinc-600">invalid storyboard url</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-[#151518] border border-ink-faint flex flex-col relative transition-all duration-500 ease-out hover:scale-[1.02] hover:border-ink/30 hover:shadow-[0_0_25px_rgba(255,255,255,0.04)] z-10 hover:z-20 h-[300px] lg:h-auto">
          <div className="p-3 flex justify-between items-center border-b border-ink-faint">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-ink-dim">[03] Motion_Sequence</span>
          </div>
          <div 
            className="flex-1 relative overflow-hidden cursor-pointer group"
            onClick={() => setExpandedView({ type: 'video', url: `https://www.youtube.com/embed/${data.youtubevideoid}?autoplay=1`, title: `${data.title} Final Cut` })}
          >
            <img 
              src={`https://img.youtube.com/vi/${data.youtubevideoid}/maxresdefault.jpg`} 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src.includes('maxresdefault.jpg')) {
                  target.src = `https://img.youtube.com/vi/${data.youtubevideoid}/hqdefault.jpg`;
                }
              }}
              className="w-full h-full object-cover opacity-60 transition-opacity duration-300 group-hover:opacity-40" 
              alt="thumbnail" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[60px] h-[60px] border border-ink-dim rounded-full flex items-center justify-center bg-black/30 backdrop-blur-[4px] transition-transform duration-300 group-hover:scale-110">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--color-ink)"><path d="M5 3l14 9-14 9V3z"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {expandedView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c0c0e]/90 backdrop-blur-sm p-4 md:p-10">
          <div className="bg-[#151518] border border-ink-faint w-full max-w-6xl h-full flex flex-col shadow-2xl overflow-hidden relative">
            <div className="flex justify-between items-center p-4 border-b border-ink-faint">
              <h3 className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-ink">{expandedView.title}</h3>
              <button 
                onClick={() => setExpandedView(null)}
                className="text-ink-dim hover:text-ink p-2 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 bg-black relative">
              <iframe
                src={expandedView.url}
                className="w-full h-full border-0 absolute inset-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={expandedView.title}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
