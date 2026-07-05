import { useState, FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // Use Formspree or similar service endpoint here.
      // E.g. https://formspree.io/f/YOUR_FORM_ID
      const response = await fetch('https://formspree.io/f/placeholder_id', {
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
      <div className="max-w-2xl">
        <div className="mb-12">
          <h2 className="text-4xl font-light uppercase tracking-tight mb-4">Contact</h2>
        <p className="text-sm text-zinc-400 leading-relaxed">
          For directing inquiries, script consultations, or general questions, please leave a message below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-zinc-500">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            className="bg-zinc-950 border border-zinc-900 rounded p-4 text-sm text-white focus:outline-none focus:border-zinc-700 transition-colors"
            placeholder="Your name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-zinc-500">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            className="bg-zinc-950 border border-zinc-900 rounded p-4 text-sm text-white focus:outline-none focus:border-zinc-700 transition-colors"
            placeholder="your@email.com"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-[10px] uppercase tracking-widest text-zinc-500">Message</label>
          <textarea 
            id="message" 
            name="message" 
            required 
            rows={6}
            className="bg-zinc-950 border border-zinc-900 rounded p-4 text-sm text-white focus:outline-none focus:border-zinc-700 transition-colors resize-none"
            placeholder="Your message..."
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className="inline-flex items-center justify-center px-6 py-4 border border-zinc-800 text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'success' && (
          <div className="p-4 bg-zinc-900/50 border border-zinc-800 text-sm text-zinc-300">
            Thank you. Your message has been sent successfully.
          </div>
        )}
        
        {status === 'error' && (
          <div className="p-4 bg-red-950/20 border border-red-900/50 text-sm text-red-400">
            There was an error sending your message. Please try again later.
          </div>
        )}
      </form>
    </div>
    </>
  );
}
