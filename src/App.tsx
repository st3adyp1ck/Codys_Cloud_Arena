import React, { useState, useEffect } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Star } from 'lucide-react';
import MainMenu from './components/MainMenu';
import RobotBuilder from './components/RobotBuilder';
import BattleArena from './components/BattleArena';
import CloudMarketplace from './components/CloudMarketplace';
import Leaderboard from './components/Leaderboard';
import CodyLogo from './components/CodyLogo';
import CodyMascot from './components/CodyMascot';
import BrandedHeader from './components/BrandedHeader';
import BrandedFooter from './components/BrandedFooter';

const GameScreen: React.FC = () => {
  const { state } = useGame();
  const [transitionClass, setTransitionClass] = useState('opacity-0');
  const [currentComponent, setCurrentComponent] = useState<React.ReactNode>(null);

  // Handle screen transitions with animation
  useEffect(() => {
    setTransitionClass('opacity-0 scale-95');

    const timer = setTimeout(() => {
      // Render different screens based on the current screen state
      switch (state.currentScreen) {
        case 'builder':
          setCurrentComponent(<RobotBuilder />);
          break;
        case 'battle':
          setCurrentComponent(<BattleArena />);
          break;
        case 'marketplace':
          setCurrentComponent(<CloudMarketplace />);
          break;
        case 'leaderboard':
          setCurrentComponent(<Leaderboard />);
          break;
        case 'main':
        default:
          setCurrentComponent(<MainMenu />);
          break;
      }

      // Fade in the new component
      setTimeout(() => {
        setTransitionClass('opacity-100 scale-100');
      }, 50);
    }, 300);

    return () => clearTimeout(timer);
  }, [state.currentScreen]);

  return (
    <div className={`transition-all duration-300 ease-in-out ${transitionClass}`}>
      {currentComponent}
    </div>
  );
};

const App: React.FC = () => {
  // State for loading screen
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <GameProvider>
      <div className="min-h-screen bg-[#050914] relative overflow-hidden">
        {/* Background circuit pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-[#00f0ff]"></div>
          <div className="absolute top-1/4 left-0 w-full h-[1px] bg-[#00f0ff]"></div>
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#00f0ff]"></div>
          <div className="absolute top-3/4 left-0 w-full h-[1px] bg-[#00f0ff]"></div>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#00f0ff]"></div>

          <div className="absolute left-0 top-0 w-[1px] h-full bg-[#00f0ff]"></div>
          <div className="absolute left-1/4 top-0 w-[1px] h-full bg-[#00f0ff]"></div>
          <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[#00f0ff]"></div>
          <div className="absolute left-3/4 top-0 w-[1px] h-full bg-[#00f0ff]"></div>
          <div className="absolute right-0 top-0 w-[1px] h-full bg-[#00f0ff]"></div>
        </div>

        {/* Radial gradients for futuristic look */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1128] to-[#050914] opacity-80 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,rgba(0,240,255,0.05)_0%,transparent_50%)] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_75%_75%,rgba(123,66,255,0.05)_0%,transparent_50%)] pointer-events-none"></div>

        {/* Scan line effect */}
        <div className="absolute left-0 top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-70 animate-scan"></div>

        {/* Loading screen */}
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-screen">
            {/* Northstar Coding Branding */}
            <div className="absolute top-4 left-4 flex items-center animate-pulse">
              <Star className="w-6 h-6 text-[#00f0ff] mr-1" fill="#00f0ff" />
              <span className="font-['Orbitron'] text-lg font-bold bg-gradient-to-r from-[#00f0ff] to-[#7b42ff] bg-clip-text text-transparent">
                NORTHSTAR CODING
              </span>
            </div>

            <div className="absolute top-4 right-4 text-[#e9f1f7] font-['Rajdhani'] text-sm">
              by <span className="text-[#b14aed] font-bold">Ilya Belous</span>
            </div>

            <div className="mb-8">
              <CodyLogo size="lg" />
            </div>
            <div className="mb-8">
              <CodyMascot size="lg" mood="thinking" />
            </div>
            <div className="w-64 h-2 bg-[#0a1128] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#00f0ff] to-[#7b42ff] rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
            <p className="mt-4 font-['Orbitron'] text-[#00f0ff] animate-pulse">INITIALIZING SYSTEMS...</p>

            {/* Copyright */}
            <div className="absolute bottom-4 text-center text-[#e9f1f7]/50 text-xs">
              <p>© {new Date().getFullYear()} NORTHSTAR CODING | ALL RIGHTS RESERVED</p>
            </div>
          </div>
        ) : (
          <div className="container mx-auto py-4 px-4 relative z-10">
            {/* Branded Header */}
            <BrandedHeader />

            {/* Main content */}
            <main>
              <GameScreen />
            </main>

            {/* Branded Footer */}
            <BrandedFooter />
          </div>
        )}
      </div>
    </GameProvider>
  );
};

export default App;