import React from 'react';
import { Star, Code, ExternalLink } from 'lucide-react';

const BrandedFooter: React.FC = () => {
  return (
    <footer className="mt-8 text-center">
      {/* Animated logo and branding */}
      <div className="flex items-center justify-center mb-3 animate-float">
        <div className="flex items-center p-2 rounded-lg bg-[#0a1128]/80 border border-[#00f0ff]/30 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
          <Star className="w-6 h-6 text-[#00f0ff] mr-1 animate-pulse" fill="#00f0ff" />
          <h3 className="font-['Orbitron'] text-lg font-bold bg-gradient-to-r from-[#00f0ff] to-[#7b42ff] bg-clip-text text-transparent">
            NORTHSTAR CODING
          </h3>
          <Star className="w-6 h-6 text-[#00f0ff] ml-1 animate-pulse" fill="#00f0ff" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>

      {/* Developer credit with animation */}
      <div className="mb-3 relative overflow-hidden">
        <div className="p-2 rounded-lg inline-block">
          <p className="text-[#e9f1f7] font-['Rajdhani'] font-semibold">
            Developed by <span className="text-[#b14aed] font-bold text-shadow-purple">Ilya Belous</span>
          </p>
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent animate-scan"></div>
        </div>
      </div>

      {/* Website link */}
      <a
        href="https://www.northstarcoding.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-4 py-2 rounded-lg bg-[#0a1128]/80 border border-[#00f0ff]/30 text-[#00f0ff] hover:text-[#7b42ff] hover:border-[#7b42ff]/30 hover:shadow-[0_0_15px_rgba(123,66,255,0.3)] transition-all duration-300 font-['Rajdhani'] font-semibold mb-3"
      >
        <Code className="w-4 h-4 mr-2 animate-pulse" />
        www.northstarcoding.com
        <ExternalLink className="w-3 h-3 ml-2" />
      </a>

      {/* Copyright */}
      <div className="text-[#e9f1f7] font-medium text-xs font-['Rajdhani'] border-t border-[#00f0ff]/20 pt-3 mt-3">
        <p className="text-[#b14aed] font-bold">POWERED BY ALIBABA CLOUD SERVICES</p>
        <p className="mt-1 font-semibold">
          © {new Date().getFullYear()} <span className="text-[#00f0ff]">NORTHSTAR CODING</span> | <span className="text-[#b14aed]">ALL RIGHTS RESERVED</span>
        </p>
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/30 to-transparent mt-2"></div>
      </div>
    </footer>
  );
};

export default BrandedFooter;
