import { useEffect, useState } from 'react';
import { useWebHaptics } from 'web-haptics/react';
import { api } from '../api';
import { icons } from './icons';

type VolumeData = {
  volume: number;
  muted: boolean;
};

export function VolumeControl() {
  const [volumeState, setVolumeState] = useState<VolumeData>({ volume: 50, muted: false });
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const { trigger } = useWebHaptics();

  const fetchVolume = async () => {
    try {
      const res = await api.get('/volume');
      if (res.data?.success && res.data.data) {
        setVolumeState(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch volume', err);
    }
  };

  useEffect(() => {
    // Initial load
    fetchVolume();
    
    // Automatically syncing volume if other POST actions modify it
    const handleRemoteAction = () => fetchVolume();
    window.addEventListener('tv-remote-action', handleRemoteAction);
    return () => window.removeEventListener('tv-remote-action', handleRemoteAction);
  }, []);

  const changeVolume = async (action: 'up' | 'down' | 'mute') => {
    setActiveKey(`vol-${action}`);
    trigger('success');
    
    setTimeout(() => setActiveKey(null), 150);

    try {
      const res = await api.post('/volume', { action });
      if (res.data?.success && res.data.data) {
        // Post request actually returns the new state right away in our backend 
        setVolumeState(res.data.data);
      }
    } catch (err) {
      console.error(`Failed to change volume ${action}`, err);
    }
  };

  return (
    <div className="flex items-center justify-between w-[250px] bg-neutral-800 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5),0_10px_20px_rgba(0,0,0,0.5)] border border-neutral-700/50 rounded-[2rem] h-14 p-1 relative overflow-hidden ring-1 ring-black/50">
      
      {/* Dynamic Background glow if muted */}
      <div className={`absolute inset-0 bg-red-500/10 transition-opacity duration-300 pointer-events-none ${volumeState.muted ? 'opacity-100' : 'opacity-0'}`}></div>

      {/* Down Button */}
      <button 
        onClick={() => changeVolume('down')}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-150 z-10 ${activeKey === 'vol-down' ? 'bg-white/10 text-white scale-90 shadow-inner' : 'text-neutral-400 hover:text-white hover:bg-neutral-700'}`}
      >
        {icons.Minus}
      </button>

      {/* Mute toggle / Volume amount indicator */}
      <button 
        onClick={() => changeVolume('mute')}
        className={`flex-1 mx-1.5 h-10 rounded-full flex items-center justify-center border transition-all duration-200 z-10 shadow-inner ${activeKey === 'vol-mute' ? 'scale-95 bg-neutral-950 border-neutral-800' : 'bg-neutral-900 border-neutral-800 hover:bg-neutral-800'}`}
      >
        <div className="flex items-center justify-center gap-2.5 w-full">
          <span className={`transition-colors duration-300 ${volumeState.muted ? 'text-red-500' : 'text-neutral-400'}`}>
            {volumeState.muted ? icons.Muted : icons.Unmuted}
          </span>
          <span className={`font-mono font-bold tracking-widest text-sm transition-all duration-300 w-10 text-left ${volumeState.muted ? 'text-neutral-600 line-through' : 'text-neutral-200 drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]'}`}>
            {volumeState.volume}%
          </span>
        </div>
      </button>

      {/* Up Button */}
      <button 
        onClick={() => changeVolume('up')}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-150 z-10 ${activeKey === 'vol-up' ? 'bg-white/10 text-white scale-90 shadow-inner' : 'text-neutral-400 hover:text-white hover:bg-neutral-700'}`}
      >
        {icons.Plus}
      </button>
    </div>
  );
}
