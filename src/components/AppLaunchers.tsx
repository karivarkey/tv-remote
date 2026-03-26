import { icons } from './icons';

type AppLaunchersProps = {
  activeKey: string | null;
  onLaunchApp: (appId: string, endpoint: string) => void;
  onSendKey: (key: string) => void;
};

export function AppLaunchers({ activeKey, onLaunchApp, onSendKey }: AppLaunchersProps) {
  return (
    <div className="flex items-center justify-center gap-3 w-full my-1">
      <button
        onClick={() => onSendKey('Escape')}
        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-full w-14 h-14 transition-all duration-200
          ${activeKey === 'Escape' 
             ? 'bg-white/10 scale-95 text-white shadow-inner' 
             : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-200 shadow-md border border-neutral-700/50'}`}
      >
        {icons.Back}
      </button>

      <button
        onClick={() => onLaunchApp('Home', '/app/home')}
        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-full w-14 h-14 transition-all duration-200
          ${activeKey === 'Home' 
             ? 'bg-white/10 scale-95 text-white shadow-inner' 
             : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-200 shadow-md border border-neutral-700/50'}`}
      >
        {icons.Home}
      </button>

      <button
        onClick={() => onLaunchApp('Refresh', '/refresh')}
        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-full w-14 h-14 transition-all duration-200
          ${activeKey === 'Refresh' 
             ? 'bg-white/10 scale-95 text-white shadow-inner' 
             : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-emerald-400 shadow-md border border-neutral-700/50'}`}
      >
        {icons.Refresh}
      </button>

      <button
        onClick={() => onLaunchApp('YouTube', '/app/yt')}
        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-full w-14 h-14 transition-all duration-200
          ${activeKey === 'YouTube' 
             ? 'bg-red-500/20 scale-95 text-red-500 shadow-inner' 
             : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-red-500 shadow-md border border-neutral-700/50'}`}
      >
        {icons.YouTube}
      </button>
    </div>
  );
}
