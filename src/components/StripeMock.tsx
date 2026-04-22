"use client";

import { CreditCard, ShieldCheck, Lock, CheckCircle2 } from "lucide-react";

export function StripeMock({ price, onComplete }: { price: string, onComplete: () => void }) {
  return (
    <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 md:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300 shadow-2xl">

      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold">Secure Checkout</h3>
        <button 
          onClick={onComplete}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-xs animate-pulse"
        >
          QUICK BYPASS
        </button>
      </div>

      <button 
        onClick={onComplete}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 rounded-2xl font-black text-2xl mb-8 border-4 border-white shadow-[0_0_30px_rgba(99,102,241,0.5)] cursor-pointer"
      >
        CLICK HERE TO SKIP ➔
      </button>

      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Card Information</label>
          <div className="relative">
            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" placeholder="1234 5678 1234 5678" className="w-full bg-black/40 border border-white/10 rounded-t-xl py-3 pl-12 pr-4 text-sm focus:outline-none" />
          </div>
          <div className="grid grid-cols-2">
            <input type="text" placeholder="MM / YY" className="w-full bg-black/40 border border-white/10 rounded-bl-xl py-3 px-4 text-sm focus:outline-none border-t-0" />
            <input type="text" placeholder="CVC" className="w-full bg-black/40 border border-white/10 rounded-br-xl py-3 px-4 text-sm focus:outline-none border-t-0 border-l-0" />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Name on card</label>
          <input type="text" placeholder="Jane Doe" className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none" />
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-xl mb-8">
        <span className="text-sm text-gray-400">Total Due</span>
        <span className="text-2xl font-bold">${price}</span>
      </div>

      <button 
        onClick={() => {
          alert("Payment Successful! Deploying Workflow...");
          onComplete();
        }}
        style={{ backgroundColor: '#fbbf24', color: '#000' }}
        className="w-full hover:bg-amber-400 py-5 rounded-xl font-black text-lg transition-all flex items-center justify-center gap-2 mb-4 shadow-[0_0_20px_rgba(251,191,36,0.4)] cursor-pointer active:scale-95 border-2 border-white"
      >
        <Lock className="w-5 h-5" />
        PAY & DEPLOY WORKFLOW
      </button>

      <div className="flex items-center justify-center gap-4 text-[10px] text-gray-500 font-medium">
        <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-emerald-500" /> SSL Encrypted</span>
        <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Powered by Stripe</span>
      </div>
    </div>
  );
}
