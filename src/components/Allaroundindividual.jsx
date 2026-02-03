import React, { useState } from 'react';
import { Medal, ChevronDown, ChevronUp } from 'lucide-react';

const AllAroundIndividual = ({ individualData }) => {
  const [expandedPlayer, setExpandedPlayer] = useState(null);

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
    <div className="space-y-6 sm:space-y-8">
      {/* Top 3 - Card View with Full Medal Colors */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {individualData.result?.slice(0, 3).map((player, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${getMedalBgColor(player.final_rank)} rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${
                player.final_rank === "1" ? "border-yellow-400" : 
                player.final_rank === "2" ? "border-gray-400" : "border-amber-600"
              }`}
            >
              <div className="p-4 sm:p-5">
                {/* Rank Badge */}
                <div className="flex justify-center mb-3 sm:mb-4">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br ${getMedalColor(player.final_rank)} flex items-center justify-center shadow-lg border-4 border-white`}>
                    <Medal className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                </div>

                {/* Player Info */}
                <div className="text-center mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1 leading-tight">
                    {player.player_name}
                  </h3>
                  <p className="text-xs sm:text-sm text-indigo-700 font-medium">{player.unit}</p>
                </div>

                {/* Score */}
                <div className="text-center mb-3 sm:mb-4">
                  <div className="text-3xl sm:text-4xl font-bold text-gray-800">
                    {player.score}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Total Score</p>
                </div>

                {/* Expand Button */}
                <button
                  onClick={() => setExpandedPlayer(expandedPlayer === index ? null : index)}
                  className="w-full py-2 px-3 bg-white hover:bg-gray-50 rounded-lg flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-gray-700 transition-all shadow-sm"
                >
                  View Details
                  {expandedPlayer === index ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {/* Expanded Apparatus Scores */}
                {expandedPlayer === index && (
                  <div className="mt-3 pt-3 border-t border-gray-300">
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(player.details).map(([apparatus, score]) => (
                        <div
                          key={apparatus}
                          className="bg-white rounded-lg p-2 text-center shadow-sm"
                        >
                          <p className="text-xs text-gray-600 font-medium mb-1 truncate">
                            {apparatus}
                          </p>
                          <p className="text-lg sm:text-xl font-bold text-indigo-600">{score}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rest - Table View */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">All Participants</h2>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
                  <th className="py-3 px-3 text-left text-xs sm:text-sm font-semibold">Rank</th>
                  <th className="py-3 px-4 text-left text-xs sm:text-sm font-semibold">Athlete</th>
                  <th className="py-3 px-4 text-left text-xs sm:text-sm font-semibold">Team</th>
                  <th className="py-3 px-3 text-center text-xs sm:text-sm font-semibold">Score</th>
                  <th className="py-3 px-3 text-center text-xs sm:text-sm font-semibold">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {individualData.result?.slice(3).map((player, index) => (
                  <React.Fragment key={index}>
                    <tr className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 font-bold text-gray-700 text-sm">
                          {player.final_rank}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-gray-800 text-sm sm:text-base">{player.player_name}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-xs sm:text-sm text-indigo-600 font-medium">{player.unit}</p>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="text-xl sm:text-2xl font-bold text-indigo-600">{player.score}</span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => setExpandedPlayer(expandedPlayer === (index + 3) ? null : (index + 3))}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg text-xs font-medium transition-colors"
                        >
                          {expandedPlayer === (index + 3) ? 'Hide' : 'View'}
                          {expandedPlayer === (index + 3) ? (
                            <ChevronUp className="w-3 h-3" />
                          ) : (
                            <ChevronDown className="w-3 h-3" />
                          )}
                        </button>
                      </td>
                    </tr>
                    {expandedPlayer === (index + 3) && (
                      <tr>
                        <td colSpan="5" className="py-3 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                            {Object.entries(player.details).map(([apparatus, score]) => (
                              <div
                                key={apparatus}
                                className="bg-white rounded-lg p-3 shadow-md text-center"
                              >
                                <p className="text-xs text-gray-600 font-medium mb-1 truncate">
                                  {apparatus}
                                </p>
                                <p className="text-lg sm:text-xl font-bold text-indigo-600">{score}</p>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllAroundIndividual;