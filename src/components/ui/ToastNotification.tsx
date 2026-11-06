"use client";

import { LuCircleCheck } from "react-icons/lu";
import { useAppPreferences } from "@/context/AppPreferencesContext";

export default function ToastNotification() {
  const { toastMessage } = useAppPreferences();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:bottom-6 sm:right-6 z-[10050] flex justify-center sm:justify-end pointer-events-none no-print">
      <div className="animate-toast-in pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl surface-modal shadow-2xl max-w-full">
        <div className="w-8 h-8 rounded-xl accent-soft flex items-center justify-center flex-shrink-0">
          <LuCircleCheck className="w-4 h-4" />
        </div>
        <p className="text-xs sm:text-sm font-medium theme-heading break-words">{toastMessage}</p>
      </div>
    </div>
  );
}

