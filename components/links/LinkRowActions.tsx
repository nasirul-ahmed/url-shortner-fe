"use client";

import React, { useRef, useState } from "react";
import { ShortUrlLink } from "@/types/api";
import { copyUrl } from "@/lib/utils";
import { Copy, Trash2, ExternalLink, MoreVertical } from "lucide-react";
import useToast from "@/contexts/toast-context";
import { BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";

interface LinkRowActionsProps {
  link: ShortUrlLink;
  onDelete?: () => void;
}

export function LinkRowActions({ link, onDelete }: LinkRowActionsProps) {
  const router = useRouter();
  const { toast } = useToast();
  const ref = useRef<HTMLDivElement>(null);
  const [showMenu, setShowMenu] = useState(false);

  const handleCopy = async () => {
    const [copied, url] = await copyUrl(link.shortCode);
    if (copied) {
      toast({
        title: "Copied!",
        message: url,
        type: "success",
      });
    }
    setShowMenu(false);
  };

  const handleOpen = () => {
    window.open(`${BASE_URL}/${link.shortCode}`, "_blank");
    setShowMenu(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showMenu &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div ref={ref} className="relative">
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
          {typeof onDelete === "function" && (
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
          )}
        </div>
      )}
    </div>
  );
}
