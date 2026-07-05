import React, { useState } from 'react';
import { User } from '../types';
import { Handshake, Menu, X, Users, Settings, ShieldAlert, LogOut, ChevronDown, Plus } from 'lucide-react';

interface HeaderProps {
  currentUser: User;
  onSwitchUser: (user: User) => void;
  availableUsers: User[];
  currentTab: string;
  onChangeTab: (tab: string) => void;
  onOpenShareResource: () => void;
}

export function Header({
  currentUser,
  onSwitchUser,
  availableUsers,
  currentTab,
  onChangeTab,
  onOpenShareResource
}: HeaderProps) {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'resources', label: 'Resources' },
    { id: 'jobs', label: 'Jobs' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'admin', label: 'Admin', icon: true }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#faf9f6]/95 backdrop-blur-md border-b border-[#e2dfd5] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div 
            onClick={() => onChangeTab('home')} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#2c6e49] text-white transition-transform duration-300 group-hover:scale-105">
              <Handshake className="w-5 h-5" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#1c1c1c] group-hover:text-[#2c6e49] transition-colors">
              Baraton <span className="font-sans text-lg font-medium text-[#2c6e49] ml-1">BCRSS</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              // If user is not admin, hide or show a subtle notification on admin tab, but let them choose to simulate
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onChangeTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-1.5 ${
                    isActive 
                      ? 'bg-[#2c6e49]/10 text-[#2c6e49] font-semibold' 
                      : 'text-[#5c5a54] hover:bg-[#e2dfd5]/45 hover:text-[#1c1c1c]'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.id === 'admin' && (
                    <span className="inline-block w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Area */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Share Resource CTA */}
            <button
              onClick={onOpenShareResource}
              className="px-5 py-2.5 bg-[#2c6e49] hover:bg-[#205234] text-white text-sm font-semibold rounded-xl flex items-center space-x-2 shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>Share Resource</span>
            </button>

            {/* Profile Initials Swapper */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-[#e2dfd5]/45 transition-colors"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm tracking-wide shadow-sm ${currentUser.avatarColor}`}>
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </div>
                <ChevronDown className="w-4 h-4 text-[#5c5a54]" />
              </button>

              {/* User Selector Dropdown */}
              {userDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setUserDropdownOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-3 w-72 bg-[#faf9f6] border border-[#e2dfd5] rounded-2xl shadow-xl z-40 overflow-hidden transform origin-top-right transition-all">
                    
                    {/* Logged in Title */}
                    <div className="p-4 bg-stone-100/60 border-b border-[#e2dfd5]">
                      <div className="font-semibold text-[#1c1c1c] text-sm break-words">{currentUser.name}</div>
                      <div className="text-xs text-stone-500 break-words">{currentUser.email}</div>
                      <div className="mt-2.5 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#2c6e49]/10 text-[#2c6e49]">
                        {currentUser.role} Account
                      </div>
                    </div>

                    {/* Standard menu items */}
                    <div className="p-1 border-b border-[#e2dfd5]">
                      <button
                        onClick={() => {
                          onChangeTab('admin');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2 text-sm text-[#5c5a54] hover:bg-[#e2dfd5]/40 hover:text-[#1c1c1c] rounded-xl flex items-center space-x-2.5 transition-colors"
                      >
                        <Settings className="w-4 h-4 text-stone-400" />
                        <span>Admin Panel</span>
                      </button>
                      <button
                        onClick={() => {
                          onChangeTab('dashboard');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2 text-sm text-[#5c5a54] hover:bg-[#e2dfd5]/40 hover:text-[#1c1c1c] rounded-xl flex items-center space-x-2.5 transition-colors"
                      >
                        <Users className="w-4 h-4 text-stone-400" />
                        <span>My Dashboard</span>
                      </button>
                    </div>

                    {/* Simulation - Let user swap profile to test borrow flow */}
                    <div className="p-3 bg-stone-50">
                      <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-2 px-1">
                        Simulate Role Swap
                      </div>
                      <div className="space-y-1 max-h-48 overflow-y-auto">
                        {availableUsers.map((user) => (
                          <button
                            key={user.id}
                            onClick={() => {
                              onSwitchUser(user);
                              setUserDropdownOpen(false);
                            }}
                            className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                              currentUser.id === user.id
                                ? 'bg-[#2c6e49]/10 text-[#2c6e49] font-medium'
                                : 'hover:bg-[#e2dfd5]/30 text-[#5c5a54] hover:text-[#1c1c1c]'
                            }`}
                          >
                            <span className="truncate">{user.name} ({user.role})</span>
                            <span className="text-[10px] text-stone-400 uppercase">{user.location.split(' ')[0]}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Logout simulation */}
                    <div className="p-1 bg-stone-100/30">
                      <button
                        onClick={() => {
                          alert("To simulation-test multiple user scenarios, simply pick other names in the switch list!");
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2.5 text-xs text-red-600 hover:bg-red-50 rounded-xl flex items-center space-x-2.5 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Log out Simulation</span>
                      </button>
                    </div>

                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${currentUser.avatarColor}`}>
              {currentUser.name[0]}
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-[#e2dfd5] text-[#5c5a54]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#e2dfd5] bg-[#faf9f6]/95 py-4 px-4 space-y-3">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onChangeTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  currentTab === item.id 
                    ? 'bg-[#2c6e49]/10 text-[#2c6e49]' 
                    : 'text-[#5c5a54] hover:bg-[#e2dfd5]/40'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#e2dfd5] space-y-3">
            <button
              onClick={() => {
                onOpenShareResource();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-[#2c6e49] text-white font-semibold rounded-xl text-center text-sm"
            >
              Share Resource
            </button>

            <div className="bg-stone-50 rounded-xl p-3">
              <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 px-1">
                Active Simulator Role:
              </div>
              <div className="grid grid-cols-2 gap-1 bg-white p-1 rounded-lg border border-[#e2dfd5]">
                {availableUsers.slice(0, 4).map((user) => (
                  <button
                    key={user.id}
                    onClick={() => {
                      onSwitchUser(user);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-2 py-1.5 rounded text-[11px] font-medium truncate ${
                      currentUser.id === user.id
                        ? 'bg-[#2c6e49] text-white'
                        : 'text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {user.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
