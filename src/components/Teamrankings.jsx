import React from 'react';
import { Medal } from 'lucide-react';

const TeamRankings = ({ teamData }) => {
  const getMedalColor = (rank) => {
    switch(rank) {
      case "1": return "from-yellow-400 to-yellow-600";
      case "2": return "from-gray-300 to-gray-500";
      case "3": return "from-amber-600 to-amber-800";
      default: return "from-blue-500 to-blue-700";
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {teamData.result?.map((team, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
        >
          <div className="flex items-center p-4 sm:p-5">
            {/* Rank Badge */}
            <div className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-br ${getMedalColor(team.team_rank)} flex items-center justify-center shadow-md mr-3 sm:mr-4 group-hover:scale-110 transition-transform`}>
              <div className="text-center">
                {parseInt(team.team_rank) <= 3 ? (
                  <Medal className="w-6 h-6 sm:w-8 sm:h-8 text-white mx-auto" />
                ) : (
                  <span className="text-xl sm:text-2xl font-bold text-white">
                    {team.team_rank}
                  </span>
                )}
              </div>
            </div>

            {/* Team Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-lg font-bold text-gray-800 truncate group-hover:text-indigo-600 transition-colors">
                {team.team_name}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">Team Championship</p>
            </div>

            {/* Score */}
            <div className="text-right ml-3">
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                {team.score}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">Points</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamRankings;