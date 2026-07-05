import React from 'react';
import { ResourceItem, JobOpportunity, User } from '../types';
import { ItemImage } from './ItemImage';
import { ArrowRight, Search, PlusCircle, Wrench, BookOpen, Briefcase, Shovel, Heart, CheckCircle, ShieldAlert, Award, AlignLeft, Calendar, User as UserIcon, MapPin, DollarSign, Clock, MessageSquare } from 'lucide-react';

interface HomeProps {
  resources: ResourceItem[];
  jobs: JobOpportunity[];
  currentUser: User;
  onBrowseResources: () => void;
  onBrowseJobs: () => void;
  onOpenShareResource: () => void;
  onOpenPostOpportunity: () => void;
  onRequestBorrow: (item: ResourceItem) => void;
  onApplyJob: (job: JobOpportunity) => void;
}

export function Home({
  resources,
  jobs,
  currentUser,
  onBrowseResources,
  onBrowseJobs,
  onOpenShareResource,
  onOpenPostOpportunity,
  onRequestBorrow,
  onApplyJob
}: HomeProps) {
  // Show first 4 items as "Latest"
  const latestResources = resources.slice(0, 4);
  const openOpportunities = jobs.filter(j => j.status === 'Open').slice(0, 4);

  return (
    <div className="bg-[#faf9f6] text-[#2a2925] font-sans selection:bg-[#2c6e49] selection:text-white">
      
      {/* 1. Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-12 pb-20 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-8 text-left">
            {/* Community pill badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#2c6e49]/10 text-[#2c6e49] font-medium text-xs sm:text-sm animate-fade-in">
              <Heart className="w-4 h-4 fill-current text-[#2c6e49]" />
              <span className="font-semibold uppercase tracking-wider text-[11px] sm:text-xs">Baraton Community</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-stone-900 leading-[1.08] tracking-tight">
              Share Resources, <br />
              <span className="text-[#2c6e49] italic font-serif">Strengthen Community</span>
            </h1>

            <p className="text-stone-600 text-lg sm:text-xl max-w-2xl leading-relaxed font-normal">
              A platform for the Baraton community to share farm tools, textbooks, 
              and discover opportunities &mdash; right in your neighborhood. Empower local farms, households, and students.
            </p>

            {/* Quick buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={onBrowseResources}
                className="px-8 py-4 bg-[#2c6e49] hover:bg-[#205234] text-white font-semibold rounded-2xl flex items-center justify-center space-x-2 shadow-md transition-all duration-200 hover:translate-y-[-2px] active:translate-y-0"
              >
                <span>Browse Resources</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={onOpenShareResource}
                className="px-8 py-4 bg-white border-2 border-[#e2dfd5] hover:border-stone-400 text-stone-700 font-semibold rounded-2xl flex items-center justify-center space-x-2 transition-all duration-200 hover:bg-stone-50"
              >
                <span>Share Something</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:block">
            {/* Visual stacked bento cards as background illustration */}
            <div className="relative h-96 w-full flex items-center justify-center">
              <div className="absolute w-72 h-72 bg-gradient-to-tr from-[#2c6e49]/20 to-[#a3b18a]/10 rounded-full blur-3xl"></div>
              
              <div className="absolute transform -rotate-6 translate-x-[-30px] translate-y-[-20px] w-64 bg-white p-5 rounded-2xl shadow-lg border border-[#e2dfd5] transition-transform hover:rotate-0 duration-300">
                <ItemImage code="sprayer" category="farm tools" className="h-32 rounded-xl mb-3" />
                <div className="text-xs font-semibold uppercase text-[#2c6e49]">Farm Equipment</div>
                <div className="font-bold text-sm text-stone-800 mt-1">Knapsack Sprayer</div>
              </div>

              <div className="absolute transform rotate-6 translate-x-[40px] translate-y-[50px] w-64 bg-white p-5 rounded-2xl shadow-xl border border-emerald-100 transition-transform hover:rotate-0 duration-300 z-10">
                <ItemImage code="biology" category="textbooks" className="h-32 rounded-xl mb-3" />
                <div className="text-xs font-semibold uppercase text-[#8c6239]">Textbooks</div>
                <div className="font-bold text-sm text-stone-800 mt-1">Biology 101 - Campbell</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Categorization summary cards */}
      <section className="py-16 bg-[#faf9f6] border-t border-[#e2dfd5] border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div 
              onClick={onBrowseResources}
              className="bg-white p-8 rounded-2xl shadow-xs border border-[#e2dfd5] hover:border-[#2c6e49] hover:shadow-md cursor-pointer transition-all group group-hover:scale-105"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-6">
                <Shovel className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-3 group-hover:text-[#2c6e49] transition-colors">
                Farm Tools &amp; Equipment
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Borrow ploughs, sprayers, wheelbarrows, and more from your neighbors during off-seasons. Reduce costs and increase yields.
              </p>
            </div>

            {/* Card 2 */}
            <div 
              onClick={onBrowseResources}
              className="bg-white p-8 rounded-2xl shadow-xs border border-[#e2dfd5] hover:border-[#2c6e49] hover:shadow-md cursor-pointer transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-3 group-hover:text-[#2c6e49] transition-colors">
                Textbooks &amp; Materials
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Find academic books shared by fellow students. Lend or donate standard reading books or Course texts you no longer need.
              </p>
            </div>

            {/* Card 3 */}
            <div 
              onClick={onBrowseJobs}
              className="bg-white p-8 rounded-2xl shadow-xs border border-[#e2dfd5] hover:border-[#2c6e49] hover:shadow-md cursor-pointer transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-6">
                <Briefcase className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-3 group-hover:text-[#2c6e49] transition-colors">
                Jobs &amp; Opportunities
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Discover local casual labor, farm work gigs, student tutoring, and skills-sharing posts directly within the Baraton area.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. How It Works */}
      <section className="py-20 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mb-3">
            How It Works
          </h2>
          <p className="text-stone-500 text-base max-w-md mx-auto mb-16">
            Simple steps to share and borrow within the community safely and friction-free
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#2c6e49] text-white flex items-center justify-center font-bold text-lg shadow-md mb-6 relative z-10">
                1
              </div>
              <h4 className="font-serif font-bold text-lg text-stone-900 mb-2">List a Resource</h4>
              <p className="text-stone-500 text-xs sm:text-sm max-w-[200px] leading-relaxed">
                Post your tools, books, or items with photos, condition level, and availability details
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#2c6e49] text-white flex items-center justify-center font-bold text-lg shadow-md mb-6 relative z-10">
                2
              </div>
              <h4 className="font-serif font-bold text-lg text-stone-900 mb-2">Browse &amp; Discover</h4>
              <p className="text-stone-500 text-xs sm:text-sm max-w-[200px] leading-relaxed">
                Search available tools, text resources, or casual jobs listed in Nandi County
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#2c6e49] text-white flex items-center justify-center font-bold text-lg shadow-md mb-6 relative z-10">
                3
              </div>
              <h4 className="font-serif font-bold text-lg text-stone-900 mb-2">Request to Borrow</h4>
              <p className="text-stone-500 text-xs sm:text-sm max-w-[200px] leading-relaxed">
                Send a quick booking request to the owner with your specified lending timeline
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#2c6e49] text-white flex items-center justify-center font-bold text-lg shadow-md mb-6 relative z-10">
                4
              </div>
              <h4 className="font-serif font-bold text-lg text-stone-900 mb-2">Rate &amp; Review</h4>
              <p className="text-stone-500 text-xs sm:text-sm max-w-[200px] leading-relaxed">
                Build community trust by providing fair ratings of your experience and the tools
              </p>
            </div>

            {/* Horizontal timeline connector lines (Desktop only) */}
            <div className="hidden lg:block absolute left-[15%] right-[15%] top-6 h-0.5 bg-stone-200 -z-0"></div>

          </div>
        </div>
      </section>

      {/* 4. Latest Resources */}
      <section className="py-20 border-t border-[#e2dfd5] bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex justify-between items-end mb-12">
            <div className="text-left">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
                Latest Resources
              </h2>
              <p className="text-stone-500 text-sm mt-1">Recently shared by community members</p>
            </div>
            <button
              onClick={onBrowseResources}
              className="group flex items-center space-x-1 text-[#2c6e49] font-semibold text-sm hover:underline"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestResources.map((item) => {
              const isOwner = item.ownerId === currentUser.id;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#e2dfd5] hover:border-emerald-200 transition-all duration-300 hover:shadow-lg flex flex-col group"
                >
                  {/* Image section with category absolute elements */}
                  <div className="relative">
                    <ItemImage code={item.imageCode} category={item.category} className="h-44 w-full" />
                    
                    {/* Status badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                        item.status === 'Available'
                          ? 'bg-[#e8f5e9] text-[#2c6e49] border border-emerald-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    {/* Condition badge */}
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-md border border-stone-200 text-xs font-medium text-stone-700">
                      Condition: {item.condition}
                    </div>
                  </div>

                  {/* Body details */}
                  <div className="p-5 flex-1 flex flex-col text-left">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#2c6e49] px-2 py-0.5 rounded-md bg-[#2c6e49]/5">
                        {item.category}
                      </span>
                      <span className="text-stone-400 text-xs">•</span>
                      <span className="text-stone-500 text-xs capitalize">{item.lendingType}</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-stone-900 mt-2.5 truncate group-hover:text-[#2c6e49] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-stone-500 mt-2 line-clamp-2 leading-relaxed flex-1">
                      {item.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-stone-100 space-y-2">
                      {/* Location */}
                      <div className="flex items-center space-x-1.5 text-xs text-stone-600">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                      
                      {/* Owner */}
                      <div className="flex items-center justify-between text-xs text-stone-500">
                        <span className="truncate">Posted by {isOwner ? 'You' : item.ownerName}</span>
                        <span>{item.listedDate}</span>
                      </div>
                    </div>

                    {/* Button actions */}
                    {item.status === 'Available' ? (
                      <button
                        onClick={() => onRequestBorrow(item)}
                        disabled={isOwner}
                        className={`w-full mt-4 py-2 text-center text-xs font-semibold rounded-lg transition-colors ${
                          isOwner 
                            ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                            : 'bg-[#2c6e49] hover:bg-[#205234] text-white shadow-xs'
                        }`}
                      >
                        {isOwner ? 'Your Resource' : 'Request to Borrow'}
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full mt-4 py-2 text-center text-xs font-semibold rounded-lg bg-stone-100 text-stone-400 cursor-not-allowed"
                      >
                        Currently Borrowed
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. Gigs Board Brief */}
      <section className="py-20 bg-white border-t border-[#e2dfd5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex justify-between items-end mb-12">
            <div className="text-left">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
                Open Opportunities
              </h2>
              <p className="text-stone-500 text-sm mt-1">Jobs &amp; skill-sharing in Baraton neighborhood</p>
            </div>
            <button
              onClick={onBrowseJobs}
              className="group flex items-center space-x-1 text-[#2c6e49] font-semibold text-sm hover:underline"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {openOpportunities.map((job) => {
              const isOwner = job.postedById === currentUser.id;
              return (
                <div
                  key={job.id}
                  className="bg-[#faf9f6] p-6 rounded-2xl border border-[#e2dfd5] hover:border-emerald-200 transition-all shadow-xs hover:shadow-md flex flex-col"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-100 mb-3">
                        {job.category}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-[#1c1c1c]">
                        {job.title}
                      </h3>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-50 text-emerald-800 border border-green-100">
                      {job.status}
                    </span>
                  </div>

                  <p className="text-stone-600 text-sm mt-3 line-clamp-3 leading-relaxed flex-1">
                    {job.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-stone-200/50 text-xs text-stone-500">
                    <div className="flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 justify-end">
                      <DollarSign className="w-3.5 h-3.5 text-[#2c6e49]" />
                      <span className="font-semibold text-stone-800">{job.rate}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>Est. Duration: {job.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 justify-end text-right">
                      <UserIcon className="w-3.5 h-3.5 text-stone-400" />
                      <span className="truncate">Posted by {isOwner ? 'You' : job.postedBy}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onApplyJob(job)}
                    disabled={isOwner}
                    className={`w-full mt-5 py-2.5 text-center text-xs font-semibold rounded-xl transition-all ${
                      isOwner
                        ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                        : 'bg-[#2c6e49] hover:bg-[#205234] text-white shadow-xs'
                    }`}
                  >
                    {isOwner ? 'Your Posted Job' : 'Respond / Apply'}
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. Built on Trust */}
      <section className="py-20 bg-[#faf9f6] border-t border-[#e2dfd5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            Built on Trust
          </h2>
          <p className="text-stone-500 text-base max-w-lg mx-auto mb-12">
            Our rating system and community moderation ensure a safe and reliable sharing experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-6 bg-white rounded-2xl border border-[#e2dfd5]">
              <div className="w-12 h-12 rounded-full bg-[#2c6e49]/10 text-[#2c6e49] flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-800 mb-2">Community Verified</h3>
              <p className="text-stone-500 text-xs text-center max-w-xs leading-relaxed">
                Connect and exchange within a highly trusted local demographic around the university campus
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-2xl border border-[#e2dfd5]">
              <div className="w-12 h-12 rounded-full bg-[#2c6e49]/10 text-[#2c6e49] flex items-center justify-center mb-4">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-800 mb-2">Moderated Platform</h3>
              <p className="text-stone-500 text-xs text-center max-w-xs leading-relaxed">
                System and designated managers can audit posts, approve borrows, remove stale listings, or flag issues
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-2xl border border-[#e2dfd5]">
              <div className="w-12 h-12 rounded-full bg-[#2c6e49]/10 text-[#2c6e49] flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-800 mb-2">Peer Reviews</h3>
              <p className="text-stone-500 text-xs text-center max-w-xs leading-relaxed">
                Direct feedback loops and star-ratings given after each completed transaction enforce responsibility
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-stone-900 text-stone-300 py-16 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#2c6e49] text-white flex items-center justify-center font-bold">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-white">
              Baraton Community Resource Sharing System
            </span>
          </div>
          
          <p className="text-stone-400 text-sm max-w-xl mx-auto leading-relaxed">
            Empowering the Baraton community through shared resources &amp; opportunities. Built securely for immediate neighborhood solidarity.
          </p>

          <div className="text-xs text-stone-500 space-y-1">
            <div>University of Eastern Africa, Baraton &mdash; School of Business</div>
            <div>Department of Information Systems and Computing &bull; Nandi County, Kenya</div>
            <div className="mt-4 pt-4 border-t border-stone-800 text-stone-600">
              &copy; 2026 BCRSS. All rights reserved &bull; Victor Okello.
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
