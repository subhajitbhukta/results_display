import React, { useState } from 'react';
import { Medal, Target } from 'lucide-react';

const ApparatusScores = ({ individualData, apparatus }) => {
  const [activeApparatus, setActiveApparatus] = useState('FLOOR EXERCISE');

  const getMedalColor = (rank) => {
    switch(rank) {
      case "1": return "from-yellow-400 to-yellow-600";
      case "2": return "from-gray-300 to-gray-500";
      case "3": return "from-amber-600 to-amber-800";
      default: return "from-blue-500 to-blue-700";
    }
  };

  const getMedalBgColor = (rank) => {
    switch(rank) {
      case "1": return "from-yellow-50 via-yellow-100 to-yellow-200";
      case "2": return "from-gray-50 via-gray-100 to-gray-200";
      case "3": return "from-amber-50 via-orange-100 to-amber-200";
      default: return "from-blue-50 to-blue-100";
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Apparatus Tabs */}
      <div className="bg-white rounded-xl shadow-lg p-1.5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5">
          {apparatus.map((app, index) => (
            <button
              key={index}
              onClick={() => setActiveApparatus(app)}
              className={`px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg font-semibold text-xs transition-all duration-300 ${
                activeApparatus === app
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md scale-105'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {app}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Apparatus Content */}
      {apparatus.map((app) => {
        if (activeApparatus !== app) return null;

        const allPerformers = individualData.result?.filter(player => player.details[app])
          .map(player => ({
            ...player,
            apparatusScore: parseFloat(player.details[app])
          }))
          .sort((a, b) => b.apparatusScore - a.apparatusScore);

        const topThree = allPerformers?.slice(0, 3);
        const remaining = allPerformers?.slice(3);

        return (
          <div key={app} className="space-y-6 sm:space-y-8">
            {/* Top 3 - Card View with Full Medal Colors */}
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    {app}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500">Top Performers</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {topThree?.map((player, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-br ${getMedalBgColor(String(index + 1))} rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${
                      index === 0 ? "border-yellow-400" : 
                      index === 1 ? "border-gray-400" : "border-amber-600"
                    }`}
                  >
                    <div className="p-4 sm:p-5">
                      {/* Rank Badge */}
                      <div className="flex justify-center mb-3 sm:mb-4">
                        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br ${getMedalColor(String(index + 1))} flex items-center justify-center shadow-lg border-4 border-white`}>
                          <Medal className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                        </div>
                      </div>

                      {/* Player Info */}
                      <div className="text-center mb-3 sm:mb-4">
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1 leading-tight">
                          {player.player_name}
                        </h3>
                        <p className="text-xs sm:text-sm text-indigo-700 font-medium mb-1">{player.unit}</p>
                        <p className="text-xs text-gray-600">Overall Rank: #{player.final_rank}</p>
                      </div>

                      {/* Apparatus Score */}
                      <div className="text-center py-3 sm:py-4 bg-white rounded-xl shadow-sm mb-3">
                        <div className="text-3xl sm:text-4xl font-bold text-gray-800">
                          {player.apparatusScore}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{app} Score</p>
                      </div>

                      {/* All Around Score */}
                      <div className="text-center pt-3 border-t border-gray-300">
                        <p className="text-xs text-gray-600">Total All-Around</p>
                        <p className="text-xl sm:text-2xl font-bold text-gray-700">{player.score}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Remaining - Table View */}
            {remaining?.length > 0 && (
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Complete Rankings</h3>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
                          <th className="py-3 px-3 text-left text-xs sm:text-sm font-semibold">Pos</th>
                          <th className="py-3 px-4 text-left text-xs sm:text-sm font-semibold">Athlete</th>
                          <th className="py-3 px-4 text-left text-xs sm:text-sm font-semibold">Team</th>
                          <th className="py-3 px-3 text-center text-xs sm:text-sm font-semibold">Score</th>
                          <th className="py-3 px-3 text-center text-xs sm:text-sm font-semibold">Rank</th>
                          <th className="py-3 px-3 text-center text-xs sm:text-sm font-semibold">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {remaining.map((player, index) => (
                          <tr key={index} className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-colors">
                            <td className="py-3 px-3">
                              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 font-bold text-gray-700 text-sm">
                                {index + 4}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <p className="font-semibold text-gray-800 text-sm sm:text-base">{player.player_name}</p>
                            </td>
                            <td className="py-3 px-4">
                              <p className="text-xs sm:text-sm text-indigo-600 font-medium">{player.unit}</p>
                            </td>
                            <td className="py-3 px-3 text-center">
                              <span className="inline-block px-2 sm:px-3 py-1 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-lg">
                                <span className="text-lg sm:text-xl font-bold text-indigo-600">{player.apparatusScore}</span>
                              </span>
                            </td>
                            <td className="py-3 px-3 text-center">
                              <span className="text-sm sm:text-base font-semibold text-gray-700">#{player.final_rank}</span>
                            </td>
                            <td className="py-3 px-3 text-center">
                              <span className="text-sm sm:text-base font-semibold text-gray-600">{player.score}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ApparatusScores;