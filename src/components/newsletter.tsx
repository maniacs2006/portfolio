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
    <div>
      <h3 className="font-display uppercase text-3xl mb-4">Dispatch</h3>
      <p className="text-[0.9rem] text-ink-dim leading-relaxed">Join the mailing list for updates on new projects.</p>
      
      <form onSubmit={handleSubmit} className="flex mt-8 border-b-2 border-ink py-2">
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="YOUR EMAIL ADDRESS" 
          required
          className="flex-1 bg-transparent border-0 text-ink font-mono text-base focus:outline-none placeholder:text-ink-dim"
        />
        <button 
          type="submit"
          className="bg-transparent text-ink border-0 font-mono uppercase text-[0.8rem] tracking-[0.2em] cursor-pointer hover:text-accent transition-colors"
        >
          {subscribed ? 'Subscribed' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
}
