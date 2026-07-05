import { Helmet } from 'react-helmet-async';
import { projects } from './data/projects';
import Projectcard from './components/projectcard';
import { useState, useEffect } from 'react';

export default function Page() {
  const sortedprojects = [...projects].sort((a, b) => b.year - a.year);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>Hussain Ahmad | Selected Works</title>
        <meta name="description" content="Portfolio of Hussain Ahmad featuring selected filmmaking and multimedia projects." />
      </Helmet>
      
      <header className="py-12 border-b border-ink-faint mb-12 animate-in fade-in duration-1000">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl tracking-widest uppercase text-ink">Hussain Ahmad</h1>
            <p className="font-mono text-xs text-ink-dim uppercase tracking-[0.2em] mt-2">Director / Filmmaker</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[0.65rem] text-accent uppercase tracking-widest">Selected Works &mdash; {new Date().getFullYear()}</p>
          </div>
        </div>
      </header>

      <div className="flex flex-col">
        {isLoading ? (
          <div className="min-h-[70vh] flex flex-col justify-center py-16 animate-pulse border-b border-ink-faint">
             <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
               <div className="flex-1">
                 <div className="h-4 w-24 bg-ink-faint mb-6"></div>
                 <div className="h-16 w-3/4 max-w-2xl bg-[#151518] mb-6"></div>
                 <div className="h-4 w-1/2 max-w-md bg-[#151518] mb-3"></div>
                 <div className="h-4 w-2/5 max-w-md bg-[#151518]"></div>
               </div>
               <div className="h-12 w-40 bg-ink-faint"></div>
             </div>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[450px]">
               <div className="bg-[#151518] border border-ink-faint flex flex-col h-[250px] lg:h-auto">
                 <div className="h-10 border-b border-ink-faint"></div>
               </div>
               <div className="bg-[#151518] border border-ink-faint flex flex-col h-[250px] lg:h-auto">
                 <div className="h-10 border-b border-ink-faint"></div>
               </div>
               <div className="bg-[#151518] border border-ink-faint flex flex-col h-[250px] lg:h-auto">
                 <div className="h-10 border-b border-ink-faint"></div>
               </div>
             </div>
          </div>
        ) : (
          sortedprojects.map((proj, index) => (
            <Projectcard key={index} data={proj} />
          ))
        )}
      </div>
    </>
  );
}
