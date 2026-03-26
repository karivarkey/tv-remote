import { useEffect, useState } from 'react';
import { api } from '../api';

type TVStatsData = {
  currentWorkspace: number;
  serverStatus: string;
  timestamp: string;
};

export function TVStats() {
  const [stats, setStats] = useState<TVStatsData | null>(null);
  const [online, setOnline] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchStats = async () => {
      try {
        const response = await api.get('/stats');
        if (response.data && response.data.success && mounted) {
          setStats(response.data.data);
          setOnline(true);
        }
      } catch (error) {
        if (mounted) setOnline(false);
      }
    };

    // Initial fetch
    fetchStats();
    
    // We keep a much slower background poll (10s) for idle freshness
    const interval = setInterval(fetchStats, 10000);

    // Fetch immediately whenever any other remote API call successfully executes
    const handleRemoteAction = () => fetchStats();
    window.addEventListener('tv-remote-action', handleRemoteAction);

    return () => {
      mounted = false;
      clearInterval(interval);
      window.removeEventListener('tv-remote-action', handleRemoteAction);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center -mt-1 w-full px-1">
      <div className="flex items-center gap-2 mb-2">
        {/* Status Indicator Light */}
        <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${online ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse'}`}></div>
        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-500">
           {online ? 'Connected' : 'Offline'}
        </span>
      </div>
      
      {/* Display Screen (LCD Effect) */}
      <div className="w-full bg-[#050505] border border-neutral-800/80 rounded-2xl p-4 shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)] flex flex-col gap-2 relative overflow-hidden group">
        
        {/* Screen glare and aesthetic lines */}
        <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-t-xl transition-opacity opacity-50"></div>
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)] pointer-events-none mix-blend-overlay"></div>

        <div className="flex justify-between items-center w-full z-10">
           <span className="text-xs text-neutral-400 font-medium tracking-widest uppercase">Workspace</span>
           <span className={`text-sm font-mono font-bold tracking-widest ${online ? 'text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]' : 'text-neutral-700'}`}>
             {stats ? stats.currentWorkspace.toString().padStart(2, '0') : '--'}
           </span>
        </div>
        
        <div className="flex justify-between items-center w-full z-10">
           <span className="text-xs text-neutral-400 font-medium tracking-widest uppercase">Server</span>
           <span className={`text-xs font-mono font-bold tracking-widest uppercase ${stats?.serverStatus === 'ok' ? 'text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]' : 'text-neutral-700'}`}>
              {stats ? stats.serverStatus : 'N/A'}
           </span>
        </div>
        
        <div className="flex justify-between items-center w-full mt-2 border-t border-neutral-800 pt-2 z-10">
           <span className="text-[9px] text-neutral-600 font-medium tracking-widest uppercase">Time</span>
           <span className={`text-[10px] font-mono tracking-widest ${online ? 'text-neutral-400' : 'text-neutral-700'}`}>
              {stats?.timestamp ? new Date(stats.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) : '--:--:--'}
           </span>
        </div>
      </div>
    </div>
  );
}
