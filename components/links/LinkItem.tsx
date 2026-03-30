"use client";

import { cn } from "@/lib/utils";
import { ShortUrlLink } from "@/types/api";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export default function LinkItem({ link }: { link: ShortUrlLink }) {
  const [copied, setCopied] = useState(false);
  const shortUrl = `http://localhost:4000/${link.shortCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-blue-200 transition-all mb-3 group">
      <div className="flex flex-col overflow-hidden mr-4">
        <span className="text-blue-600 font-bold text-sm truncate">
          {shortUrl}
        </span>
        <span className="text-gray-400 text-xs truncate">{link.longUrl}</span>
      </div>
      <button
        onClick={copyToClipboard}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
          copied
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white",
        )}
      >
        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
