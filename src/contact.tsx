import { useState, FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
    
    if (!endpoint) {
      console.error('Formspree endpoint not configured. Please set VITE_FORMSPREE_ENDPOINT in your environment variables.');
      setStatus('error');
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <>
      <Helmet>
        <title>Hussain Ahmad | Contact</title>
        <meta name="description" content="Get in touch with Hussain Ahmad for inquiries, script consultations, or general questions." />
      </Helmet>
      <div className="max-w-2xl py-16 min-h-[calc(100vh-80px)] snap-start">
        <div className="mb-12">
          <h2 className="font-display text-[clamp(3rem,6vw,6rem)] leading-[0.85] tracking-[-0.06em] uppercase mb-4">Contact</h2>
          <p className="max-w-[500px] text-[1.1rem] text-ink-dim leading-relaxed">
            For directing inquiries, script consultations, or general questions, please leave a message below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-ink-dim">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              className="bg-[#151518] border border-ink-faint p-4 text-sm text-ink focus:outline-none focus:border-ink transition-colors font-mono"
              placeholder="YOUR NAME"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-ink-dim">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              className="bg-[#151518] border border-ink-faint p-4 text-sm text-ink focus:outline-none focus:border-ink transition-colors font-mono"
              placeholder="YOUR@EMAIL.COM"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-ink-dim">Message</label>
            <textarea 
              id="message" 
              name="message" 
              required 
              rows={6}
              className="bg-[#151518] border border-ink-faint p-4 text-sm text-ink focus:outline-none focus:border-ink transition-colors resize-none font-mono"
              placeholder="YOUR MESSAGE..."
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={status === 'submitting'}
            className="self-start font-mono text-ink border border-ink py-3 px-6 text-[0.7rem] uppercase tracking-[0.1em] hover:bg-ink hover:text-bg transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}
          </button>

          {status === 'success' && (
            <div className="p-4 bg-[#151518] border border-ink-faint text-sm text-ink font-mono mt-4">
              THANK YOU. YOUR MESSAGE HAS BEEN SENT SUCCESSFULLY.
            </div>
          )}
          
          {status === 'error' && (
            <div className="p-4 bg-red-950/20 border border-accent/50 text-sm text-accent font-mono mt-4">
              THERE WAS AN ERROR SENDING YOUR MESSAGE. PLEASE TRY AGAIN LATER.
            </div>
          )}
        </form>
      </div>
    </>
  );
}
