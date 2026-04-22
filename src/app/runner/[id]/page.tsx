"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Zap, ArrowLeft, ShieldCheck, Key, 
  Loader2, CheckCircle2, AlertCircle, 
  Copy, Download, Share2, Sparkles
} from "lucide-react";
import Link from "next/link";
import { WORKFLOWS, Workflow } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import OpenAI from "openai";

export default function WorkflowRunnerPage() {
  const params = useParams();
  const router = useRouter();
  const workflow = WORKFLOWS.find((w) => w.id === params.id);

  const [apiKey, setApiKey] = useState("");
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [status, setStatus] = useState<"idle" | "running" | "completed" | "error">("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState("");

  if (!workflow) return <div>Workflow not found</div>;

  const handleRun = async () => {
    if (!apiKey) {
      setError("Please provide an OpenAI API Key.");
      setStatus("error");
      return;
    }

    setStatus("running");
    setError("");
    setResults([]);
    setCurrentStep(0);

    const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

    try {
      // Step 1: Summarize/Analyze
      setCurrentStep(0);
      await new Promise(r => setTimeout(r, 1500)); // Simulate work
      const completion1 = await openai.chat.completions.create({
        messages: [{ role: "user", content: `Summarize this topic into 3 key insights: ${topic}` }],
        model: "gpt-3.5-turbo",
      });
      const summary = completion1.choices[0].message.content;

      // Step 2: Extract Hooks
      setCurrentStep(1);
      await new Promise(r => setTimeout(r, 1500));
      const completion2 = await openai.chat.completions.create({
        messages: [{ role: "user", content: `Based on this summary, write a viral "hook" sentence for a LinkedIn post: ${summary}` }],
        model: "gpt-3.5-turbo",
      });
      const hook = completion2.choices[0].message.content;

      // Step 3: Generate Posts
      setCurrentStep(2);
      await new Promise(r => setTimeout(r, 2000));
      const completion3 = await openai.chat.completions.create({
        messages: [{ role: "user", content: `Write a full LinkedIn post using this hook: "${hook}". Target audience: ${audience}. Include 3 relevant hashtags.` }],
        model: "gpt-3.5-turbo",
      });
      const finalPost = completion3.choices[0].message.content;

      setResults([finalPost || ""]);
      setStatus("completed");
      setCurrentStep(3);
    } catch (err: any) {
      setError(err.message || "An error occurred during execution.");
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <Navbar />
      
      <div className="pt-24 pb-12 max-w-4xl mx-auto px-4">
        <Link href={`/workflow/${workflow.id}`} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blueprint
        </Link>

        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-white/10 bg-gradient-to-r from-indigo-500/10 to-transparent">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Zap className="w-5 h-5 text-white fill-current" />
              </div>
              <h1 className="text-2xl font-bold">{workflow.title} Runner</h1>
            </div>
            <p className="text-gray-400 text-sm">Follow the steps below to deploy and execute your workflow instance.</p>
          </div>

          <div className="p-8">
            {status === "idle" || status === "error" ? (
              <div className="space-y-8">
                {/* Configuration Section */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">OpenAI API Key</label>
                    <div className="relative">
                      <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input 
                        type="password" 
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="sk-..."
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                      />
                    </div>
                    <p className="mt-2 text-[10px] text-gray-500 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" />
                      Your key is used only for this session and is never stored on our servers.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Topic or URL</label>
                      <input 
                        type="text" 
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g. AI in SaaS 2026"
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Target Audience</label>
                      <input 
                        type="text" 
                        value={audience}
                        onChange={(e) => setAudience(e.target.value)}
                        placeholder="e.g. Tech Founders"
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400 text-sm">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p>{error}</p>
                  </div>
                )}

                <div className="flex gap-4">
                  <button 
                    onClick={handleRun}
                    disabled={status === "running"}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
                  >
                    <Sparkles className="w-5 h-5" />
                    Run with OpenAI
                  </button>
                  <button 
                    onClick={async () => {
                      setStatus("running");
                      setCurrentStep(0);
                      await new Promise(r => setTimeout(r, 2000));
                      setCurrentStep(1);
                      await new Promise(r => setTimeout(r, 2000));
                      setCurrentStep(2);
                      await new Promise(r => setTimeout(r, 2000));
                      setResults(["[MOCK RESULT] Here is your viral LinkedIn post about " + topic + " for " + audience + "!\n\n🚀 The future is here.\n\n#AI #Innovation #SaaS"]);
                      setStatus("completed");
                      setCurrentStep(3);
                    }}
                    disabled={status === "running"}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25"
                  >
                    <Zap className="w-5 h-5" />
                    Mock Run (No API Key)
                  </button>
                </div>
              </div>
            ) : status === "running" ? (
              <div className="py-12 flex flex-col items-center">
                <div className="w-full max-w-md space-y-8">
                  {workflow.steps.map((step, idx) => (
                    <div key={step.id} className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                        idx < currentStep 
                          ? "bg-emerald-500 border-emerald-500 text-white" 
                          : idx === currentStep 
                            ? "bg-indigo-600 border-indigo-500 text-white animate-pulse" 
                            : "bg-white/5 border-white/10 text-gray-500"
                      }`}>
                        {idx < currentStep ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-medium ${idx === currentStep ? "text-white" : "text-gray-500"}`}>{step.title}</h3>
                        {idx === currentStep && <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 animate-progress" style={{ width: '60%' }}></div>
                        </div>}
                      </div>
                      {idx === currentStep && <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    Execution Complete
                  </h2>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(results.join("\n\n"));
                        alert("Copied to clipboard!");
                      }}
                      className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer"
                      title="Copy to clipboard"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => {
                        const blob = new Blob([results.join("\n\n")], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `workflow-result-${workflow.id}.txt`;
                        a.click();
                      }}
                      className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer"
                      title="Download as TXT"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: workflow.title + ' Result',
                            text: results.join("\n\n"),
                            url: window.location.href,
                          });
                        } else {
                          alert("Sharing not supported on this browser. Link copied instead!");
                        }
                      }}
                      className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer"
                      title="Share result"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-black/40 border border-white/10 rounded-2xl p-8 prose prose-invert max-w-none">
                  {results.map((res, i) => (
                    <div key={i} className="whitespace-pre-wrap text-gray-300 leading-relaxed italic">
                      "{res}"
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setStatus("idle")}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 rounded-xl font-medium transition-all"
                >
                  Run Again with New Inputs
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
