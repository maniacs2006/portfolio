import { useState, FormEvent } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('New subscriber email:', email);
    setSubscribed(true);
    setEmail('');
    
    // Reset the success state after 3 seconds
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="border-t border-zinc-900 px-10 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
      <div>
        <h3 className="text-sm font-light uppercase tracking-[0.2em] text-white mb-1">Dispatch</h3>
        <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Join the mailing list for updates on new projects.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="flex w-full md:w-auto md:min-w-[400px]">
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="YOUR EMAIL" 
          required
          className="flex-1 bg-zinc-950 border border-zinc-900 px-4 py-3 text-[10px] uppercase tracking-widest text-white placeholder:text-zinc-700 focus:outline-none focus:border-zinc-700 transition-colors"
        />
        <button 
          type="submit"
          className="bg-white text-black border border-white px-8 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-transparent hover:text-white transition-colors ml-2"
        >
          {subscribed ? 'Joined' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
}
