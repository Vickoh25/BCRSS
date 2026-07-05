import React, { useState } from 'react';
import { JobOpportunity, User } from '../types';
import { X, Send, Heart, Phone } from 'lucide-react';

interface ApplyJobModalProps {
  job: JobOpportunity;
  currentUser: User;
  onClose: () => void;
  onSubmit: (submitData: {
    pitch: string;
  }) => void;
}

export function ApplyJobModal({
  job,
  currentUser,
  onClose,
  onSubmit
}: ApplyJobModalProps) {
  const [pitch, setPitch] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pitch) {
      alert("Please write a brief pitch about your skills or availability.");
      return;
    }
    onSubmit({ pitch });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      ></div>

      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="relative transform overflow-hidden rounded-3xl bg-[#faf9f6] text-left shadow-2xl transition-all w-full max-w-lg border border-[#e2dfd5]">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4.5 border-b border-[#e2dfd5] bg-stone-100/40">
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Contact &amp; Apply
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Opportunity: <span className="font-semibold text-stone-700">{job.title}</span>
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded-full text-stone-400 hover:bg-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* Poster Details */}
            <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200/50 text-xs text-stone-700 space-y-2">
              <div className="flex items-center justify-between">
                <div>Posted by: <span className="font-bold text-stone-900">{job.postedBy}</span></div>
                <div className="flex items-center text-[#2c6e49] font-semibold gap-1">
                  <Phone className="w-3 h-3" />
                  <span>{job.contactInfo}</span>
                </div>
              </div>
              <div className="text-[11px] text-stone-500">
                Rate Offered: <span className="font-semibold text-stone-800">{job.rate}</span> (Estimated Duration: {job.duration})
              </div>
            </div>

            {/* Application Pitch */}
            <div className="space-y-1 text-left">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                Your Cover Note / Message to Post Creator *
              </label>
              <textarea
                required
                rows={4}
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
                placeholder="Describe your match for this job, when you are available to start, and any tools or skills you can bring. E.g., I am free all weekend and can help with weeding..."
                className="w-full px-4 py-3 bg-white border border-[#e2dfd5] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#2c6e49]/20"
              ></textarea>
            </div>

            {/* Direct contact info helpful tip */}
            <p className="text-[11px] text-stone-400">
              Note: Submitting this form sends an in-app trigger. You should also call or text the number above for immediate response.
            </p>

            {/* Action buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[#e2dfd5]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-lg text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#2c6e49] hover:bg-[#205234] text-white font-semibold rounded-lg text-xs transition-colors shadow-xs flex items-center space-x-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Application</span>
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}
