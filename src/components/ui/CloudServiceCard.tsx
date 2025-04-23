import React from 'react';
import { CloudService } from '../../types';
import { Server } from 'lucide-react';

interface CloudServiceCardProps {
  service: CloudService;
}

const CloudServiceCard: React.FC<CloudServiceCardProps> = ({ service }) => {
  return (
    <div className="frosted-glass rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(123,66,255,0.2)]">
      {/* Card header */}
      <div className="p-3 border-b border-[#7b42ff]/20">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#7b42ff]/20 flex items-center justify-center mr-2 border border-[#7b42ff]/30">
            <Server className="w-4 h-4 text-[#7b42ff]" />
          </div>
          <h3 className="font-['Orbitron'] font-bold text-[#b14aed] text-base leading-tight text-shadow-purple">
            {service.name}
          </h3>
        </div>
      </div>

      {/* Card content */}
      <div className="p-3">
        <p className="text-sm text-black font-medium mb-3">{service.description}</p>

        {/* Benefits */}
        <h4 className="text-xs font-['Orbitron'] text-[#b14aed] font-bold mb-2 text-shadow-sm">KEY BENEFITS:</h4>
        <ul className="text-xs text-black font-medium space-y-1 pl-5 list-disc mb-4">
          {service.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>

        {/* Learn more link */}
        <a
          href="https://www.alibabacloud.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#b14aed] hover:text-[#d78df9] hover:underline inline-flex items-center font-semibold"
        >
          <span className="mr-1">Learn more about {service.name}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </div>

      {/* Scan line effect */}
      <div className="absolute left-0 top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#7b42ff] to-transparent opacity-70 animate-scan"></div>
    </div>
  );
};

export default CloudServiceCard;
