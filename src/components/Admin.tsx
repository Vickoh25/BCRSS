import React, { useState } from 'react';
import { ResourceItem, JobOpportunity, BorrowRequest, User, Review } from '../types';
import { Trash2, Shield, Settings, Users, Star, Clipboard, AlertCircle, TrendingUp, Search, Calendar, ChevronDown, Check, RefreshCw } from 'lucide-react';

interface AdminProps {
  resources: ResourceItem[];
  jobs: JobOpportunity[];
  requests: BorrowRequest[];
  users: User[];
  reviews: Review[];
  onDeleteResource: (itemId: string) => void;
  onDeleteJob: (jobId: string) => void;
  onDeleteRequest: (requestId: string) => void;
  onToggleItemStatus: (itemId: string) => void;
  onToggleJobStatus: (jobId: string) => void;
}

export function Admin({
  resources,
  jobs,
  requests,
  users,
  reviews,
  onDeleteResource,
  onDeleteJob,
  onDeleteRequest,
  onToggleItemStatus,
  onToggleJobStatus
}: AdminProps) {
  const [activeTab, setActiveTab] = useState<'resources' | 'requests' | 'jobs' | 'users' | 'reviews'>('resources');
  const [adminSearch, setAdminSearch] = useState('');

  // Calculations for KPI Metrics cards
  const totalResources = resources.length;
  const availableResources = resources.filter(r => r.status === 'Available').length;
  
  const totalRequests = requests.length;
  const pendingRequests = requests.filter(r => r.status === 'Pending').length;

  const totalJobs = jobs.length;
  const openJobs = jobs.filter(j => j.status === 'Open').length;

  const totalReviews = reviews.length;

  // Render Table Filter
  const filteredResources = resources.filter(res => 
    res.title.toLowerCase().includes(adminSearch.toLowerCase()) ||
    res.ownerName.toLowerCase().includes(adminSearch.toLowerCase()) ||
    res.category.toLowerCase().includes(adminSearch.toLowerCase())
  );

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(adminSearch.toLowerCase()) ||
    job.postedBy.toLowerCase().includes(adminSearch.toLowerCase()) ||
    job.category.toLowerCase().includes(adminSearch.toLowerCase())
  );

  const filteredRequests = requests.filter(req =>
    req.itemTitle.toLowerCase().includes(adminSearch.toLowerCase()) ||
    req.requesterName.toLowerCase().includes(adminSearch.toLowerCase())
  );

  return (
    <div className="bg-[#faf9f6] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        {/* Title details */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#2c6e49] flex items-center justify-center">
            <Shield className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-stone-900">
              Admin Dashboard
            </h1>
            <p className="text-stone-500 text-sm">
              Baraton CRSS &mdash; Platform Management
            </p>
          </div>
        </div>

        {/* METRIC KPI TILES */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          {/* Card: Resources */}
          <div className="bg-white p-6 rounded-2xl border border-[#e2dfd5] shadow-xs flex justify-between items-center">
            <div>
              <span className="text-stone-400 text-xs font-semibold uppercase tracking-wider block mb-1">Total Resources</span>
              <div className="text-3xl font-bold text-stone-900">{totalResources}</div>
              <span className="text-stone-500 text-xs mt-1 block">{availableResources} available</span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-stone-50 text-stone-400 flex items-center justify-center border border-stone-200">
              <Clipboard className="w-5 h-5" />
            </div>
          </div>

          {/* Card: Borrow Requests */}
          <div className="bg-white p-6 rounded-2xl border border-[#e2dfd5] shadow-xs flex justify-between items-center">
            <div>
              <span className="text-stone-400 text-xs font-semibold uppercase tracking-wider block mb-1">Borrow Requests</span>
              <div className="text-3xl font-bold text-stone-900">{totalRequests}</div>
              <span className="text-stone-500 text-xs mt-1 block">{pendingRequests} pending</span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#2c6e49]/5 text-[#2c6e49] flex items-center justify-center border border-emerald-100">
              <RefreshCw className="w-5 h-5 animate-spin-slow" />
            </div>
          </div>

          {/* Card: Jobs Posted */}
          <div className="bg-white p-6 rounded-2xl border border-[#e2dfd5] shadow-xs flex justify-between items-center">
            <div>
              <span className="text-stone-400 text-xs font-semibold uppercase tracking-wider block mb-1">Jobs Posted</span>
              <div className="text-3xl font-bold text-stone-900">{totalJobs}</div>
              <span className="text-stone-500 text-xs mt-1 block">{openJobs} open</span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100">
              <Users className="w-5 h-5" />
            </div>
          </div>

          {/* Card: Reviews */}
          <div className="bg-white p-6 rounded-2xl border border-[#e2dfd5] shadow-xs flex justify-between items-center">
            <div>
              <span className="text-stone-400 text-xs font-semibold uppercase tracking-wider block mb-1">Reviews</span>
              <div className="text-3xl font-bold text-stone-900">{totalReviews}</div>
              <span className="text-stone-500 text-xs mt-1 block">{totalReviews === 0 ? 'No reviews yet' : 'Trust score: 4.8★'}</span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center border border-amber-100">
              <Star className="w-5 h-5 text-amber-400 fill-current" />
            </div>
          </div>

        </div>

        {/* SUB-TABS SELECTORS */}
        <div className="flex flex-wrap gap-1 border-b border-[#e2dfd5] pb-px mb-8">
          {[
            { id: 'resources', label: 'Resources', count: resources.length },
            { id: 'requests', label: 'Borrow Requests', count: requests.length },
            { id: 'jobs', label: 'Jobs', count: jobs.length },
            { id: 'users', label: 'Users', count: users.length },
            { id: 'reviews', label: 'Reviews', count: reviews.length }
          ].map((tab) => {
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setAdminSearch('');
                }}
                className={`px-4.5 py-3 text-xs sm:text-sm font-semibold rounded-t-xl transition-all ${
                  isTabActive
                    ? 'bg-white border-t border-l border-r border-[#e2dfd5] text-[#2c6e49] font-bold shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <span>{tab.label}</span>
                <span className="ml-1.5 px-2 py-0.5 rounded-full text-[10px] bg-stone-100 text-stone-600 font-bold border border-stone-200">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* SEARCH BOX FOR CURRENT LIST */}
        <div className="relative mb-6">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={adminSearch}
            onChange={(e) => setAdminSearch(e.target.value)}
            placeholder={`Search ${activeTab}...`}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e2dfd5] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#2c6e49]/30 focus:border-[#2c6e49]"
          />
        </div>

        {/* RENDER ACTIVE TAB TABLE */}
        
        {/* RESOURCES TAB */}
        {activeTab === 'resources' && (
          <div className="bg-white rounded-2xl border border-[#e2dfd5] overflow-x-auto shadow-xs">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-stone-50 border-b border-[#e2dfd5]">
                  <th className="px-6 py-4.5 text-xs font-semibold text-stone-600 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4.5 text-xs font-semibold text-stone-600 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4.5 text-xs font-semibold text-stone-600 uppercase tracking-wider">Owner</th>
                  <th className="px-6 py-4.5 text-xs font-semibold text-stone-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4.5 text-xs font-semibold text-stone-600 uppercase tracking-wider">Listed</th>
                  <th className="px-6 py-4.5 text-xs font-semibold text-stone-600 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-sm">
                {filteredResources.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-stone-400">No resources found</td>
                  </tr>
                ) : (
                  filteredResources.map((item) => (
                    <tr key={item.id} className="hover:bg-stone-50/50">
                      <td className="px-6 py-4 font-semibold text-stone-800">{item.title}</td>
                      <td className="px-6 py-4">
                        <span className="text-[11px] font-semibold text-[#2c6e49] uppercase bg-[#2c6e49]/5 px-2 py-0.5 rounded border border-emerald-100/30">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-stone-600">{item.ownerName}</td>
                      <td className="px-6 py-4">
                        {/* Selector or Status dropdown simulation */}
                        <div className="relative inline-block">
                          <select
                            value={item.status}
                            onChange={() => {
                              onToggleItemStatus(item.id);
                              alert(`Status updated successfully to ${item.status === 'Available' ? 'Borrowed' : 'Available'}`);
                            }}
                            className={`px-3 py-1 bg-stone-50 border border-stone-200 rounded-md text-xs font-medium cursor-pointer ${
                              item.status === 'Available' ? 'text-[#2c6e49]' : 'text-amber-800'
                            }`}
                          >
                            <option value="Available">Available</option>
                            <option value="Borrowed">Borrowed</option>
                          </select>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-stone-500 text-xs">Jun 6, 2026</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete ${item.title}?`)) {
                              onDeleteResource(item.id);
                            }
                          }}
                          className="p-1 px-2.5 text-red-600 hover:bg-red-50 rounded border border-transparent hover:border-red-100 transition-colors"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-4 h-4 inline-block" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* BORROW REQUESTS TAB */}
        {activeTab === 'requests' && (
          <div className="bg-white rounded-2xl border border-[#e2dfd5] overflow-x-auto shadow-xs">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-stone-50 border-b border-[#e2dfd5]">
                  <th className="px-6 py-4.5 text-xs font-semibold text-stone-600 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-4.5 text-xs font-semibold text-stone-600 uppercase tracking-wider">Requester</th>
                  <th className="px-6 py-4.5 text-xs font-semibold text-stone-600 uppercase tracking-wider">Dates Proposed</th>
                  <th className="px-6 py-4.5 text-xs font-semibold text-stone-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4.5 text-xs font-semibold text-stone-600 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-sm">
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-stone-400">No requests found</td>
                  </tr>
                ) : (
                  filteredRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-stone-50/50">
                      <td className="px-6 py-4 font-semibold text-stone-800">{req.itemTitle}</td>
                      <td className="px-6 py-4 text-stone-600">
                        <div>{req.requesterName}</div>
                        <div className="text-[11px] text-stone-400">{req.requesterContact}</div>
                      </td>
                      <td className="px-6 py-4 text-xs text-stone-500">
                        {req.startDate} to {req.endDate}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold ${
                          req.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                          req.status === 'Approved' ? 'bg-emerald-100 text-[#2c6e49]' :
                          req.status === 'Declined' ? 'bg-red-100 text-red-800' :
                          'bg-stone-150 text-stone-600'
                        }`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => {
                            if (confirm("Delete this request record?")) {
                              onDeleteRequest(req.id);
                            }
                          }}
                          className="p-1 px-2.5 text-red-600 hover:bg-red-50 rounded hover:border-red-100 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 inline-block" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* JOBS TAB */}
        {activeTab === 'jobs' && (
          <div className="bg-white rounded-2xl border border-[#e2dfd5] overflow-x-auto shadow-xs">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-stone-50 border-b border-[#e2dfd5]">
                  <th className="px-6 py-4.5 text-xs font-semibold text-stone-600 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4.5 text-xs font-semibold text-stone-600 uppercase tracking-wider">Type/Category</th>
                  <th className="px-6 py-4.5 text-xs font-semibold text-stone-600 uppercase tracking-wider">Posted By</th>
                  <th className="px-6 py-4.5 text-xs font-semibold text-stone-600 uppercase tracking-wider">Rate info</th>
                  <th className="px-6 py-4.5 text-xs font-semibold text-stone-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4.5 text-xs font-semibold text-stone-600 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-sm">
                {filteredJobs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-stone-400">No jobs listed</td>
                  </tr>
                ) : (
                  filteredJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-stone-50/50">
                      <td className="px-6 py-4 font-semibold text-stone-800">{job.title}</td>
                      <td className="px-6 py-4">
                        <span className="text-[11px] font-semibold text-amber-800 uppercase bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                          {job.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-stone-600">{job.postedBy}</td>
                      <td className="px-6 py-4 text-stone-600 font-medium text-xs">{job.rate}</td>
                      <td className="px-6 py-4">
                        <select
                          value={job.status}
                          onChange={() => onToggleJobStatus(job.id)}
                          className={`px-2 py-1 bg-stone-50 border border-stone-200 rounded text-xs font-semibold ${
                            job.status === 'Open' ? 'text-[#2c6e49]' : 'text-stone-400'
                          }`}
                        >
                          <option value="Open">Open</option>
                          <option value="Filled">Filled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => {
                            if (confirm(`Remove job listing: ${job.title}?`)) {
                              onDeleteJob(job.id);
                            }
                          }}
                          className="text-red-500 hover:bg-red-50 p-2 rounded"
                        >
                          <Trash2 className="w-4 h-4 inline-block" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl border border-[#e2dfd5] overflow-x-auto shadow-xs">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-stone-50 border-b border-[#e2dfd5]">
                  <th className="px-6 py-4.5 text-xs font-semibold text-stone-600 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4.5 text-xs font-semibold text-stone-600 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4.5 text-xs font-semibold text-stone-600 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4.5 text-xs font-semibold text-stone-600 uppercase tracking-wider">Contact Phone</th>
                  <th className="px-6 py-4.5 text-xs font-semibold text-stone-600 uppercase tracking-wider">System Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-sm">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-stone-50/50">
                    <td className="px-6 py-4 font-bold text-stone-800 flex items-center space-x-2">
                      <div className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${user.avatarColor}`}>
                        {user.name[0]}
                      </div>
                      <span>{user.name}</span>
                    </td>
                    <td className="px-6 py-4 text-stone-600 font-mono text-xs">{user.email}</td>
                    <td className="px-6 py-4 text-stone-600">{user.location}</td>
                    <td className="px-6 py-4 text-stone-500 text-xs font-mono">{user.contact}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 'bg-stone-100 text-stone-600'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* REVIEWS LISTING TAB */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-2xl border border-[#e2dfd5] p-6 shadow-xs max-w-3xl">
            <h3 className="font-serif text-lg font-bold text-[#1c1c1c] mb-6">Peer Exchange Ratings</h3>
            {reviews.length === 0 ? (
              <div className="py-12 text-center text-stone-400">No reviews have been left yet. Make reviews on completed borrowings!</div>
            ) : (
              <div className="space-y-6">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-[#faf9f6] border border-stone-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-stone-800 text-sm">{rev.reviewerName}</span>
                        <span className="text-[10px] text-stone-400 capitalize bg-stone-100 border border-stone-200/50 rounded-sm px-1.5 py-px">
                          {rev.reviewerRole}
                        </span>
                      </div>
                      <span className="text-xs text-stone-400">{rev.date}</span>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center space-x-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rev.rating
                              ? 'text-amber-400 fill-current'
                              : 'text-stone-200'
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-stone-600 text-xs italic font-serif leading-relaxed">
                      &ldquo;{rev.comment}&rdquo;
                    </p>

                    <div className="text-[10px] text-stone-400">
                      User reviewed: <span className="font-semibold text-stone-600">{rev.targetName}</span>
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
