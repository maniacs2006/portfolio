import { useState } from 'react';
import { extractdriveid } from '../utils/helpers';
import { project } from '../data/projects';
import { Maximize2, X } from 'lucide-react';
import { motion } from 'motion/react';

export default function projectcard({ data }: { data: project }) {
  const [expandedView, setExpandedView] = useState<{ type: string; url: string; title: string } | null>(null);
  const [isVideoHovered, setIsVideoHovered] = useState(false);

  const scriptid = extractdriveid(data.scriptpdfurl);
  const storyboardid = extractdriveid(data.storyboardpdfurl);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col overflow-hidden"
    >
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-4xl font-light uppercase tracking-tight">{data.title}</h2>
            <span className="text-sm text-zinc-500 font-mono pt-2">/ {data.year}</span>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">
            {data.description}
          </p>
        </div>
        <a 
          href={data.substackurl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 border border-zinc-800 text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors"
        >
          Project Substack
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">
        <div className="flex flex-col gap-3 h-[400px]">
          <div className="flex justify-between items-center">
            <h4 className="text-[9px] uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full"></span> Script.pdf
            </h4>
            {scriptid && (
              <button 
                onClick={() => setExpandedView({ type: 'script', url: `https://drive.google.com/file/d/${scriptid}/preview`, title: `${data.title} Script` })}
                className="text-zinc-500 hover:text-white transition-colors"
                title="Expand Script"
              >
                <Maximize2 size={14} />
              </button>
            )}
          </div>
          <div className="flex-1 bg-zinc-950 border border-zinc-900 rounded overflow-hidden flex items-center justify-center relative">
            {scriptid ? (
              <iframe
                src={`https://drive.google.com/file/d/${scriptid}/preview`}
                className="w-full h-full border-0 absolute inset-0 z-20"
                allow="autoplay"
                title={`${data.title} script`}
                loading="lazy"
              />
            ) : (
              <div className="z-10 text-center p-8">
                <span className="text-[10px] uppercase tracking-widest text-zinc-600">invalid script url</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 h-[400px]">
          <div className="flex justify-between items-center">
            <h4 className="text-[9px] uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full"></span> Storyboard.pdf
            </h4>
            {storyboardid && (
              <button 
                onClick={() => setExpandedView({ type: 'storyboard', url: `https://drive.google.com/file/d/${storyboardid}/preview`, title: `${data.title} Storyboard` })}
                className="text-zinc-500 hover:text-white transition-colors"
                title="Expand Storyboard"
              >
                <Maximize2 size={14} />
              </button>
            )}
          </div>
          <div className="flex-1 bg-zinc-950 border border-zinc-900 rounded overflow-hidden flex items-center justify-center relative">
            {storyboardid ? (
              <iframe
                src={`https://drive.google.com/file/d/${storyboardid}/preview`}
                className="w-full h-full border-0 absolute inset-0 z-20"
                allow="autoplay"
                title={`${data.title} storyboard`}
                loading="lazy"
              />
            ) : (
              <div className="z-10 text-center p-8">
                 <span className="text-[10px] uppercase tracking-widest text-zinc-600">invalid storyboard url</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 h-[400px]">
          <div className="flex justify-between items-center">
            <h4 className="text-[9px] uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span> Motion_Sequence
            </h4>
            <button 
              onClick={() => setExpandedView({ type: 'video', url: `https://www.youtube.com/embed/${data.youtubevideoid}?autoplay=1`, title: `${data.title} Final Cut` })}
              className="text-zinc-500 hover:text-white transition-colors"
              title="Expand Video"
            >
              <Maximize2 size={14} />
            </button>
          </div>
          <div 
            className="flex-1 bg-zinc-950 border border-zinc-900 rounded overflow-hidden relative group cursor-pointer"
            onMouseEnter={() => setIsVideoHovered(true)}
            onMouseLeave={() => setIsVideoHovered(false)}
            onClick={() => setExpandedView({ type: 'video', url: `https://www.youtube.com/embed/${data.youtubevideoid}?autoplay=1`, title: `${data.title} Final Cut` })}
          >
            {isVideoHovered ? (
              <iframe
                src={`https://www.youtube.com/embed/${data.youtubevideoid}?autoplay=1&mute=1&controls=0&loop=1&playlist=${data.youtubevideoid}`}
                className="w-full h-full border-0 absolute inset-0 z-20 pointer-events-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title={`${data.title} preview`}
              />
            ) : (
              <div className="w-full h-full absolute inset-0 z-20 bg-zinc-900">
                <img 
                  src={`https://img.youtube.com/vi/${data.youtubevideoid}/maxresdefault.jpg`} 
                  alt={`${data.title} thumbnail`} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700" 
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm bg-white/5 transition-transform duration-500 group-hover:scale-110">
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {expandedView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10">
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg w-full max-w-6xl h-full flex flex-col shadow-2xl overflow-hidden relative">
            <div className="flex justify-between items-center p-4 border-b border-zinc-900">
              <h3 className="text-sm uppercase tracking-widest font-light text-white">{expandedView.title}</h3>
              <button 
                onClick={() => setExpandedView(null)}
                className="text-zinc-400 hover:text-white p-2 transition-colors"
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
    </motion.section>
  );
}
