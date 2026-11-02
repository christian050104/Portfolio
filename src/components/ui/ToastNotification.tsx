"use client";

import { LuCircleCheck } from "react-icons/lu";
import { useAppPreferences } from "@/context/AppPreferencesContext";

export default function ToastNotification() {
  const { toastMessage } = useAppPreferences();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[10050] pointer-events-none no-print">
      <div className="animate-toast-in pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl surface-modal shadow-2xl">
        <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500 flex-shrink-0">
          <LuCircleCheck className="w-4 h-4" />
        </div>
        <p className="text-sm font-medium theme-heading">{toastMessage}</p>
      </div>
    </div>
  );
}

