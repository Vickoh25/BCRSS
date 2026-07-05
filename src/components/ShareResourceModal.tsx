import React, { useState } from 'react';
import { User, ResourceCategory, ResourceCondition, LendingType } from '../types';
import { X, ImagePlus, CheckCircle } from 'lucide-react';

interface ShareResourceModalProps {
  currentUser: User;
  onClose: () => void;
  onSave: (newItem: {
    title: string;
    category: ResourceCategory;
    condition: ResourceCondition;
    description: string;
    lendingType: LendingType;
    location: string;
    ownerName: string;
    ownerContact: string;
  }) => void;
}

export function ShareResourceModal({
  currentUser,
  onClose,
  onSave
}: ShareResourceModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ResourceCategory>('farm tools');
  const [condition, setCondition] = useState<ResourceCondition>('Good');
  const [description, setDescription] = useState('');
  const [lendingType, setLendingType] = useState<LendingType>('Borrowing');
  const [location, setLocation] = useState('');
  
  // Prefill these with the active simulator user values for seamless role-playing
  const [ownerName, setOwnerName] = useState(currentUser.name);
  const [ownerContact, setOwnerContact] = useState(currentUser.contact);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !location || !ownerName || !ownerContact) {
      alert("Please fill in all required fields.");
      return;
    }
    
    onSave({
      title,
      category,
      condition,
      description,
      lendingType,
      location,
      ownerName,
      ownerContact
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Background backing */}
      <div 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Sheet / Dialog pane centering */}
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="relative transform overflow-hidden rounded-3xl bg-[#faf9f6] text-left shadow-2xl transition-all w-full max-w-2xl border border-[#e2dfd5]">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4.5 border-b border-[#e2dfd5] bg-stone-100/40">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Share a Resource
            </h3>
            <button 
              onClick={onClose}
              className="p-1 rounded-full text-stone-400 hover:bg-stone-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form container */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            
            {/* Row 1: Title Input */}
            <div className="space-y-1 text-left">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Hand Plough, Biology 101 Textbook"
                className="w-full px-4 py-3 bg-white border border-[#e2dfd5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6e49]/20"
              />
            </div>

            {/* Row 2: Category & Condition Selector inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ResourceCategory)}
                  className="w-full px-4 py-3 bg-white border border-[#e2dfd5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6e49]/20 cursor-pointer"
                >
                  <option value="farm tools">Farm Tools</option>
                  <option value="textbooks">Textbooks</option>
                  <option value="household items">Household Items</option>
                </select>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Condition *
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as ResourceCondition)}
                  className="w-full px-4 py-3 bg-white border border-[#e2dfd5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6e49]/20 cursor-pointer"
                >
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                </select>
              </div>
            </div>

            {/* Row 3: Description Textarea */}
            <div className="space-y-1 text-left">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                Description *
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the item, how it can be used, and any special instructions or pickup requirements..."
                className="w-full px-4 py-3 bg-white border border-[#e2dfd5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6e49]/20"
              ></textarea>
            </div>

            {/* Row 4: Lending Type options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Lending Type *
                </label>
                <select
                  value={lendingType}
                  onChange={(e) => setLendingType(e.target.value as LendingType)}
                  className="w-full px-4 py-3 bg-white border border-[#e2dfd5] rounded-xl text-sm focus:outline-none"
                >
                  <option value="Borrowing">For Borrowing</option>
                  <option value="Donation">For Donation</option>
                </select>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Near UEAB Main Gate, Baraton Market"
                  className="w-full px-4 py-3 bg-white border border-[#e2dfd5] rounded-xl text-sm focus:outline-none"
                />
              </div>
            </div>

            {/* Row 5: Owner metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full px-4 py-3 bg-[#f5f4ef] border border-[#e2dfd5] rounded-xl text-sm font-semibold text-stone-700"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Contact (Phone / Email) *
                </label>
                <input
                  type="text"
                  required
                  value={ownerContact}
                  onChange={(e) => setOwnerContact(e.target.value)}
                  className="w-full px-4 py-3 bg-[#f5f4ef] border border-[#e2dfd5] rounded-xl text-sm font-semibold text-stone-700"
                />
              </div>
            </div>

            {/* Row 6: Photos Section */}
            <div className="space-y-1 text-left">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                Photos
              </label>
              <div className="border-2 border-dashed border-[#e2dfd5] hover:border-[#2c6e49] rounded-xl p-4.5 flex flex-col items-center justify-center cursor-pointer bg-white transition-colors">
                <ImagePlus className="w-8 h-8 text-stone-400 mb-2" />
                <span className="text-xs font-semibold text-stone-500">Add Photos</span>
                <span className="text-[10px] text-stone-400 mt-1">PNG or JPEG up to 5MB (Illustrative icon fallback auto-assigned)</span>
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
                List Resource
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}
