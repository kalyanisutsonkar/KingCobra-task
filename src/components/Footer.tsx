"use client";

import { Zap, Search, User } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black/50 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Prompts<span className="text-indigo-400">Go</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              The world's first dedicated marketplace for ready-to-deploy AI workflows. Automate your business with multi-step AI chains.
            </p>
            <div className="flex gap-4">
              <button className="text-gray-500 hover:text-white transition-colors"><Search className="w-5 h-5" /></button>
              <button className="text-gray-500 hover:text-white transition-colors"><Zap className="w-5 h-5" /></button>
              <button className="text-gray-500 hover:text-white transition-colors"><User className="w-5 h-5" /></button>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Marketplace</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">All Workflows</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Marketing</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Sales Automation</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">HR & Recruitment</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Creators</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Sell Workflows</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Creator Guidelines</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Payouts</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Success Stories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© 2026 PromptsGo. All rights reserved.</p>
          <div className="flex gap-8">
            <span>Status: All systems operational</span>
            <span>Made with ❤️ for AI Creators</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
