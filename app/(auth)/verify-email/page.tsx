"use client";

import React from "react";
import { Mail, ArrowRight } from "lucide-react";

const EmailVerification = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-8 text-center border border-slate-100">
        {/* Icon Header */}
        <div className="relative inline-flex mb-6">
          <div className="absolute inset-0 bg-indigo-100 rounded-full animate-ping opacity-25"></div>
          <div className="relative bg-indigo-600 p-4 rounded-full shadow-lg shadow-indigo-200">
            <Mail className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Please verify your email
        </h1>
        <p className="text-slate-600 mb-8">
          We've sent a verification link to your inbox. Please click the link to
          confirm your account.
        </p>

        {/* Action Button (Open Mailer - Optional but nice UX) */}
        <button
          onClick={() => window.open("https://mail.google.com")}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group mb-4"
        >
          Open Mailbox
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Back to Login Link */}
        <div className="mt-8">
          <a
            href="/login"
            className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
          >
            Back to sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
