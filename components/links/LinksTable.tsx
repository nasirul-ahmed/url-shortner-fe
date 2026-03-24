"use client";

import React from "react";
import { ShortUrlLink } from "@/types/api";
import { Badge } from "@/components/ui/Badge";
import { LinkRowActions } from "./LinkRowActions";
import { formatDate, truncateUrl } from "@/lib/utils";

type Link = ShortUrlLink;

interface LinksTableProps {
  links: ShortUrlLink[];
  isLoading?: boolean;
  onDeleteLink?: (shortCode: string) => void;
}

export function LinksTable({
  links,
  isLoading,
  onDeleteLink,
}: LinksTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (!links || links.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No links created yet</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
              Short Link
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
              Original URL
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
              Clicks
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
              Created
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {links.map((link) => (
            <tr
              key={link.shortCode}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-blue-600">
                    /{link.shortCode}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div
                  className="text-sm text-gray-900 truncate"
                  title={link.originalUrl}
                >
                  {truncateUrl(link.originalUrl, 50)}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-semibold text-gray-900">
                  {link.totalClicks}
                </div>
              </td>
              <td className="px-6 py-4">
                <Badge status={link.status} />
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-600">
                  {formatDate(link.createdAt)}
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <LinkRowActions
                  link={link}
                  onDelete={() => onDeleteLink?.(link.shortCode)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
