import React, { useState, useEffect, useRef } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import MainMenu from './components/MainMenu';
import RobotBuilder from './components/RobotBuilder';
import BattleArena from './components/BattleArena';
import CloudMarketplace from './components/CloudMarketplace';
import Leaderboard from './components/Leaderboard';
import CodyLogo from './components/CodyLogo';
import CodyMascot from './components/CodyMascot';
import BrandedHeader from './components/BrandedHeader';
import BrandedFooter from './components/BrandedFooter';

// Import visual effects components
import {
  FloatingParticles,
  VerticalScanLine,
  CornerDecorations,
  MiniRadar,
  HolographicOverlay,
  ScreenTransition
} from './components/effects';

// Import sound effects utility
import { preloadSounds, playSound } from './utils/soundEffects';

const GameScreen: React.FC = () => {
  const { state } = useGame();
  const [transitionClass, setTransitionClass] = useState('opacity-0');
  const [currentComponent, setCurrentComponent] = useState<React.ReactNode>(null);
  const [showTransition, setShowTransition] = useState(false);
  const [transitionMessage, setTransitionMessage] = useState('');
  const prevScreenRef = useRef(state.currentScreen);

  // Handle screen transitions with animation
  useEffect(() => {
    // Skip transition on initial render
    if (prevScreenRef.current !== state.currentScreen) {
      // Play transition sound
      playSound('scan', 0.5);

      // Show transition screen
      setTransitionMessage(getTransitionMessage(state.currentScreen));
      setShowTransition(true);
      setTransitionClass('opacity-0 scale-95');

      // Update previous screen ref
      prevScreenRef.current = state.currentScreen;
    }

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

  // Helper function to get transition message
  const getTransitionMessage = (screen: string): string => {
    switch (screen) {
      case 'builder':
        return 'INITIALIZING ROBOT BUILDER';
      case 'battle':
        return 'ENTERING BATTLE ARENA';
      case 'marketplace':
        return 'ACCESSING CLOUD MARKETPLACE';
      case 'leaderboard':
        return 'LOADING LEADERBOARD DATA';
      case 'main':
      default:
        return 'RETURNING TO MAIN MENU';
    }
  };

  // Handle transition completion
  const handleTransitionComplete = () => {
    setShowTransition(false);
  };

  return (
    <>
      <div className={`transition-all duration-300 ease-in-out ${transitionClass} cursor-default`}>
        {currentComponent}
      </div>

      {/* Screen transition overlay */}
      <ScreenTransition
        isActive={showTransition}
        message={transitionMessage}
        onTransitionComplete={handleTransitionComplete}
        duration={800}
      />
    </>
  );
};

const App: React.FC = () => {
  // State for loading screen
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('');
  const [showHolographic, setShowHolographic] = useState(false);
  const fullText = 'INITIALIZING SYSTEMS...';

  // Preload sound effects
  useEffect(() => {
    preloadSounds();
  }, []);

  // Simulate loading with progress
  useEffect(() => {
    if (!loading) return;

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        const next = prev + Math.random() * 15;
        return next > 100 ? 100 : next;
      });
    }, 300);

    // Typing effect for loading text
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex <= fullText.length) {
        setLoadingText(fullText.substring(0, charIndex));
        charIndex++;
        // Play typing sound for each character
        if (charIndex > 1) {
          playSound('hover', 0.2);
        }
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    // Complete loading after animation
    const timer = setTimeout(() => {
      clearInterval(progressInterval);
      clearInterval(typingInterval);
      setLoadingProgress(100);
      setLoadingText(fullText);

      // Play success sound
      playSound('success', 0.7);

      // Small delay after reaching 100% before hiding loader
      setTimeout(() => setLoading(false), 500);
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
      clearInterval(typingInterval);
    };
  }, [loading]);

  // Toggle holographic overlay effect for modals
  const toggleHolographicOverlay = (show: boolean) => {
    setShowHolographic(show);
    if (show) {
      playSound('notification', 0.5);
    }
  };

  return (
    <GameProvider>
      <div className="min-h-screen bg-[#050914] relative overflow-hidden cursor-default">
        {/* Motherboard background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1128] to-[#050914] opacity-90 pointer-events-none"></div>

        {/* Circuit board pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%2300f0ff' stroke-width='0.5' stroke-opacity='0.2'/%3E%3Cpath d='M30 10v20M50 10v80M70 10v20M10 30h20M70 30h20M10 50h80M10 70h20M70 70h20' stroke='%2300f0ff' stroke-width='0.5' stroke-opacity='0.2'/%3E%3Ccircle cx='30' cy='30' r='2' fill='%2300f0ff' fill-opacity='0.3'/%3E%3Ccircle cx='70' cy='30' r='2' fill='%2300f0ff' fill-opacity='0.3'/%3E%3Ccircle cx='30' cy='70' r='2' fill='%2300f0ff' fill-opacity='0.3'/%3E%3Ccircle cx='70' cy='70' r='2' fill='%2300f0ff' fill-opacity='0.3'/%3E%3C/svg%3E")`,
            opacity: 0.15
          }}></div>
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          {/* Horizontal lines */}
          {Array.from({ length: 11 }).map((_, i) => (
            <div key={`h-line-${i}`} className="absolute w-full h-[1px] bg-[#00f0ff]" style={{ top: `${i * 10}%`, left: 0 }}></div>
          ))}

          {/* Vertical lines */}
          {Array.from({ length: 11 }).map((_, i) => (
            <div key={`v-line-${i}`} className="absolute h-full w-[1px] bg-[#00f0ff]" style={{ left: `${i * 10}%`, top: 0 }}></div>
          ))}
        </div>

        {/* Floating particles */}
        <FloatingParticles count={40} />

        {/* Connection points */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`node-${i}`} className="absolute w-2 h-2 rounded-full bg-[#00f0ff]/30 animate-circuit-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`
              }}>
            </div>
          ))}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`purple-node-${i}`} className="absolute w-2 h-2 rounded-full bg-[#7b42ff]/30 animate-circuit-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.7 + 0.2}s`
              }}>
            </div>
          ))}
        </div>

        {/* Radial gradients for futuristic look */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,rgba(0,240,255,0.05)_0%,transparent_50%)] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_75%_75%,rgba(123,66,255,0.05)_0%,transparent_50%)] pointer-events-none"></div>

        {/* Scan line effects */}
        <div className="absolute left-0 top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-70 animate-scan"></div>
        <div className="absolute left-0 top-1/3 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7b42ff] to-transparent opacity-40 animate-scan" style={{ animationDelay: '2s' }}></div>
        <div className="absolute left-0 top-2/3 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ff88] to-transparent opacity-40 animate-scan" style={{ animationDelay: '4s' }}></div>

        {/* Enhanced vertical scan lines */}
        <VerticalScanLine color="rgba(0, 240, 255, 0.8)" duration={7} width={2} />
        <VerticalScanLine color="rgba(123, 66, 255, 0.8)" duration={9} delay={3.5} width={1} />

        {/* Corner decorations */}
        <CornerDecorations size={120} />

        {/* Mini radar */}
        <MiniRadar position="bottom-right" />

        {/* Loading screen */}
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-screen relative">
            {/* Animated circuit background */}
            <div className="absolute inset-0 pointer-events-none animate-circuit-fade">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={`h-line-${i}`} className="absolute w-full h-[1px] bg-[#00f0ff]"
                  style={{ top: `${i * 10}%`, left: 0, animationDelay: `${i * 0.2}s` }}></div>
              ))}
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={`v-line-${i}`} className="absolute h-full w-[1px] bg-[#00f0ff]"
                  style={{ left: `${i * 10}%`, top: 0, animationDelay: `${i * 0.2}s` }}></div>
              ))}
            </div>

            {/* Animated grid circles */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={`grid-${i}`}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-[#00f0ff]/20 rounded-full animate-pulse"
                  style={{
                    width: `${(i + 1) * 20}%`,
                    height: `${(i + 1) * 20}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: '3s'
                  }}
                />
              ))}
            </div>



            {/* Floating tech elements */}
            <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 animate-float-fast" style={{ animationDelay: '0.2s' }}>
              <div className="w-8 h-8 rounded-full border border-[#00f0ff]/50 flex items-center justify-center">
                <div className="w-4 h-4 bg-[#00f0ff]/20 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 animate-float" style={{ animationDelay: '0.7s' }}>
              <div className="w-10 h-10 rounded-full border border-[#b14aed]/50 flex items-center justify-center">
                <div className="w-5 h-5 bg-[#b14aed]/20 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2 animate-float-slow" style={{ animationDelay: '1.2s' }}>
              <div className="w-6 h-6 rounded-full border border-[#00ff88]/50 flex items-center justify-center">
                <div className="w-3 h-3 bg-[#00ff88]/20 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="absolute bottom-1/3 left-1/4 transform -translate-x-1/2 translate-y-1/2 animate-float-fast" style={{ animationDelay: '0.5s' }}>
              <div className="w-7 h-7 rounded-full border border-[#fbbc05]/50 flex items-center justify-center">
                <div className="w-3 h-3 bg-[#fbbc05]/20 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Main logo with enhanced animation */}
            <div className="mb-8 transform transition-all duration-500 filter drop-shadow-[0_0_15px_rgba(0,240,255,0.8)] hover:drop-shadow-[0_0_20px_rgba(123,66,255,0.8)] animate-float" style={{ animationDuration: '4s' }}>
              <div className="relative">
                <CodyLogo size="lg" />
                <div className="absolute -inset-4 border-2 border-[#00f0ff]/20 rounded-xl animate-pulse" style={{ animationDuration: '2s' }}></div>
                <div className="absolute -inset-8 border border-[#7b42ff]/10 rounded-xl animate-pulse" style={{ animationDuration: '3s' }}></div>
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/50 to-transparent mt-2 animate-scan"></div>
              </div>
            </div>

            {/* Mascot with enhanced animation */}
            <div className="mb-8 relative">
              {/* Glowing aura */}
              <div className="absolute -inset-4 rounded-full bg-[#00f0ff]/5 animate-pulse" style={{ animationDuration: '3s' }}></div>

              {/* Circular energy field */}
              <div className="absolute -inset-8 border-2 border-dashed border-[#00f0ff]/20 rounded-full animate-rotate" style={{ animationDuration: '10s' }}></div>
              <div className="absolute -inset-12 border border-dashed border-[#b14aed]/10 rounded-full animate-rotate" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>

              {/* Robot mascot */}
              <CodyMascot size="lg" mood="thinking" />

              {/* Energy beams */}
              <div className="absolute top-1/2 left-0 w-8 h-[2px] bg-gradient-to-r from-[#00f0ff] to-transparent animate-pulse"></div>
              <div className="absolute top-1/2 right-0 w-8 h-[2px] bg-gradient-to-l from-[#00f0ff] to-transparent animate-pulse"></div>

              {/* Data particles */}
              <div className="absolute top-0 left-1/4 w-1 h-1 bg-[#00f0ff] rounded-full animate-float-fast" style={{ animationDelay: '0.1s' }}></div>
              <div className="absolute bottom-0 right-1/4 w-1 h-1 bg-[#b14aed] rounded-full animate-float-fast" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute top-1/4 right-0 w-1 h-1 bg-[#00ff88] rounded-full animate-float-fast" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-1/4 left-0 w-1 h-1 bg-[#fbbc05] rounded-full animate-float-fast" style={{ animationDelay: '0.7s' }}></div>
            </div>

            {/* Dynamic progress bar */}
            <div className="w-64 h-3 bg-[#0a1128] rounded-full overflow-hidden border border-[#00f0ff]/30 relative">
              <div
                className="h-full bg-gradient-to-r from-[#00f0ff] to-[#7b42ff] rounded-full relative"
                style={{ width: `${loadingProgress}%`, transition: 'width 0.3s ease-out' }}
              >
                {/* Shine effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan" style={{ animationDuration: '1.5s' }}></div>
              </div>
              <div className="absolute top-full left-0 mt-1 text-xs text-[#00f0ff] font-['Rajdhani']">
                {Math.round(loadingProgress)}%
              </div>
            </div>

            {/* Typing effect for loading text */}
            <div className="mt-6 font-['Orbitron'] text-[#00f0ff] min-h-[1.5rem] relative">
              <span className="relative">
                {loadingText}
                <span className="absolute right-[-12px] top-0 w-2 h-full bg-[#00f0ff] animate-typing-cursor"></span>
              </span>
            </div>

            {/* Scan line effects */}
            <div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-70 animate-scan" style={{ top: '30%' }}></div>
            <div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#7b42ff] to-transparent opacity-70 animate-scan" style={{ top: '70%', animationDelay: '1.5s' }}></div>
            <div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00ff88] to-transparent opacity-50 animate-scan" style={{ top: '50%', animationDelay: '0.8s', animationDuration: '4s' }}></div>

            {/* Vertical scan lines */}
            <div className="absolute top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-[#00f0ff] to-transparent opacity-30 animate-scan-vertical"
              style={{ left: '20%', animationDuration: '5s' }}></div>
            <div className="absolute top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-[#b14aed] to-transparent opacity-30 animate-scan-vertical"
              style={{ left: '80%', animationDuration: '7s', animationDelay: '2.5s' }}></div>

            {/* Copyright */}
            <div className="absolute bottom-4 text-center text-[#e9f1f7]/50 text-xs">
              <p>© {new Date().getFullYear()} <span className="text-[#00f0ff]">NORTHSTAR CODING</span> | <span className="text-[#b14aed]">ALL RIGHTS RESERVED</span></p>
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

        {/* Holographic overlay for modals */}
        <HolographicOverlay isActive={showHolographic} />
      </div>
    </GameProvider>
  );
};

export default App;
