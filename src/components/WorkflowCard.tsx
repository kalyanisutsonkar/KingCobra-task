"use client";

import { motion } from "framer-motion";
import { Star, Zap, Clock, ChevronRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import Link from "next/link";

interface WorkflowCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  price: string;
  rating: number;
  steps: any[];
}

export function WorkflowCard({ id, title, description, category, price, rating, steps }: WorkflowCardProps) {
  const stepCount = Array.isArray(steps) ? steps.length : steps;
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {category}
          </span>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-xs font-bold">{rating}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>
        
        <p className="text-sm text-gray-400 mb-6 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Zap className="w-3.5 h-3.5 text-indigo-500" />
            <span>{stepCount} Steps</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Clock className="w-3.5 h-3.5 text-purple-500" />
            <span>5m Setup</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="text-lg font-bold text-white">
            {price === "0" ? "Free" : `$${price}`}
          </div>
          <Link 
            href={`/workflow/${id}`}
            className="flex items-center gap-1 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            View Details
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

