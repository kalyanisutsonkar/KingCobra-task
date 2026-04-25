"use client";

import { useState, useEffect } from "react";
import { Search, Filter, SlidersHorizontal, Loader2 } from "lucide-react";
import { WorkflowCard } from "./WorkflowCard";

import { Workflow } from "@/lib/data";

const CATEGORIES = ["All", "Marketing", "Sales", "HR", "Content"];

export function Marketplace() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/workflows")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setWorkflows(data);
        } else {
          console.error("API did not return an array:", data);
          setWorkflows([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch workflows", err);
        setWorkflows([]);
        setLoading(false);
      });
  }, []);

  const filteredWorkflows = workflows.filter(w => {
    const matchesCategory = activeCategory === "All" || w.category === activeCategory;
    const matchesSearch = w.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         w.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search workflows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap border ${
                activeCategory === cat
                  ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                  : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
          <button className="p-2 ml-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-80 bg-white/5 border border-white/10 rounded-3xl animate-pulse" />
          ))
        ) : (
          filteredWorkflows.map((workflow, idx) => (
            <WorkflowCard key={idx} {...workflow} />
          ))
        )}
      </div>

      {filteredWorkflows.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No workflows found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
