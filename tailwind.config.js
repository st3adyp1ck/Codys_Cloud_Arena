/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'ripple': 'ripple 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        'energy-beam': 'energy-beam 0.6s ease-in-out',
        'shield-pulse': 'shield-pulse 1.5s ease-in-out infinite',
        'victory-bounce': 'victory-bounce 1s ease-in-out',
        'defeat-shake': 'defeat-shake 0.5s ease-in-out',
        'status-blink': 'status-blink 1.5s ease-in-out infinite',
        'lightning': 'lightning 1s ease-in-out',
        'environment-pulse': 'environment-pulse 8s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
        'scan-vertical': 'scan-vertical 3s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'holographic': 'holographic-move 3s linear infinite',
        'rotate': 'rotate-gradient 3s linear infinite',
        'blink': 'blink 1s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-fast': 'float 3s ease-in-out infinite',
        'typing-cursor': 'typing-cursor 0.8s step-end infinite',
        'circuit-fade': 'circuit-fade 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'typing-cursor': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'circuit-fade': {
          '0%': { opacity: '0.05' },
          '50%': { opacity: '0.2' },
          '100%': { opacity: '0.05' },
        },
        ripple: {
          '0%': { transform: 'scale(0.8) translate(-50%, -50%)', opacity: '1' },
          '100%': { transform: 'scale(2) translate(-25%, -25%)', opacity: '0' },
        },
        'energy-beam': {
          '0%': { transform: 'scaleX(0)', opacity: '0.8' },
          '100%': { transform: 'scaleX(1)', opacity: '0' },
        },
        'shield-pulse': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.1)' },
        },
        'victory-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-30px)' },
        },
        'defeat-shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-10px)' },
          '40%, 80%': { transform: 'translateX(10px)' },
        },
        'status-blink': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        'lightning': {
          '0%': { opacity: '0' },
          '10%': { opacity: '1' },
          '20%': { opacity: '0.2' },
          '30%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'environment-pulse': {
          '0%, 100%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.2)' },
        },
        scan: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
        'scan-vertical': {
          '0%': { top: '-100%' },
          '100%': { top: '100%' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'holographic-move': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '50px 50px' },
        },
        'rotate-gradient': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};

