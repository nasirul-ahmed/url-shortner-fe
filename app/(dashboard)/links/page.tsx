"use client";

import React, { useState } from "react";
import { useLinks } from "@/hooks/use-links";
import { LinksTable } from "@/components/links/LinksTable";
import { CreateLinkModal } from "@/components/links/CreateLinkModal";
import { Plus } from "lucide-react";
import useToast from "@/contexts/toast-context";

export default function LinksPage() {
  const { toast } = useToast();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const { data: linksData, isLoading } = useLinks(page);

  const handleDeleteLink = (shortCode: string) => {
    // TODO: Implement delete mutation
    toast({
      title: "Link deleted",
      message: `${shortCode} has been removed`,
      type: "success",
    });
  };

  // Keyboard shortcut for creating links (Cmd+K)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCreateModalOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Links</h1>
          <p className="text-gray-600">Manage and track all your short links</p>
        </div>
        <button
          onClick={() => setCreateModalOpen(true)}
          className="flex items-center flex-col px-4 py-2.5 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <div className="flex items-center gap-2 text-white font-semibold ">
            <Plus className="w-4 h-4" />
            New Link
          </div>
          <p className="text-gray-300 text-sm">Cmd+K to open anytime</p>
        </button>
      </div>

      {/* Links Table */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <LinksTable
          data={linksData || { links: [], pagination: {} }}
          isLoading={isLoading}
          onDeleteLink={handleDeleteLink}
          onPageChange={setPage}
        />
      </div>

      {/* Create Modal */}
      <CreateLinkModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </div>
  );
}
