import React, { useState } from 'react';
import { User, JobCategory } from '../types';
import { X, Check } from 'lucide-react';

interface PostOpportunityModalProps {
  currentUser: User;
  onClose: () => void;
  onSave: (newJob: {
    title: string;
    category: JobCategory;
    description: string;
    location: string;
    rate: string;
    duration: string;
    contactInfo: string;
  }) => void;
}

export function PostOpportunityModal({
  currentUser,
  onClose,
  onSave
}: PostOpportunityModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<JobCategory>('Farm Work');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [rate, setRate] = useState('');
  const [duration, setDuration] = useState('');
  const [contactInfo, setContactInfo] = useState(currentUser.contact);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !location || !rate || !duration || !contactInfo) {
      alert("Please fill in all required fields.");
      return;
    }

    onSave({
      title,
      category,
      description,
      location,
      rate,
      duration,
      contactInfo
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      ></div>

      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="relative transform overflow-hidden rounded-3xl bg-[#faf9f6] text-left shadow-2xl transition-all w-full max-w-xl border border-[#e2dfd5]">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4.5 border-b border-[#e2dfd5] bg-stone-100/40">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Post an Opportunity
            </h3>
            <button 
              onClick={onClose}
              className="p-1 rounded-full text-stone-400 hover:bg-stone-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* Title */}
            <div className="space-y-1 text-left">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                Job or Opportunity Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Farm Hand for Harvesting, Chem Tutor, Tea Helper"
                className="w-full px-4 py-3 bg-white border border-[#e2dfd5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6e49]/20"
              />
            </div>

            {/* Category */}
            <div className="space-y-1 text-left">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                Type / Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as JobCategory)}
                className="w-full px-4 py-3 bg-white border border-[#e2dfd5] rounded-xl text-sm focus:outline-none cursor-pointer"
              >
                <option value="Skilled Trade">Skilled Trade</option>
                <option value="Farm Work">Farm Work</option>
                <option value="Tutoring">Tutoring</option>
                <option value="Casual Labor">Casual Labor</option>
              </select>
            </div>

            {/* Description */}
            <div className="space-y-1 text-left">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                Description &amp; Requirements *
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide details about the work, what skills are needed, working hours, and expectations..."
                className="w-full px-4 py-3 bg-white border border-[#e2dfd5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6e49]/20"
              ></textarea>
            </div>

            {/* Location & Rate details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Near Library, Upper Baraton"
                  className="w-full px-4 py-3 bg-white border border-[#e2dfd5] rounded-xl text-sm focus:outline-none"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Payment / Rate *
                </label>
                <input
                  type="text"
                  required
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="e.g. KSh 1,500/day, KSh 300/hr"
                  className="w-full px-4 py-3 bg-white border border-[#e2dfd5] rounded-xl text-sm focus:outline-none"
                />
              </div>
            </div>

            {/* Duration & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Estimated Duration *
                </label>
                <input
                  type="text"
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 2 days, 1 week, Ongoing"
                  className="w-full px-4 py-3 bg-white border border-[#e2dfd5] rounded-xl text-sm focus:outline-none"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Contact Info *
                </label>
                <input
                  type="text"
                  required
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="w-full px-4 py-3 bg-[#f5f4ef] border border-[#e2dfd5] rounded-xl text-sm font-semibold text-stone-700"
                />
              </div>
            </div>

            {/* Actions Footer */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[#e2dfd5]">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#2c6e49] hover:bg-[#205234] text-white font-semibold rounded-xl text-xs transition-colors shadow-xs"
              >
                Post Gigs Opportunity
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}
