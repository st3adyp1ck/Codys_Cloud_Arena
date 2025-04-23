import React from 'react';
import { playSound } from '../../utils/soundEffects';
import Button, { ButtonProps } from './Button';

interface SoundButtonProps extends ButtonProps {
  soundEffect?: 'buttonClick' | 'hover' | 'success' | 'error' | 'purchase';
  volume?: number;
}

/**
 * Button component with sound effects
 */
const SoundButton: React.FC<SoundButtonProps> = ({
  soundEffect = 'buttonClick',
  volume = 0.5,
  onClick,
  onMouseEnter,
  className = '',
  children,
  ...props
}) => {
  // Handle click with sound
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playSound(soundEffect, volume);
    if (onClick) onClick(e);
  };

  // Handle hover with sound
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    playSound('hover', 0.2);
    if (onMouseEnter) onMouseEnter(e);
  };

  return (
    <Button
      className={`circuit-hover ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {children}
    </Button>
  );
};

export default SoundButton;
