import React from 'react';
import { ResourceItem, JobOpportunity, BorrowRequest, User, Review } from '../types';
import { ItemImage } from './ItemImage';
import { Layers, Briefcase, RefreshCw, Star, ArrowRightLeft, Clock, CheckCircle, XCircle, MapPin, Check, Plus, MessageSquare, Phone } from 'lucide-react';

interface DashboardProps {
  resources: ResourceItem[];
  jobs: JobOpportunity[];
  requests: BorrowRequest[];
  currentUser: User;
  currentSubTab: 'requests' | 'resources' | 'jobs';
  onSetSubTab: (tab: 'requests' | 'resources' | 'jobs') => void;
  onApproveRequest: (requestId: string) => void;
  onDeclineRequest: (requestId: string) => void;
  onMarkReturned: (requestId: string) => void;
  onToggleItemStatus: (itemId: string) => void;
  onToggleJobStatus: (jobId: string) => void;
  onOpenShareResource: () => void;
  onOpenPostOpportunity: () => void;
}

export function Dashboard({
  resources,
  jobs,
  requests,
  currentUser,
  currentSubTab,
  onSetSubTab,
  onApproveRequest,
  onDeclineRequest,
  onMarkReturned,
  onToggleItemStatus,
  onToggleJobStatus,
  onOpenShareResource,
  onOpenPostOpportunity
}: DashboardProps) {
  
  // Calculate metric cards for current active user
  const userResources = resources.filter(r => r.ownerId === currentUser.id);
  const userJobs = jobs.filter(j => j.postedById === currentUser.id);
  
  // Requests received on my items
  const incomingRequests = requests.filter(req => req.ownerId === currentUser.id);
  
  // Requests I made for other items
  const outgoingRequests = requests.filter(req => req.requesterId === currentUser.id);

  // Total incoming pending 
  const pendingIncoming = incomingRequests.filter(r => r.status === 'Pending').length;

  return (
    <div className="bg-[#faf9f6] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        {/* Header content */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-stone-900">
            Dashboard
          </h1>
          <p className="text-stone-500 text-sm sm:text-base mt-2">
            Manage your resources, requests, and activity
          </p>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          
          {/* Card 1: Resources count */}
          <div className="bg-white p-6 rounded-2xl border border-[#e2dfd5] shadow-xs flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl font-bold text-stone-900">{userResources.length}</div>
              <div className="text-[#5c5a54] text-xs font-medium uppercase tracking-wide">My Resources</div>
            </div>
          </div>

          {/* Card 2: Jobs Posted */}
          <div className="bg-white p-6 rounded-2xl border border-[#e2dfd5] shadow-xs flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-[#3f51b5] flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl font-bold text-stone-900">{userJobs.length}</div>
              <div className="text-[#5c5a54] text-xs font-medium uppercase tracking-wide">Jobs Posted</div>
            </div>
          </div>

          {/* Card 3: Incoming Requests total */}
          <div className="bg-white p-6 rounded-2xl border border-[#e2dfd5] shadow-xs flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
              <ArrowRightLeft className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl font-bold text-stone-900">{incomingRequests.length}</div>
              <div className="text-[#5c5a54] text-xs font-medium uppercase tracking-wide">Borrow Offers</div>
            </div>
          </div>

          {/* Card 4: Outgoing Sent */}
          <div className="bg-white p-6 rounded-2xl border border-[#e2dfd5] shadow-xs flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl font-bold text-stone-900">{outgoingRequests.length}</div>
              <div className="text-[#5c5a54] text-xs font-medium uppercase tracking-wide">Requested Sent</div>
            </div>
          </div>

        </div>

        {/* Tabs switcher */}
        <div className="flex space-x-2 border-b border-[#e2dfd5] pb-px mb-8">
          <button
            onClick={() => onSetSubTab('requests')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all transition-colors duration-200 ${
              currentSubTab === 'requests'
                ? 'border-[#2c6e49] text-[#2c6e49]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Borrow Requests 
            {pendingIncoming > 0 && (
              <span className="ml-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white leading-none">
                {pendingIncoming}
              </span>
            )}
          </button>
          
          <button
            onClick={() => onSetSubTab('resources')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all transition-colors duration-200 ${
              currentSubTab === 'resources'
                ? 'border-[#2c6e49] text-[#2c6e49]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            My Resources
          </button>

          <button
            onClick={() => onSetSubTab('jobs')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all transition-colors duration-200 ${
              currentSubTab === 'jobs'
                ? 'border-[#2c6e49] text-[#2c6e49]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            My Jobs
          </button>
        </div>

        {/* Sub-tab content */}
        
        {/* TAB 1: REQUESTS */}
        {currentSubTab === 'requests' && (
          <div className="space-y-10">
            
            {/* Incoming Requests Section */}
            <div className="bg-white rounded-2xl border border-[#e2dfd5] p-6 shadow-xs">
              <h3 className="font-serif text-lg font-bold text-[#1c1c1c] mb-1">
                Incoming Requests (Requests sent to you)
              </h3>
              <p className="text-stone-400 text-xs mb-6">
                Neighbors who want to borrow tools or materials you listed. Approve to let them pick them up.
              </p>

              {incomingRequests.length === 0 ? (
                <div className="py-12 text-center text-stone-400 text-sm font-medium">
                  No borrow requests on your items yet
                </div>
              ) : (
                <div className="divide-y divide-stone-100">
                  {incomingRequests.map((req) => (
                    <div key={req.id} className="py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="space-y-1 text-left">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-stone-800 text-base">{req.itemTitle}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            req.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                            req.status === 'Approved' ? 'bg-emerald-100 text-[#2c6e49]' :
                            req.status === 'Declined' ? 'bg-red-100 text-red-800' :
                            'bg-stone-100 text-stone-600'
                          }`}>
                            {req.status}
                          </span>
                        </div>
                        <div className="text-xs text-stone-500">
                          Requester: <span className="font-semibold text-stone-700">{req.requesterName}</span> ({req.requesterContact})
                        </div>
                        <div className="text-xs text-stone-500">
                          Proposed dates: <span className="font-semibold text-stone-700">{req.startDate}</span> to <span className="font-semibold text-stone-700">{req.endDate}</span>
                        </div>
                        {req.message && (
                          <div className="text-xs text-[#2c6e49] bg-[#2c6e49]/5 p-2 rounded-lg border border-[#2c6e49]/10 font-sans italic mt-1 max-w-xl">
                            &ldquo;{req.message}&rdquo;
                          </div>
                        )}
                      </div>

                      {/* Request Action Buttons */}
                      <div className="flex items-center gap-2">
                        {req.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => {
                                onApproveRequest(req.id);
                                alert(`You successfully Approved borrow request for ${req.itemTitle}!`);
                              }}
                              className="px-3 py-1.5 bg-[#2c6e49] hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center space-x-1"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => {
                                onDeclineRequest(req.id);
                                alert(`Declined request.`);
                              }}
                              className="px-3 py-1.5 border border-[#e2dfd5] text-stone-600 hover:bg-stone-50 rounded-lg text-xs font-semibold"
                            >
                              Decline
                            </button>
                          </>
                        )}
                        {req.status === 'Approved' && (
                          <button
                            onClick={() => {
                              onMarkReturned(req.id);
                              alert("Resource marked as returned safely! Status updated back to Available.");
                            }}
                            className="px-3 py-1.5 bg-[#2c6e49]/10 text-[#2c6e49] hover:bg-[#2c6e49]/15 rounded-lg text-xs font-semibold flex items-center space-x-1"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Mark as Returned</span>
                          </button>
                        )}
                        {req.status === 'Returned' && (
                          <span className="text-xs text-[#2c6e49] font-medium flex items-center space-x-1">
                            <Check className="w-4 h-4" />
                            <span>Lending Cycle Completed</span>
                          </span>
                        )}
                        {req.status === 'Declined' && (
                          <span className="text-xs text-stone-400">Request Declined</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Outgoing Requests Section */}
            <div className="bg-white rounded-2xl border border-[#e2dfd5] p-6 shadow-xs">
              <h3 className="font-serif text-lg font-bold text-[#1c1c1c] mb-1">
                My Outgoing Requests (Requests you sent)
              </h3>
              <p className="text-stone-400 text-xs mb-6">
                Tools and materials you requested from other community members. Show active statuses.
              </p>

              {outgoingRequests.length === 0 ? (
                <div className="py-12 text-center text-stone-400 text-sm font-medium">
                  You haven't requested any resources from your neighbors yet.
                </div>
              ) : (
                <div className="divide-y divide-stone-100">
                  {outgoingRequests.map((req) => (
                    <div key={req.id} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-stone-800 text-base">{req.itemTitle}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            req.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                            req.status === 'Approved' ? 'bg-emerald-100 text-[#2c6e49]' :
                            req.status === 'Declined' ? 'bg-red-100 text-red-800' :
                            'bg-stone-100 text-stone-600'
                          }`}>
                            {req.status}
                          </span>
                        </div>
                        <div className="text-xs text-stone-500 mt-1">
                          Lending Dates: <span className="font-medium text-stone-700">{req.startDate} &mdash; {req.endDate}</span>
                        </div>
                      </div>

                      {req.status === 'Approved' && (
                        <div className="bg-[#e8f5e9] p-3 rounded-xl border border-emerald-100 max-w-sm text-left">
                          <div className="text-xs font-semibold text-[#2c6e49] flex items-center space-x-1 mb-1">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Request Approved!</span>
                          </div>
                          <p className="text-[11px] text-stone-600">
                            Please contact the owner to arrange pickup.
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: MY RESOURCES */}
        {currentSubTab === 'resources' && (
          <div className="bg-white rounded-2xl border border-[#e2dfd5] p-6 shadow-xs">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1c1c1c]">
                  Your Listed Resources
                </h3>
                <p className="text-stone-400 text-xs">
                  Tools, books, and items you made available for sharing with Baraton community
                </p>
              </div>
              <button
                onClick={onOpenShareResource}
                className="px-4 py-2 bg-[#2c6e49] hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>List an Item</span>
              </button>
            </div>

            {userResources.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-stone-400 text-sm font-medium">You haven't listed any resources yet.</p>
                <button
                  onClick={onOpenShareResource}
                  className="mt-4 px-4 py-2 text-[#2c6e49] border border-dashed border-[#2c6e49] hover:bg-[#2c6e49]/5 rounded-xl text-xs font-semibold"
                >
                  List your first tool or textbook
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userResources.map((item) => (
                  <div key={item.id} className="border border-stone-200 rounded-xl overflow-hidden shadow-xs flex flex-col">
                    <ItemImage code={item.imageCode} category={item.category} className="h-32 w-full" />
                    <div className="p-4 flex-1 flex flex-col text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase text-[#2c6e49]">{item.category}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          item.status === 'Available' ? 'bg-[#e8f5e9] text-[#2c6e49]' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-stone-900 text-base mt-2 truncate">{item.title}</h4>
                      <p className="text-xs text-stone-500 line-clamp-2 mt-1 flex-1">{item.description}</p>
                      
                      <div className="mt-4 pt-3 border-t border-stone-150 flex items-center justify-between">
                        {/* Toggle Availability Toggle */}
                        <button
                          onClick={() => onToggleItemStatus(item.id)}
                          className="px-3 py-1.5 bg-[#e2dfd5]/50 hover:bg-[#e2dfd5]/80 text-stone-700 rounded-lg text-[11px] font-semibold"
                        >
                          Toggle Status
                        </button>
                        
                        <span className="text-[10px] text-stone-400">Listed: {item.listedDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MY JOBS */}
        {currentSubTab === 'jobs' && (
          <div className="bg-white rounded-2xl border border-[#e2dfd5] p-6 shadow-xs">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1c1c1c]">
                  Your Posted Opportunities
                </h3>
                <p className="text-stone-400 text-xs">
                  Casual labor, farm work, and tutoring gigs you advertised to helpers
                </p>
              </div>
              <button
                onClick={onOpenPostOpportunity}
                className="px-4 py-2 bg-[#2c6e49] hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Post a Job</span>
              </button>
            </div>

            {userJobs.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-stone-400 text-sm font-medium">You haven't posted any job opportunities yet.</p>
                <button
                  onClick={onOpenPostOpportunity}
                  className="mt-4 px-4 py-2 text-[#2c6e49] border border-dashed border-[#2c6e49] hover:bg-[#2c6e49]/5 rounded-xl text-xs font-semibold"
                >
                  Create your first job post
                </button>
              </div>
            ) : (
              <div className="divide-y divide-stone-150">
                {userJobs.map((job) => (
                  <div key={job.id} className="py-4.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-left">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-stone-800 text-base">{job.title}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          job.status === 'Open' ? 'bg-green-100 text-[#2c6e49]' : 'bg-stone-100 text-stone-500'
                        }`}>
                          {job.status}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1 max-w-xl">{job.description}</p>
                      <div className="text-xs text-stone-400 mt-2 flex items-center space-x-4">
                        <span>Rate: <span className="font-semibold text-stone-700">{job.rate}</span></span>
                        <span>•</span>
                        <span>Location: <span className="font-semibold text-stone-700">{job.location}</span></span>
                      </div>
                    </div>

                    {/* Toggle status */}
                    <div>
                      <button
                        onClick={() => {
                          onToggleJobStatus(job.id);
                          alert(`Job status updated successfully to ${job.status === 'Open' ? 'Filled' : 'Open'}`);
                        }}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold ${
                          job.status === 'Open'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-[#2c6e49]'
                        }`}
                      >
                        {job.status === 'Open' ? 'Mark as Filled' : 'Reopen Post'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
