import React from 'react';
import { Hammer, Book, Flame, Home, Wrench, Briefcase, Shovel, Users, Award, Shield, MessageSquare, Clipboard, Search, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

interface ItemImageProps {
  code: string;
  category: string;
  className?: string;
}

export function ItemImage({ code, category, className = 'h-48 w-full' }: ItemImageProps) {
  // Select color scheme and icon based on code and category
  let bgClass = 'bg-[#f5f4ef] text-stone-400';
  let IconComponent = Wrench;

  if (category === 'farm tools' || code === 'sprayer' || code === 'plough' || code === 'wheelbarrow') {
    bgClass = 'bg-[#f4f6f4] text-[#2c6e49]';
    if (code === 'sprayer') {
      IconComponent = Wrench;
    } else if (code === 'plough') {
      IconComponent = Shovel;
    } else {
      IconComponent = Hammer; // default for tools
    }
  } else if (category === 'textbooks' || code === 'biology' || code === 'computing') {
    bgClass = 'bg-[#f9f5eb] text-[#8c6239]';
    IconComponent = Book;
  } else if (category === 'household items' || code === 'lantern') {
    bgClass = 'bg-[#faf6f0] text-amber-600';
    IconComponent = Home;
    if (code === 'lantern') {
      IconComponent = Flame;
    }
  }

  return (
    <div className={`flex items-center justify-center relative overflow-hidden transition-all duration-300 ${bgClass} ${className}`}>
      {/* Decorative patterns mimicking the screenshots */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full border-4 border-current"></div>
        <div className="absolute -left-4 -top-4 w-16 h-16 rounded-full border-2 border-current"></div>
      </div>
      
      {/* Centered Large Icon */}
      <div className="p-6 bg-white/60 backdrop-blur-xs rounded-2xl shadow-xs border border-white/40 transform hover:scale-105 transition-transform duration-300">
        <IconComponent className="w-12 h-12 stroke-[1.25]" />
      </div>
    </div>
  );
}
