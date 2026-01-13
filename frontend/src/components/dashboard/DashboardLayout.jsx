import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';
import { LogOut, Bell, Moon, Sun, Search, Users } from 'lucide-react';
import Sidebar from './Sidebar';
import { useTheme } from '../../context/ThemeContext';

const DashboardHeader = () => {
    const { user } = useUser();
    const { signOut } = useClerk();
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useTheme();
    const userRole = user?.publicMetadata?.role || 'customer';

    const handleLogout = () => {
        signOut(() => navigate('/'));
    };

    return (
        <header className="h-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 sticky top-0 z-30 px-8 flex items-center justify-between">
            {/* Search Bar (Optional) */}
            <div className="hidden md:flex items-center gap-3 bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-700 w-96 transition-all focus-within:ring-2 focus-within:ring-red-500/20 focus-within:border-red-500/50">
                <Search size={18} className="text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search operations..." 
                    className="bg-transparent border-none outline-none text-sm w-full dark:text-white"
                />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
                {/* Theme Toggle */}
                <button 
                    onClick={toggleTheme}
                    className="p-2.5 bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-red-600 rounded-xl border border-gray-100 dark:border-gray-700 transition-all"
                >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Notifications */}
                <button className="p-2.5 bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-red-600 rounded-xl border border-gray-100 dark:border-gray-700 transition-all relative">
                    <Bell size={20} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-600 rounded-full border-2 border-white dark:border-gray-800"></span>
                </button>

                {/* Vertical Divider */}
                <div className="h-8 w-px bg-gray-100 dark:bg-gray-800"></div>

                {/* User Profile */}
                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                            {user?.fullName || user?.firstName || 'User'}
                        </p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-red-600">
                            {userRole}
                        </p>
                    </div>
                    <div className="relative group">
                        <button className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-red-500/20 group-hover:scale-105 transition-all">
                            {(user?.firstName || user?.fullName || 'U').charAt(0)}
                        </button>
                        
                        {/* Dropdown on hover/click */}
                        <div className="absolute top-full right-0 mt-3 w-48 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-3 transform origin-top-right">
                             <p className="text-xs font-black text-gray-400 uppercase tracking-widest px-4 py-2 border-b border-gray-50 dark:border-gray-800 mb-2">My Profile</p>
                             <button 
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-500 hover:text-red-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all"
                             >
                                <Users size={18} />
                                View Profile
                             </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

const DashboardLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300">
            <Sidebar />
            <div className="lg:pl-72 transition-all duration-300">
                <DashboardHeader />
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
