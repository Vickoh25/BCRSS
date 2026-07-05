import React, { useState } from 'react';
import { ResourceItem, User, ResourceCategory, ResourceStatus } from '../types';
import { ItemImage } from './ItemImage';
import { Search, MapPin, Plus, User as UserIcon, Calendar, Check, AlertTriangle, Eye, ArrowRight } from 'lucide-react';

interface ResourcesProps {
  resources: ResourceItem[];
  currentUser: User;
  onOpenShareResource: () => void;
  onRequestBorrow: (item: ResourceItem) => void;
}

export function Resources({
  resources,
  currentUser,
  onOpenShareResource,
  onRequestBorrow
}: ResourcesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Filter resources based on filters
  const filteredResources = resources.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.ownerName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory.toLowerCase();
    
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="bg-[#faf9f6] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 text-left">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-stone-900">
              Community Resources
            </h1>
            <p className="text-stone-500 text-sm sm:text-base mt-2">
              Browse tools, textbooks, and items shared by neighbors
            </p>
          </div>
          
          <button
            onClick={onOpenShareResource}
            className="mt-4 md:mt-0 px-6 py-3 bg-[#2c6e49] hover:bg-[#205234] text-white text-sm font-semibold rounded-xl flex items-center justify-center space-x-2 shadow-xs transition-all active:scale-95"
          >
            <Plus className="w-4.5 h-4.5" />
            <span>Share Resource</span>
          </button>
        </div>

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#e2dfd5] shadow-xs mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-stone-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search resources..."
                className="w-full pl-10 pr-4 py-3 bg-[#faf9f6] border border-[#e2dfd5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6e49]/30 focus:border-[#2c6e49]"
              />
            </div>

            {/* Category filter */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-[#faf9f6] border border-[#e2dfd5] rounded-xl text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#2c6e49]/30 focus:border-[#2c6e49] appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundPosition: 'right 12px center', backgroundSize: '16px', backgroundRepeat: 'no-repeat' }}
              >
                <option value="All">All Categories</option>
                <option value="Farm Tools">Farm Tools</option>
                <option value="Textbooks">Textbooks</option>
                <option value="Household Items">Household Items</option>
              </select>
            </div>

            {/* Status filter */}
            <div className="md:col-span-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 bg-[#faf9f6] border border-[#e2dfd5] rounded-xl text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#2c6e49]/30 focus:border-[#2c6e49] appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundPosition: 'right 12px center', backgroundSize: '16px', backgroundRepeat: 'no-repeat' }}
              >
                <option value="All">All Status</option>
                <option value="Available">Available</option>
                <option value="Borrowed">Borrowed</option>
              </select>
            </div>

          </div>
        </div>

        {/* Results grid */}
        {filteredResources.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#e2dfd5] p-16 text-center shadow-xs">
            <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-stone-300" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-800">No resources found</h3>
            <p className="text-stone-400 text-sm mt-1 max-w-sm mx-auto">
              We couldn't find any resources matching your search criteria. Try modifying your filters or list a new item.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((item) => {
              const isOwner = item.ownerId === currentUser.id;
              
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#e2dfd5] hover:border-emerald-200 transition-all duration-300 hover:shadow-lg flex flex-col group text-left"
                >
                  {/* Top banner / Image placeholder */}
                  <div className="relative">
                    <ItemImage code={item.imageCode} category={item.category} className="h-48 w-full" />
                    
                    {/* Status badge */}
                    <span className={`absolute top-4 left-4 inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                      item.status === 'Available'
                        ? 'bg-[#e8f5e9] text-[#2c6e49] border border-emerald-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {item.status}
                    </span>

                    {/* Condition badge */}
                    <span className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-md border border-stone-200 text-xs font-semibold text-stone-700 shadow-xs">
                      {item.condition}
                    </span>
                  </div>

                  {/* Body details */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#2c6e49] px-2.5 py-0.5 rounded-md bg-[#2c6e49]/5 border border-emerald-100/30">
                        {item.category}
                      </span>
                      <span className="text-stone-400 text-xs">•</span>
                      <span className="text-stone-500 text-xs capitalize font-medium">{item.lendingType}</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-stone-900 mt-3 group-hover:text-[#2c6e49] transition-colors line-clamp-1">
                      {item.title}
                    </h3>

                    <p className="text-stone-600 text-sm mt-2.5 line-clamp-3 leading-relaxed flex-1">
                      {item.description}
                    </p>

                    {/* Meta info block */}
                    <div className="mt-5 pt-4 border-t border-stone-100 space-y-2.5 text-xs text-stone-500">
                      {/* Location */}
                      <div className="flex items-center space-x-2 text-stone-600">
                        <MapPin className="w-4 h-4 text-stone-400 flex-shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                      
                      {/* Owner and Date */}
                      <div className="flex items-center justify-between text-stone-500">
                        <div className="flex items-center space-x-1.5">
                          <UserIcon className="w-3.5 h-3.5 text-stone-400" />
                          <span className="font-medium">
                            {isOwner ? 'You (Owner)' : item.ownerName}
                          </span>
                        </div>
                        <span className="text-stone-400">{item.listedDate}</span>
                      </div>

                      {/* Contact Info if borrower needs it */}
                      {!isOwner && (
                        <div className="bg-stone-50 p-2 rounded-lg border border-stone-200/50 flex justify-between items-center text-[11px] text-stone-500 mt-2">
                          <span>Owner Contact:</span>
                          <span className="font-mono text-stone-700">{item.ownerContact}</span>
                        </div>
                      )}
                    </div>

                    {/* Action button */}
                    {item.status === 'Available' ? (
                      <button
                        onClick={() => onRequestBorrow(item)}
                        disabled={isOwner}
                        className={`w-full mt-5 py-2.5 text-center text-xs font-semibold rounded-xl transition-all ${
                          isOwner
                            ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                            : 'bg-[#2c6e49] hover:bg-[#205234] text-white shadow-xs hover:translate-y-[-1px]'
                        }`}
                      >
                        {isOwner ? 'Your Posted Resource' : 'Request to Borrow'}
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full mt-5 py-2.5 text-center text-xs font-semibold rounded-xl bg-stone-100 text-stone-400 cursor-not-allowed"
                      >
                        Currently Borrowed
                      </button>
                    )}

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
