import React, { useState } from 'react';
import { ResourceItem, User } from '../types';
import { X, Calendar, MessageSquare, ShieldAlert, Heart } from 'lucide-react';

interface BorrowRequestModalProps {
  item: ResourceItem;
  currentUser: User;
  onClose: () => void;
  onSubmit: (requestData: {
    startDate: string;
    endDate: string;
    message: string;
  }) => void;
}

export function BorrowRequestModal({
  item,
  currentUser,
  onClose,
  onSubmit
}: BorrowRequestModalProps) {
  // Tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  // 3 Days from now
  const defaultEnd = new Date();
  defaultEnd.setDate(defaultEnd.getDate() + 4);
  const defaultEndStr = defaultEnd.toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(tomorrowStr);
  const [endDate, setEndDate] = useState(defaultEndStr);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (new Date(startDate) > new Date(endDate)) {
      alert("Start Date cannot be after the Return Date.");
      return;
    }
    onSubmit({
      startDate,
      endDate,
      message
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
        <div className="relative transform overflow-hidden rounded-3xl bg-[#faf9f6] text-left shadow-2xl transition-all w-full max-w-lg border border-[#e2dfd5]">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4.5 border-b border-[#e2dfd5] bg-stone-100/40">
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Request to Borrow
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Lending item: <span className="font-semibold text-stone-700">{item.title}</span>
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
            
            {/* Owner banner */}
            <div className="bg-[#2c6e49]/5 p-3.5 rounded-xl border border-[#2c6e49]/15 text-xs text-stone-600 space-y-1">
              <div>Lender Name: <span className="font-bold text-stone-850">{item.ownerName}</span></div>
              <div>Pick up area: <span className="font-semibold text-stone-700">{item.location}</span></div>
              <div className="text-[10px] text-stone-400">Your registered contact numbers will be shared with the owner for security.</div>
            </div>

            {/* Date Picker row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1 text-left">
                <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block">
                  Start Date *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#e2dfd5] rounded-xl text-xs text-stone-700 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block">
                  Return Date *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#e2dfd5] rounded-xl text-xs text-stone-700 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Message to Lender */}
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block">
                Message to Lender / Notes *
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g., I need this knapsack sprayer for my farm adjacent to the Primary School. I will pick it up on Saturday and return it washed. Thank you!"
                className="w-full px-4 py-3 bg-white border border-[#e2dfd5] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#2c6e49]/20"
              ></textarea>
            </div>

            {/* Trust banner */}
            <div className="flex items-start space-x-2 p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-500">
              <Heart className="w-4 h-4 text-[#2c6e49] flex-shrink-0 mt-0.5" />
              <span>By making a request, you agree to treat this item with respect and care and return it on or before the specified date.</span>
            </div>

            {/* Buttons */}
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
                className="px-5 py-2 bg-[#2c6e49] hover:bg-[#205234] text-white font-semibold rounded-lg text-xs transition-colors shadow-xs"
              >
                Send Borrow Request
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}
