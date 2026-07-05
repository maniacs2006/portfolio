import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Hussain Ahmad | 404</title>
      </Helmet>
      <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center text-center snap-start">
        <h2 className="font-display text-[clamp(4rem,10vw,10rem)] leading-[0.85] tracking-[-0.06em] uppercase mb-4 text-ink-dim">
          404
        </h2>
        <p className="font-mono text-[0.8rem] uppercase tracking-[0.15em] text-ink mb-8">
          This page does not exist
        </p>
        <Link 
          to="/" 
          className="px-6 py-3 border border-ink-faint hover:border-accent text-[0.7rem] uppercase tracking-[0.2em] font-mono transition-colors"
        >
          Return Home
        </Link>
      </div>
    </>
  );
}
