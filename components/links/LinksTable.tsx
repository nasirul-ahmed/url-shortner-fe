"use client";

import { PaginatedLinks } from "@/types/api";
import { Badge } from "@/components/ui/Badge";
import { LinkRowActions } from "./LinkRowActions";
import { formatDate, truncateUrl } from "@/lib/utils";

interface LinksTableProps {
  data: PaginatedLinks;
  isLoading?: boolean;
  onDeleteLink?: (shortCode: string) => void;
  onPageChange?: (page: number) => void;
}

export function LinksTable({
  data,
  isLoading,
  onDeleteLink,
  onPageChange,
}: LinksTableProps) {
  const { links, pagination } = data;

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
                  title={link.longUrl}
                >
                  {truncateUrl(link.longUrl, 50)}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-semibold text-gray-900">
                  {link.clickCount}
                </div>
              </td>
              <td className="px-6 py-4">
                <Badge status={link.isActive ? "Active" : "Inactive"} />
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-600">
                  {formatDate(link.createdAt)}
                </div>
              </td>

              <td className="px-6 py-4 text-right">
                <LinkRowActions
                  link={link}
                  onDelete={
                    typeof onDeleteLink === "function"
                      ? () => onDeleteLink?.(link.shortCode)
                      : undefined
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {pagination && (
        <div className="flex items-center justify-between mt-4 px-2">
          <div className="text-sm text-gray-600">
            Page {pagination.page} of {pagination.totalPages}
          </div>

          <div className="flex gap-2">
            <button
              disabled={Number(pagination.page) === 1}
              onClick={() => onPageChange?.(Number(pagination.page) - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            <button
              disabled={Number(pagination.page) === pagination.totalPages}
              onClick={() => onPageChange?.(Number(pagination.page) + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
