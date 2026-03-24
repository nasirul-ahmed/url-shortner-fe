"use client";

import React from "react";
import { Session } from "@/types/api";
import { Badge } from "@/components/ui/Badge";
import { Trash2, Shield } from "lucide-react";

interface SessionsListProps {
  sessions: Session[];
  onRevokeSession?: (sessionId: string) => void;
}

export function SessionsList({ sessions, onRevokeSession }: SessionsListProps) {
  if (!sessions || sessions.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
        <p className="text-gray-500">No active sessions</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between hover:border-gray-300 transition-colors"
        >
          <div className="flex items-center gap-4 flex-1">
            <div className="p-2.5 bg-blue-50 rounded-lg">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">
                {session.device}
              </div>
              <div className="text-xs text-gray-500 font-mono">
                {session.ip}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">{session.lastActive}</div>
              {session.isCurrent && <Badge status="active" />}
            </div>
          </div>
          <button
            onClick={() => onRevokeSession?.(session.id)}
            className="ml-2 p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
            title="Revoke session"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
