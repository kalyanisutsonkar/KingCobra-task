"use client";

import { useState } from "react";
import { 
  Plus, TrendingUp, Users, ShoppingBag, 
  BarChart3, Settings, Upload, DollarSign,
  ChevronRight, MoreVertical, Search, Zap
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const DATA = [
  { name: 'Mon', sales: 4000, users: 2400 },
  { name: 'Tue', sales: 3000, users: 1398 },
  { name: 'Wed', sales: 2000, users: 9800 },
  { name: 'Thu', sales: 2780, users: 3908 },
  { name: 'Fri', sales: 1890, users: 4800 },
  { name: 'Sat', sales: 2390, users: 3800 },
  { name: 'Sun', sales: 3490, users: 4300 },
];

export default function CreatorDashboardPage() {
  const [activeTab, setActiveTab] = useState("analytics");
  const [showUpload, setShowUpload] = useState(false);

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <Navbar />
      
      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h1 className="text-3xl font-bold mb-2">Creator Dashboard</h1>
            <p className="text-gray-500">Manage your AI workflows and track your performance.</p>
          </div>
          <button 
            onClick={() => setShowUpload(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20"
          >
            <Plus className="w-5 h-5" />
            Publish Workflow
          </button>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Revenue", value: "$12,450", change: "+12.5%", icon: DollarSign, color: "text-emerald-500" },
            { label: "Active Deployments", value: "842", change: "+4.2%", icon: Zap, color: "text-indigo-500" },
            { label: "Total Customers", value: "3,120", change: "+8.1%", icon: Users, color: "text-purple-500" },
            { label: "Marketplace Rank", value: "#14", change: "Top 5%", icon: TrendingUp, color: "text-amber-500" }
          ].map((metric, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg bg-white/5 border border-white/10 ${metric.color}`}>
                  <metric.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-emerald-500">{metric.change}</span>
              </div>
              <h3 className="text-sm text-gray-500 mb-1">{metric.label}</h3>
              <p className="text-2xl font-bold">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Analytics Chart */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-500" />
                  Revenue Analytics
                </h2>
                <select className="bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-400 focus:outline-none">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last Year</option>
                </select>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={DATA}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* My Workflows Table */}
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
              <div className="p-8 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-xl font-bold">My Workflows</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="Search yours..."
                    className="bg-black/40 border border-white/10 rounded-lg py-1.5 pl-9 pr-4 text-xs focus:outline-none"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <tr>
                      <th className="px-8 py-4">Workflow</th>
                      <th className="px-8 py-4">Status</th>
                      <th className="px-8 py-4">Price</th>
                      <th className="px-8 py-4">Sales</th>
                      <th className="px-8 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { name: "LinkedIn Post Gen", status: "Active", price: "$29", sales: 124 },
                      { name: "SEO Article Writer", status: "Active", price: "$49", sales: 45 },
                      { name: "Customer Support AI", status: "Draft", price: "$99", sales: 0 }
                    ].map((w, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors group">
                        <td className="px-8 py-4 font-medium">{w.name}</td>
                        <td className="px-8 py-4 text-xs">
                          <span className={`px-2 py-1 rounded-full ${w.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                            {w.status}
                          </span>
                        </td>
                        <td className="px-8 py-4 text-sm text-gray-400">{w.price}</td>
                        <td className="px-8 py-4 text-sm font-bold">{w.sales}</td>
                        <td className="px-8 py-4 text-right">
                          <button className="p-1 hover:bg-white/10 rounded transition-colors text-gray-500 hover:text-white">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-500/20">
              <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/10 blur-[40px] rounded-full"></div>
              <h3 className="text-xl font-bold mb-4">Creator Program</h3>
              <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
                You've reached <span className="font-bold text-white">Silver Tier</span>. Unlock lower transaction fees by reaching $15,000 in sales.
              </p>
              <div className="w-full h-2 bg-black/20 rounded-full mb-6 overflow-hidden">
                <div className="h-full bg-white w-[80%]"></div>
              </div>
              <button className="w-full bg-white text-indigo-600 py-3 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-all">
                View Perks
              </button>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="font-bold mb-6">Recent Activity</h3>
              <div className="space-y-6">
                {[
                  { text: "New sale: LinkedIn Post Gen", time: "2m ago", color: "text-emerald-500" },
                  { text: "Workflow deployed by User #81", time: "15m ago", color: "text-indigo-500" },
                  { text: "Payout of $1,200 processed", time: "4h ago", color: "text-purple-500" }
                ].map((act, i) => (
                  <div key={i} className="flex gap-4">
                    <div className={`w-2 h-2 rounded-full mt-2 ${act.color}`}></div>
                    <div>
                      <p className="text-sm text-gray-300 mb-1">{act.text}</p>
                      <span className="text-[10px] text-gray-600 uppercase font-bold">{act.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal Overlay */}
      {showUpload && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowUpload(false)}></div>
          <div className="bg-[#0f172a] border border-white/10 rounded-3xl w-full max-w-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-white/10 bg-gradient-to-r from-indigo-500/10 to-transparent flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-1">Publish New Workflow</h2>
                <p className="text-gray-500 text-sm">Define your multi-step AI automation chain.</p>
              </div>
              <button onClick={() => setShowUpload(false)} className="text-gray-500 hover:text-white transition-colors">
                <MoreVertical className="w-6 h-6 rotate-45" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Workflow Title</label>
                  <input type="text" placeholder="e.g. Sales Prospector" className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Category</label>
                  <select className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none">
                    <option>Marketing</option>
                    <option>Sales</option>
                    <option>Content</option>
                    <option>HR</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Pricing ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input type="number" placeholder="49" className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Workflow Configuration (JSON)</label>
                <textarea 
                  rows={4} 
                  placeholder='{ "steps": [{ "id": 1, "action": "summarize" }] }'
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm font-mono focus:outline-none h-48"
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setShowUpload(false)} className="flex-1 bg-white/5 border border-white/10 py-3 rounded-xl font-bold hover:bg-white/10 transition-all">Cancel</button>
                <button onClick={() => setShowUpload(false)} className="flex-1 bg-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4" />
                  Publish to Marketplace
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
