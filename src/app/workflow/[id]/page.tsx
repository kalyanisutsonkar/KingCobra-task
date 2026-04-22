"use client";

import { 
  Search, Layout, Database, PenTool, Zap, 
  FileText, Anchor, Share2, 
  Smile, BookOpen, MessageSquare,
  Users, Map, Mail,
  Star, Clock, ShieldCheck, Play, ArrowLeft, X
} from "lucide-react";
import Link from "next/link";
import { notFound, useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { WORKFLOWS } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StripeMock } from "@/components/StripeMock";

const ICON_MAP: Record<string, any> = {
  Search, Layout, Database, PenTool, Zap,
  FileText, Anchor, Share2,
  Smile, BookOpen, MessageSquare,
  Users, Map, Mail
};

export default function WorkflowDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [showCheckout, setShowCheckout] = useState(false);
  const workflow = WORKFLOWS.find((w) => w.id === params.id);

  if (!workflow) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <Navbar />
      
      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Details & Steps */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4 inline-block">
                {workflow.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{workflow.title}</h1>
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-1.5 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-white">{workflow.rating}</span>
                  <span>({workflow.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-indigo-500" />
                  <span>{workflow.steps.length} Steps</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Verified Creator</span>
                </div>
              </div>
            </div>

            <div className="prose prose-invert max-w-none mb-12">
              <p className="text-lg text-gray-300 leading-relaxed">
                {workflow.longDescription}
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                Workflow Blueprint
                <span className="text-sm font-normal text-gray-500 bg-white/5 px-2 py-0.5 rounded-md">How it works</span>
              </h2>
              
              <div className="space-y-4">
                {workflow.steps.map((step, idx) => {
                  const Icon = ICON_MAP[step.icon] || Zap;
                  return (
                    <div key={step.id} className="relative flex gap-6 p-6 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all">
                      {idx !== workflow.steps.length - 1 && (
                        <div className="absolute left-[39px] top-[76px] w-[2px] h-[calc(100%-40px)] bg-indigo-500/20" />
                      )}
                      
                      <div className="flex-shrink-0 w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20 text-indigo-400 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-bold mb-1">
                          <span className="text-indigo-500 mr-2">0{idx + 1}.</span>
                          {step.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: CTA & Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden p-6">
                <div className="aspect-video bg-black/40 rounded-xl mb-6 flex items-center justify-center group cursor-pointer relative overflow-hidden border border-white/5">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl shadow-indigo-500/20">
                    <Play className="w-6 h-6 text-white fill-current ml-1" />
                  </div>
                  <span className="absolute bottom-4 right-4 text-[10px] uppercase tracking-widest text-gray-500 font-bold">Watch Demo</span>
                </div>

                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="text-sm text-gray-500 block mb-1">One-time payment</span>
                    <span className="text-4xl font-bold">${workflow.price}</span>
                  </div>
                  <div className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-emerald-500/20">
                    Best Value
                  </div>
                </div>

                <button 
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 mb-4 shadow-lg shadow-indigo-500/25"
                >
                  <Zap className="w-5 h-5 fill-current" />
                  Deploy Workflow
                </button>

                
                <p className="text-[11px] text-center text-gray-500 px-4">
                  Deploying this workflow creates a secure instance in your dashboard. Requires OpenAI or Anthropic API Key.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h4 className="text-sm font-bold text-gray-300 mb-4">Includes:</h4>
                <ul className="space-y-3">
                  {[
                    "Unlimited executions",
                    "Custom step tuning",
                    "Export to CSV/Markdown",
                    "24/7 Priority Support",
                    "Free version updates"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-xs text-gray-400">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowCheckout(false)}></div>
          <StripeMock 
            price={workflow.price} 
            onComplete={() => {
              setShowCheckout(false);
              router.push(`/runner/${workflow.id}`);
            }} 
          />
          <button 
            onClick={() => setShowCheckout(false)}
            className="absolute top-8 right-8 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
        </div>
      )}
    </main>
  );
}

