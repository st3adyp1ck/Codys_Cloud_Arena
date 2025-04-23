// Sound effects utility for Cody's Cloud Arena

// Cache for loaded audio objects
const audioCache: { [key: string]: HTMLAudioElement } = {};

// Sound effect paths
const SOUND_EFFECTS = {
  buttonClick: '/sounds/button-click.mp3',
  hover: '/sounds/hover.mp3',
  success: '/sounds/success.mp3',
  error: '/sounds/error.mp3',
  battle: '/sounds/battle.mp3',
  victory: '/sounds/victory.mp3',
  defeat: '/sounds/defeat.mp3',
  purchase: '/sounds/purchase.mp3',
  scan: '/sounds/scan.mp3',
  notification: '/sounds/notification.mp3',
};

// Volume settings
let masterVolume = 0.7;
let isMuted = false;

/**
 * Preload all sound effects
 */
export const preloadSounds = (): void => {
  Object.entries(SOUND_EFFECTS).forEach(([key, path]) => {
    try {
      const audio = new Audio(path);
      audio.load();
      audioCache[key] = audio;
    } catch (error) {
      console.warn(`Failed to preload sound: ${key}`, error);
    }
  });
};

/**
 * Play a sound effect
 * @param sound The sound effect to play
 * @param volume Optional volume override (0-1)
 */
export const playSound = (sound: keyof typeof SOUND_EFFECTS, volume = 1): void => {
  if (isMuted) return;
  
  try {
    // Get from cache or create new audio
    const audio = audioCache[sound] || new Audio(SOUND_EFFECTS[sound]);
    
    // Set volume and play
    audio.volume = masterVolume * volume;
    
    // Reset audio to beginning if it's already playing
    audio.currentTime = 0;
    
    // Play the sound
    audio.play().catch(error => {
      // Handle autoplay restrictions gracefully
      console.warn(`Failed to play sound: ${sound}`, error);
    });
    
    // Cache for future use if not already cached
    if (!audioCache[sound]) {
      audioCache[sound] = audio;
    }
  } catch (error) {
    console.warn(`Error playing sound: ${sound}`, error);
  }
};

/**
 * Set the master volume for all sound effects
 * @param volume Volume level (0-1)
 */
export const setVolume = (volume: number): void => {
  masterVolume = Math.max(0, Math.min(1, volume));
};

/**
 * Mute or unmute all sound effects
 * @param mute Whether to mute sounds
 */
export const setMuted = (mute: boolean): void => {
  isMuted = mute;
};

/**
 * Get current mute state
 */
export const isSoundMuted = (): boolean => {
  return isMuted;
};

/**
 * Get current volume level
 */
export const getVolume = (): number => {
  return masterVolume;
};
