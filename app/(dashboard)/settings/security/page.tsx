"use client";

import React from "react";
import { useSessions } from "@/hooks/use-session";
import { SessionsList } from "@/components/sessions/SessionsList";
import { RevokeAllButton } from "@/components/sessions/RevokeAllButton";
import useToast from "@/hooks/use-toast";
import { Lock } from "lucide-react";

// TODO: Replace with actual API call
const MOCK_SESSIONS = [
  {
    id: "s1",
    device: "Chrome on macOS",
    ip: "203.0.113.42",
    lastActive: "Just now",
    isCurrent: true,
  },
  {
    id: "s2",
    device: "Safari on iPhone",
    ip: "198.51.100.17",
    lastActive: "2h ago",
    isCurrent: false,
  },
  {
    id: "s3",
    device: "Firefox on Windows",
    ip: "192.0.2.88",
    lastActive: "Yesterday",
    isCurrent: false,
  },
];

export default function SecurityPage() {
  const { toast } = useToast();
  // const { data: sessions } = useSessions();
  const sessions = MOCK_SESSIONS;

  const handleRevokeSession = (sessionId: string) => {
    // TODO: Implement revoke session mutation
    toast({
      title: "Session revoked",
      message: "This session has been disconnected",
      type: "success",
    });
  };

  const handleRevokeAll = async (): Promise<void> => {
    // TODO: Implement revoke all sessions mutation
    return new Promise((resolve) => {
      setTimeout(() => {
        toast({
          title: "All sessions revoked",
          message: "You have been signed out everywhere",
          type: "success",
        });
        resolve();
      }, 500);
    });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Lock className="w-6 h-6 text-gray-400" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Security</h1>
          <p className="text-gray-600">Manage your active sessions and security</p>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Active Sessions</h2>
        <p className="text-sm text-gray-600 mb-6">
          Here are the devices and locations where you're currently signed in.
        </p>
        <SessionsList sessions={sessions} onRevokeSession={handleRevokeSession} />
      </div>

      {/* Revoke All */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900 text-sm">Danger Zone</h3>
        <RevokeAllButton onRevokeAll={handleRevokeAll} />
      </div>
    </div>
  );
}
