import React, { useState } from 'react';
import { Trophy, Users, User, Target } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import TeamRankings from './Teamrankings';
import AllAroundIndividual from './Allaroundindividual';
import ApparatusScores from './Apparatusscores';

const Display = () => {
    const [activeTab, setActiveTab] = useState('team');

    // Fetch team data with polling every 30 seconds
    const { data: teamData, isLoading: teamLoading, error: teamError } = useQuery({
        queryKey: ['teamResults'],
        queryFn: async () => {
            try {
                const response = await axios.get('https://finaltsr.com/igss/api/6795273/result', {
                    headers: {
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache',
                        'Accept': 'application/json'
                    }
                });
                
                console.log('Team API Response Type:', typeof response.data);
                console.log('Team API Response:', response.data);
                
                // Check if we got HTML instead of JSON
                if (typeof response.data === 'string' && response.data.includes('<!doctype html>')) {
                    throw new Error('API returned HTML instead of JSON. Please check your Vite proxy configuration or backend URL.');
                }
                
                // Ensure we have the expected data structure
                if (!response.data) {
                    throw new Error('No data received from team API');
                }
                
                return response.data;
            } catch (error) {
                console.error('Team API error:', error);
                if (error.message.includes('HTML')) {
                    throw error;
                }
                throw new Error('Failed to fetch team data. Check if backend is running and proxy is configured.');
            }
        },
        refetchInterval: 30000,
        staleTime: 20000,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    // Fetch individual and apparatus data with polling every 30 seconds
    const { data: individualData, isLoading: individualLoading, error: individualError } = useQuery({
        queryKey: ['individualResults'],
        queryFn: async () => {
            try {
                const response = await axios.get('https://finaltsr.com/igss/api/67952737/result', {
                    headers: {
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache',
                        'Accept': 'application/json'
                    }
                });
                
                console.log('Individual API Response Type:', typeof response.data);
                console.log('Individual API Response:', response.data);
                
                // Check if we got HTML instead of JSON
                if (typeof response.data === 'string' && response.data.includes('<!doctype html>')) {
                    throw new Error('API returned HTML instead of JSON. Please check your Vite proxy configuration or backend URL.');
                }
                
                // Ensure we have the expected data structure
                if (!response.data) {
                    throw new Error('No data received from individual API');
                }
                
                return response.data;
            } catch (error) {
                console.error('Individual API error:', error);
                if (error.message.includes('HTML')) {
                    throw error;
                }
                throw new Error('Failed to fetch individual data. Check if backend is running and proxy is configured.');
            }
        },
        refetchInterval: 30000,
        staleTime: 20000,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    const apparatus = ["FLOOR EXERCISE", "POMMEL HORSE", "RINGS", "Vault", "PARALLEL BARS", "HORIZONTAL BAR"];

    // Loading state
    if (teamLoading || individualLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mb-4"></div>
                    <p className="text-xl font-semibold text-gray-700">Loading Results...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (teamError || individualError) {
        const errorMessage = teamError?.message || individualError?.message;
        const isProxyError = errorMessage?.includes('HTML') || errorMessage?.includes('proxy');
        
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl">
                    <div className="text-red-500 text-5xl mb-4 text-center">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Error Loading Results</h2>
                    <p className="text-gray-600 mb-6 text-center">{errorMessage}</p>
                    
                    {isProxyError && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
                            <p className="font-semibold text-blue-900 mb-2">Setup Instructions:</p>
                            <ol className="list-decimal list-inside space-y-2 text-blue-800">
                                <li>Create or update <code className="bg-blue-100 px-2 py-1 rounded">vite.config.js</code> in your project root</li>
                                <li>Add proxy configuration:
                                    <pre className="bg-blue-900 text-blue-50 p-3 rounded mt-2 overflow-x-auto text-xs">
{`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/igss': {
        target: 'https://finaltsr.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})`}
                                    </pre>
                                </li>
                                {/* <li>Replace <code className="bg-blue-100 px-2 py-1 rounded">http://your-backend-url</code> with your actual backend URL</li> */}
                                <li>Restart your Vite dev server</li>
                            </ol>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white shadow-2xl overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                    {/* Scrolling Title */}
                    <div className="relative overflow-hidden mb-2">
                        <div className="flex items-center animate-marquee whitespace-nowrap">
                            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 mr-3 flex-shrink-0 animate-pulse" />
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mr-12">
                                {teamData?.game_name || '69th National School Games 2026'}
                            </h1>
                            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 mr-3 flex-shrink-0 animate-pulse" />
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mr-12">
                                {teamData?.game_name || '69th National School Games 2026'}
                            </h1>
                            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 mr-3 flex-shrink-0 animate-pulse" />
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mr-12">
                                {teamData?.game_name || '69th National School Games 2026'}
                            </h1>
                            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 mr-3 flex-shrink-0 animate-pulse" />
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mr-12">
                                {teamData?.game_name || '69th National School Games 2026'}
                            </h1>
                        </div>
                    </div>

                    {/* Subtitle and Live Button Container */}
                    <div className="flex items-center justify-center gap-3 sm:gap-4">
                        {/* Static Subtitle */}
                        <p className="text-center text-base sm:text-lg font-semibold opacity-95">
                            Boys Gymnastics Championship
                        </p>

                        {/* Live Button */}
                        <div className="relative flex-shrink-0">
                            {/* Animated Glow Ring */}
                            <div className="absolute inset-0 rounded-full bg-red-500 animate-pulse opacity-75"></div>

                            {/* Live Button */}
                            <div className="relative bg-gradient-to-r from-red-600 to-red-500 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-2xl border-2 border-white flex items-center gap-1.5 sm:gap-2 animate-fade-pulse">
                                {/* Live Dot */}
                                <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 bg-white"></span>
                                </span>

                                {/* Live Text */}
                                <span className="font-bold text-xs sm:text-sm tracking-wider">LIVE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animation Styles */}
            <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes fade-pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        
        .animate-fade-pulse {
          animation: fade-pulse 2s ease-in-out infinite;
        }
      `}</style>

            {/* Tabs - Optimized for Mobile (No Scroll) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="bg-white rounded-xl shadow-lg p-1.5 grid grid-cols-3 gap-1.5">
                    <button
                        onClick={() => setActiveTab('team')}
                        className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 ${activeTab === 'team'
                            ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md scale-105'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="hidden sm:inline">Team Rankings</span>
                        <span className="sm:hidden">Team</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('individual')}
                        className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 ${activeTab === 'individual'
                            ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md scale-105'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <User className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="hidden sm:inline">All Around</span>
                        <span className="sm:hidden">All Around</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('apparatus')}
                        className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 ${activeTab === 'apparatus'
                            ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md scale-105'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="hidden sm:inline">Apparatus</span>
                        <span className="sm:hidden">Apparatus</span>
                    </button>
                </div>

                {/* Content */}
                <div className="mt-6 pb-8">
                    {/* Team Rankings */}
                    {activeTab === 'team' && teamData && <TeamRankings teamData={teamData} />}

                    {/* All Around Individual */}
                    {activeTab === 'individual' && individualData && <AllAroundIndividual individualData={individualData} />}

                    {/* Apparatus Scores */}
                    {activeTab === 'apparatus' && individualData && <ApparatusScores individualData={individualData} apparatus={apparatus} />}
                </div>
            </div>
        </div>
    );
};

export default Display;