"use client";

import React, { useState } from "react";
import { ShortUrlLink } from "@/types/api";
import useToast from "@/hooks/use-toast";
import { copyToClipboard } from "@/lib/utils";
import { Copy, Trash2, ExternalLink, MoreVertical } from "lucide-react";

interface LinkRowActionsProps {
  link: ShortUrlLink;
  onDelete?: () => void;
}

export function LinkRowActions({ link, onDelete }: LinkRowActionsProps) {
  const [showMenu, setShowMenu] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    const fullUrl = `${window.location.origin}/${link.shortCode}`;
    const copied = await copyToClipboard(fullUrl);
    if (copied) {
      toast({
        title: "Copied!",
        message: fullUrl,
        type: "success",
      });
    }
    setShowMenu(false);
  };

  const handleOpen = () => {
    window.open(`/${link.shortCode}`, "_blank");
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <MoreVertical className="w-4 h-4 text-gray-600" />
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg border border-gray-200 shadow-lg z-10">
          <button
            onClick={handleCopy}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100"
          >
            <Copy className="w-4 h-4" />
            Copy link
          </button>
          <button
            onClick={handleOpen}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100"
          >
            <ExternalLink className="w-4 h-4" />
            Open link
          </button>
          <button
            onClick={() => {
              onDelete?.();
              setShowMenu(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
