import { useState } from 'react';
import { useWebHaptics } from 'web-haptics/react';
import { api } from './api';
import { DPad } from './components/DPad';
import { VolumeControl } from './components/VolumeControl';
import { AppLaunchers } from './components/AppLaunchers';
import { TVStats } from './components/TVStats';

export default function App() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const { trigger } = useWebHaptics();

  const sendKey = async (key: string) => {
    setActiveKey(key);
    trigger('success');
    setTimeout(() => setActiveKey(null), 150);

    try {
      await api.post('/keys', { keys: [key] });
    } catch (err) {
      console.error(`Failed to send key ${key}:`, err);
    }
  };

  const launchApp = async (appId: string, endpoint: string) => {
    setActiveKey(appId);
    trigger('success');
    setTimeout(() => setActiveKey(null), 150);

    try {
      await api.post(endpoint);
    } catch (err) {
      console.error(`Failed to launch ${appId}:`, err);
    }
  };

  return (
    <div className="h-screen max-h-[100dvh] bg-[#0a0a0a] flex items-center justify-center p-2 sm:p-6 antialiased font-sans overflow-hidden">
      
      {/* Main Remote Container */}
      <div className="relative py-6 px-4 sm:px-6 rounded-[2.5rem] bg-neutral-900 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] border border-neutral-800/80 max-w-[340px] w-full h-[98vh] sm:h-auto max-h-[800px] mx-auto flex flex-col items-center justify-between gap-2 overflow-hidden">
        
        {/* Dynamic TV Stats LCD */}
        <TVStats />

        {/* Clean, Unified D-Pad Container */}
        <DPad activeKey={activeKey} onSendKey={sendKey} />

        {/* Volume Controls Horizontal Pill */}
        <VolumeControl />

        {/* Home & YouTube App Launchers */}
        <AppLaunchers activeKey={activeKey} onLaunchApp={launchApp} onSendKey={sendKey} />

        {/* Remote Footer Branding */}
        <div className="flex flex-col items-center pb-2 opacity-60">
           <div className="w-12 h-1 bg-gradient-to-r from-transparent via-neutral-600 to-transparent rounded-full mb-2"></div>
           <p className="text-[9px] text-neutral-500 font-bold uppercase tracking-[0.4em]">Smart Remote</p>
        </div>
        
      </div>
    </div>
  );
}