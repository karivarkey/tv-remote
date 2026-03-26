import React from 'react';
import { icons } from './icons';

type DPadProps = {
  activeKey: string | null;
  onSendKey: (key: string) => void;
};

export function DPad({ activeKey, onSendKey }: DPadProps) {
  return (
    <div className="relative w-[250px] h-[250px] rounded-full bg-neutral-800 shadow-[inset_0_2px_15px_rgba(0,0,0,0.6),0_10px_25px_rgba(0,0,0,0.5)] border border-neutral-700/50 overflow-hidden ring-1 ring-black/80 flex items-center justify-center">
      
      {/* Background gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-20 pointer-events-none"></div>

      {/* D-Pad Buttons (Slices) overlaying seamlessly */}
      <button
        onClick={() => onSendKey('Up')}
        className={`absolute top-0 left-1/4 right-1/4 h-[35%] w-1/2 flex items-start justify-center pt-6 transition-colors duration-150 z-10
          ${activeKey === 'Up' ? 'bg-white/10 text-white' : 'text-neutral-400 hover:bg-white/5 hover:text-neutral-200'}`}
      >
        {icons.Up}
      </button>

      <button
        onClick={() => onSendKey('Down')}
        className={`absolute bottom-0 left-1/4 right-1/4 h-[35%] w-1/2 flex items-end justify-center pb-6 transition-colors duration-150 z-10
          ${activeKey === 'Down' ? 'bg-white/10 text-white' : 'text-neutral-400 hover:bg-white/5 hover:text-neutral-200'}`}
      >
        {icons.Down}
      </button>

      <button
        onClick={() => onSendKey('Left')}
        className={`absolute left-0 top-1/4 bottom-1/4 w-[35%] h-1/2 flex items-center justify-start pl-6 transition-colors duration-150 z-10
          ${activeKey === 'Left' ? 'bg-white/10 text-white' : 'text-neutral-400 hover:bg-white/5 hover:text-neutral-200'}`}
      >
        {icons.Left}
      </button>

      <button
        onClick={() => onSendKey('Right')}
        className={`absolute right-0 top-1/4 bottom-1/4 w-[35%] h-1/2 flex items-center justify-end pr-6 transition-colors duration-150 z-10
          ${activeKey === 'Right' ? 'bg-white/10 text-white' : 'text-neutral-400 hover:bg-white/5 hover:text-neutral-200'}`}
      >
        {icons.Right}
      </button>

      {/* Center OK Button */}
      <div className="absolute inset-0 m-auto w-[36%] h-[36%] z-20 rounded-full bg-neutral-900 border border-neutral-950 p-1 shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
        <button
          onClick={() => onSendKey('Return')}
          className={`w-full h-full rounded-full flex items-center justify-center font-bold text-lg tracking-wide transition-all duration-200 shadow-inner group
              ${activeKey === 'Return' 
                ? 'bg-sky-500 text-white scale-[0.97]' 
                : 'bg-gradient-to-b from-neutral-700 to-neutral-800 text-neutral-200 hover:from-neutral-600 hover:to-neutral-700'
              }`}
        >
           OK
        </button>
      </div>
      
    </div>
  );
}
