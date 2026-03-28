"use client";

import React from "react";
import { useAuth } from "@/contexts/auth-context";
import { Mail, User, Shield, Bell } from "lucide-react";

export default function SettingsPage() {
  const { user } = useAuth();
  const [email, setEmail] = React.useState(user?.email || "");
  const [name, setName] = React.useState(user?.username || "");

  const handleSave = () => {
    // TODO: Implement update profile mutation
    console.log("Save settings", { name, email });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-bold text-gray-900">Profile</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Full name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 text-gray-900 outline-none transition-colors focus:border-blue-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 text-gray-900 outline-none transition-colors focus:border-blue-500"
              placeholder="your@email.com"
            />
          </div>

          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-bold text-gray-900">Security</h2>
        </div>

        <div className="space-y-4">
          <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 flex items-center justify-between">
            <span className="font-medium text-gray-700">Change password</span>
            <span className="text-gray-400">→</span>
          </button>
        </div>
      </div>

      {/* Notifications Section */}
      {/* <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
            <span className="font-medium text-gray-700">
              Email alerts for new links
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
            <span className="font-medium text-gray-700">
              Weekly analytics digest
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded" />
            <span className="font-medium text-gray-700">Marketing emails</span>
          </label>
        </div>
      </div> */}
    </div>
  );
}
