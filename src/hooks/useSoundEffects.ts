import { useEffect, useCallback } from 'react';
import { playSound, setVolume, setMuted, isSoundMuted, getVolume } from '../utils/soundEffects';

/**
 * Custom hook for managing sound effects
 * @param initialVolume Initial volume level (0-1)
 * @param initialMuted Initial muted state
 */
export const useSoundEffects = (initialVolume = 0.7, initialMuted = false) => {
  // Initialize volume and mute state
  useEffect(() => {
    setVolume(initialVolume);
    setMuted(initialMuted);
  }, [initialVolume, initialMuted]);

  // Play sound wrapper
  const play = useCallback((sound: string, volume?: number) => {
    playSound(sound as any, volume);
  }, []);

  // Toggle mute
  const toggleMute = useCallback(() => {
    setMuted(!isSoundMuted());
    return !isSoundMuted();
  }, []);

  // Change volume
  const changeVolume = useCallback((newVolume: number) => {
    setVolume(newVolume);
    return newVolume;
  }, []);

  // Get current state
  const getSoundState = useCallback(() => {
    return {
      volume: getVolume(),
      muted: isSoundMuted()
    };
  }, []);

  return {
    play,
    toggleMute,
    changeVolume,
    getSoundState
  };
};

export default useSoundEffects;
