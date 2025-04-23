import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { RobotPart } from '../types';
import Button from './ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { ArrowLeft, Server, ShoppingCart, Filter, Search } from 'lucide-react';
import RobotPartCard from './ui/RobotPartCard';
import CloudServiceCard from './ui/CloudServiceCard';
import { FuturisticCard } from './ui/FuturisticCard';

const CloudMarketplace: React.FC = () => {
  const { state, dispatch } = useGame();
  const { player, availableParts } = state;

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'parts' | 'services'>('parts');

  // Get active robot
  const activeRobot = player.robots.find(robot => robot.id === player.activeRobotId);

  // Filter parts by category and search term
  const filteredParts = availableParts.filter(part => {
    const matchesCategory = selectedCategory ? part.cloudService.category === selectedCategory : true;
    const matchesSearch = searchTerm
      ? part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.description.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  // Get unique categories
  const categories = Array.from(
    new Set(availableParts.map(part => part.cloudService.category))
  );

  // Group cloud services by category
  const groupedCloudServices = state.cloudServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof state.cloudServices>);

  // Buy part
  const handleBuyPart = (part: RobotPart) => {
    if (activeRobot) {
      dispatch({
        type: 'BUY_PART',
        payload: {
          partId: part.id,
          robotId: activeRobot.id
        }
      });
    }
  };

  // Go back to main menu
  const handleBackToMain = () => {
    dispatch({ type: 'CHANGE_SCREEN', payload: 'main' });
  };

  return (
    <div className="w-full max-w-4xl mx-auto pt-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <button
          className="flex items-center text-[#00f0ff] hover:text-[#7df9ff] transition-colors"
          onClick={handleBackToMain}
        >
          <ArrowLeft className="mr-2" />
          <span className="font-['Orbitron']">Back to Main Menu</span>
        </button>
        <h2 className="text-2xl font-['Orbitron'] font-bold text-[#00f0ff] text-glow">CLOUD MARKETPLACE</h2>
      </div>

      {/* Player info */}
      <FuturisticCard
        className="mb-6"
        variant="primary"
        withGlow
        withScanlines
        padding="sm"
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-black font-medium">Available Credits</p>
            <p className="text-2xl font-['Orbitron'] font-bold text-[#00f0ff]">{player.credits}</p>
          </div>
          {activeRobot && (
            <div>
              <p className="text-sm text-black font-medium">Active Robot</p>
              <p className="text-lg font-['Orbitron'] font-medium text-[#00f0ff]">{activeRobot.name}</p>
            </div>
          )}
        </div>
      </FuturisticCard>

      {/* Tabs */}
      <div className="mb-6 flex">
        <button
          className={`px-6 py-3 font-['Orbitron'] font-medium rounded-tl-md rounded-bl-md transition-all duration-300 ${activeTab === 'parts'
            ? 'bg-gradient-to-r from-[#00a2b3] to-[#00f0ff] text-[#0a1128] shadow-[0_0_15px_rgba(0,240,255,0.3)]'
            : 'bg-[#0a1128]/50 text-[#e9f1f7] hover:bg-[#0a1128]/70 border-[#00f0ff]/20 border'
            }`}
          onClick={() => setActiveTab('parts')}
        >
          ROBOT PARTS
        </button>
        <button
          className={`px-6 py-3 font-['Orbitron'] font-medium rounded-tr-md rounded-br-md transition-all duration-300 ${activeTab === 'services'
            ? 'bg-gradient-to-r from-[#6930c3] to-[#7b42ff] text-white shadow-[0_0_15px_rgba(123,66,255,0.3)]'
            : 'bg-[#0a1128]/50 text-[#e9f1f7] hover:bg-[#0a1128]/70 border-[#7b42ff]/20 border'
            }`}
          onClick={() => setActiveTab('services')}
        >
          CLOUD SERVICES
        </button>
      </div>

      {activeTab === 'parts' ? (
        <>
          {/* Search and filters */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#00f0ff] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search parts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 bg-[#0a1128]/70 border border-[#00f0ff]/30 rounded-md focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] text-[#e9f1f7] placeholder-[#e9f1f7]/50 font-['Rajdhani']"
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#00f0ff] w-5 h-5" />
                <select
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                  className="w-full pl-3 pr-10 py-3 bg-[#0a1128]/70 border border-[#00f0ff]/30 rounded-md focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] text-[#e9f1f7] appearance-none font-['Rajdhani']"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Parts list */}
          {filteredParts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredParts.map((part) => {
                const alreadyHas = activeRobot?.parts[part.type]?.id === part.id;
                const canAfford = player.credits >= part.cost;

                return (
                  <RobotPartCard
                    key={part.id}
                    part={part}
                    alreadyHas={alreadyHas}
                    canAfford={canAfford}
                    hasActiveRobot={!!activeRobot}
                    onBuy={() => handleBuyPart(part)}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center p-8 frosted-glass rounded-lg">
              <p className="text-black font-medium font-['Rajdhani']">No parts found matching your search.</p>
            </div>
          )}
        </>
      ) : (
        // Cloud Services view
        <div className="space-y-8">
          {Object.entries(groupedCloudServices).map(([category, services]) => (
            <div key={category}>
              <h3 className="text-xl font-['Orbitron'] font-bold text-[#7b42ff] mb-4 capitalize">
                {category} Services
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map(service => (
                  <CloudServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          className="
            py-3 px-6 rounded-md font-['Orbitron'] font-semibold uppercase tracking-wider
            bg-gradient-to-r from-[#00a2b3] to-[#00f0ff] text-[#0a1128] shadow-[0_0_15px_rgba(0,240,255,0.3)]
            hover:transform hover:-translate-y-1 transition-all duration-300
          "
          onClick={handleBackToMain}
        >
          Return to Main Menu
        </button>
      </div>
    </div>
  );
};

export default CloudMarketplace;