"use client";

import { useState, useTransition } from "react";
import { Check, Copy, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMuxTranscript } from "@/lib/actions/mux";

interface TranscriptPanelProps {
  playbackId: string;
  trackId: string | null | undefined;
  assetId: string | null | undefined;
}

export function TranscriptPanel({
  playbackId,
  trackId,
  assetId,
}: TranscriptPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  const status =
    isPending && !transcript ? "loading" : error ? "error" : transcript ? "success" : "idle";

  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      if (!transcript && !error) {
        startTransition(async () => {
          const result = await getMuxTranscript(playbackId, trackId, assetId);
          if (result.error) {
            setError(result.error);
          } else {
            setTranscript(result.transcript);
          }
        });
      }
    }
  };

  const handleCopy = async () => {
    if (!transcript) return;
    try {
      await navigator.clipboard.writeText(transcript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silently fail if clipboard is unavailable
    }
  };

  return (
    <div className="mb-6">
      <Button
        onClick={handleToggle}
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white"
      >
        <FileText className="w-4 h-4 mr-2" />
        Transcript
      </Button>

      {isOpen && (
        <div className="mt-4 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 animate-in fade-in duration-200">
          {status === "loading" && (
            <div className="space-y-3">
              <div className="h-4 bg-zinc-800 rounded animate-pulse" />
              <div className="h-4 bg-zinc-800 rounded animate-pulse w-5/6" />
              <div className="h-4 bg-zinc-800 rounded animate-pulse w-4/6" />
            </div>
          )}

          {status === "error" && (
            <div className="flex items-start gap-3 text-amber-600/90">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <p className="text-sm">{error || "Transcript unavailable for this lesson."}</p>
            </div>
          )}

          {status === "success" && transcript && (
            <>
              <div className="flex justify-end mb-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopy}
                  className="border-emerald-500/30 hover:border-emerald-500/50 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {transcript}
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
