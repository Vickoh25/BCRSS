import React, { useState } from 'react';
import { JobOpportunity, User, JobCategory } from '../types';
import { Search, MapPin, DollarSign, Calendar, Clock, User as UserIcon, Plus, Info, Check } from 'lucide-react';

interface JobsProps {
  jobs: JobOpportunity[];
  currentUser: User;
  onOpenPostOpportunity: () => void;
  onApplyJob: (job: JobOpportunity) => void;
}

export function Jobs({
  jobs,
  currentUser,
  onOpenPostOpportunity,
  onApplyJob
}: JobsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.postedBy.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#faf9f6] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 text-left">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-stone-900">
              Job &amp; Opportunity Board
            </h1>
            <p className="text-stone-500 text-sm sm:text-base mt-2">
              Find work or post opportunities in Baraton neighborhood
            </p>
          </div>

          <button
            onClick={onOpenPostOpportunity}
            className="mt-4 md:mt-0 px-6 py-3 bg-[#2c6e49] hover:bg-[#205234] text-white text-sm font-semibold rounded-xl flex items-center justify-center space-x-2 shadow-xs transition-all active:scale-95"
          >
            <Plus className="w-4.5 h-4.5" />
            <span>Post Opportunity</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#e2dfd5] shadow-xs mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-8 relative">
              <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-stone-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search jobs..."
                className="w-full pl-10 pr-4 py-3 bg-[#faf9f6] border border-[#e2dfd5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6e49]/30 focus:border-[#2c6e49]"
              />
            </div>

            {/* Type/Category Selector */}
            <div className="md:col-span-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-[#faf9f6] border border-[#e2dfd5] rounded-xl text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#2c6e49]/30 focus:border-[#2c6e49] appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundPosition: 'right 12px center', backgroundSize: '16px', backgroundRepeat: 'no-repeat' }}
              >
                <option value="All">All Types</option>
                <option value="Skilled Trade">Skilled Trade</option>
                <option value="Farm Work">Farm Work</option>
                <option value="Tutoring">Tutoring</option>
                <option value="Casual Labor">Casual Labor</option>
              </select>
            </div>

          </div>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#e2dfd5] p-16 text-center shadow-xs">
            <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-stone-300" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-800">No opportunities found</h3>
            <p className="text-stone-400 text-sm mt-1 max-w-sm mx-auto">
              We couldn't find any job posts. Post a new gig or clear filters to begin.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredJobs.map((job) => {
              const isOwner = job.postedById === currentUser.id;
              
              // Define visual categories colors 
              let badgeColor = 'bg-stone-100 text-stone-800 border-stone-200';
              if (job.category === 'Skilled Trade') badgeColor = 'bg-orange-50 text-orange-800 border-orange-100';
              if (job.category === 'Farm Work') badgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-100';
              if (job.category === 'Tutoring') badgeColor = 'bg-indigo-50 text-[#3f51b5] border-indigo-100';
              if (job.category === 'Casual Labor') badgeColor = 'bg-amber-50 text-amber-800 border-amber-100';

              return (
                <div
                  key={job.id}
                  className="bg-white p-7 rounded-2xl border border-[#e2dfd5] hover:border-emerald-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col text-left group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      {/* Category Badge */}
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeColor} mb-3.5`}>
                        {job.category}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-[#2c6e49] transition-colors leading-tight">
                        {job.title}
                      </h3>
                    </div>
                    
                    {/* Status Badge */}
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                      job.status === 'Open'
                        ? 'bg-green-50 text-[#2c6e49] border-emerald-100'
                        : 'bg-stone-50 text-stone-400 border-stone-200'
                    }`}>
                      {job.status}
                    </span>
                  </div>

                  <p className="text-stone-600 text-sm mt-4 line-clamp-4 leading-relaxed flex-1">
                    {job.description}
                  </p>

                  {/* Bottom Metas Grid */}
                  <div className="grid grid-cols-2 gap-y-3.5 gap-x-4 mt-6 pt-4.5 border-t border-stone-100 text-xs text-stone-500">
                    
                    {/* Location */}
                    <div className="flex items-center space-x-2 text-stone-600">
                      <MapPin className="w-4 h-4 text-stone-400 flex-shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </div>

                    {/* Rate */}
                    <div className="flex items-center space-x-2 justify-end">
                      <DollarSign className="w-4 h-4 text-[#2c6e49] flex-shrink-0" />
                      <span className="font-semibold text-stone-900">{job.rate}</span>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-stone-400 flex-shrink-0" />
                      <span>Duration: {job.duration}</span>
                    </div>

                    {/* Poster */}
                    <div className="flex items-center space-x-2 justify-end">
                      <UserIcon className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                      <span className="truncate">By {isOwner ? 'You' : job.postedBy}</span>
                    </div>

                  </div>

                  {/* Direct Contact info display block */}
                  {!isOwner && (
                    <div className="bg-[#faf9f6] p-3 rounded-xl border border-[#e2dfd5]/80 text-[11px] text-stone-500 mt-4.5 flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Info className="w-3.5 h-3.5 text-stone-400" />
                        <span>Direct phone / email:</span>
                      </div>
                      <span className="font-mono text-stone-800 font-semibold">{job.contactInfo}</span>
                    </div>
                  )}

                  {/* Action Button */}
                  {job.status === 'Open' ? (
                    <button
                      onClick={() => onApplyJob(job)}
                      disabled={isOwner}
                      className={`w-full mt-4 py-2.5 text-center text-xs font-semibold rounded-xl transition-all ${
                        isOwner
                          ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                          : 'bg-[#2c6e49] hover:bg-[#205234] text-white shadow-xs hover:translate-y-[-1px]'
                      }`}
                    >
                      {isOwner ? 'Your Posted Gig' : 'Apply / Contact Poster'}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full mt-4 py-2.5 text-center text-xs font-semibold rounded-xl bg-stone-100 text-stone-400 cursor-not-allowed"
                    >
                      Filled / Closed
                    </button>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
