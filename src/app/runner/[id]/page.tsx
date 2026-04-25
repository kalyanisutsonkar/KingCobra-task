"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Zap, ArrowLeft,
  Loader2, CheckCircle2, AlertCircle, 
  Copy, Download, Share2, Sparkles
} from "lucide-react";
import Link from "next/link";
import { Workflow } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function WorkflowRunnerPage() {
  const params = useParams();
  const router = useRouter();
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [loading, setLoading] = useState(true);

  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [status, setStatus] = useState<"idle" | "running" | "completed" | "error">("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/workflows")
      .then(res => res.json())
      .then(data => {
        const found = data.find((w: any) => w.id === params.id);
        setWorkflow(found);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) return <div className="min-h-screen bg-[#030712] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>;
  if (!workflow) return <div className="min-h-screen bg-[#030712] flex items-center justify-center text-white">Workflow not found</div>;

  const handleRun = async (isMock = false) => {
    if (!topic || !audience) {
      setError("Please provide both a topic and a target audience.");
      setStatus("error");
      return;
    }

    setStatus("running");
    setError("");
    setResults([]);
    setCurrentStep(0);

    try {
      // Simulate steps visually since the API handles the whole chain
      const stepInterval = setInterval(() => {
        setCurrentStep(prev => (prev < workflow.steps.length - 1 ? prev + 1 : prev));
      }, 2000);

      const response = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          workflowId: workflow.id, 
          topic, 
          audience,
          mock: isMock 
        }),
      });

      const data = await response.json();
      clearInterval(stepInterval);

      if (!response.ok) {
        throw new Error(data.error || "Execution failed.");
      }

      setResults([data.result]);
      setStatus("completed");
      setCurrentStep(workflow.steps.length);
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
                    onClick={() => handleRun(false)}
                    disabled={status === "running"}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
                  >
                    <Sparkles className="w-5 h-5" />
                    Run Workflow
                  </button>
                  <button 
                    onClick={() => handleRun(true)}
                    disabled={status === "running"}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25"
                  >
                    <Zap className="w-5 h-5" />
                    Mock Run
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
