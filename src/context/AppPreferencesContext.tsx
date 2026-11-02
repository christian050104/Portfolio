"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  useSyncExternalStore,
} from "react";

export type Locale = "id" | "en";
export type ThemeMode = "dark" | "light";

export const CONTACT_EMAIL = "christianpanjaitan789@gmail.com";

const LOCALE_KEY = "cj-portfolio-locale";
const THEME_KEY = "cj-portfolio-theme";
const PREF_EVENT = "cj-portfolio-pref-change";

function subscribePrefs(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(PREF_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(PREF_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getLocaleSnapshot(): Locale {
  try {
    const val = localStorage.getItem(LOCALE_KEY);
    return val === "en" ? "en" : "id";
  } catch {
    return "id";
  }
}

function getThemeSnapshot(): ThemeMode {
  try {
    const val = localStorage.getItem(THEME_KEY);
    return val === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

interface AppPreferencesContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  resumeOpen: boolean;
  openResume: () => void;
  closeResume: () => void;
  toastMessage: string | null;
  showToast: (message: string) => void;
  copyEmail: () => void;
  emailCopied: boolean;
}

const AppPreferencesContext = createContext<AppPreferencesContextValue | null>(null);

export function AppPreferencesProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore<Locale>(subscribePrefs, getLocaleSnapshot, () => "id");
  const theme = useSyncExternalStore<ThemeMode>(subscribePrefs, getThemeSnapshot, () => "dark");

  const [resumeOpen, setResumeOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync external DOM attributes cleanly
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const setLocale = useCallback((next: Locale) => {
    try {
      localStorage.setItem(LOCALE_KEY, next);
      window.dispatchEvent(new Event(PREF_EVENT));
    } catch {
      // ignore storage errors
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "id" ? "en" : "id");
  }, [locale, setLocale]);

  const setTheme = useCallback((next: ThemeMode) => {
    try {
      localStorage.setItem(THEME_KEY, next);
      window.dispatchEvent(new Event(PREF_EVENT));
    } catch {
      // ignore storage errors
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  }, []);

  const copyEmail = useCallback(() => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(CONTACT_EMAIL).catch(() => {});
    }
    setEmailCopied(true);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setEmailCopied(false), 2500);

    showToast(
      locale === "id"
        ? `Email disalin: ${CONTACT_EMAIL}`
        : `Email copied: ${CONTACT_EMAIL}`
    );
  }, [locale, showToast]);

  const openResume = useCallback(() => setResumeOpen(true), []);
  const closeResume = useCallback(() => setResumeOpen(false), []);

  return (
    <AppPreferencesContext.Provider
      value={{
        locale,
        setLocale,
        toggleLocale,
        theme,
        setTheme,
        toggleTheme,
        resumeOpen,
        openResume,
        closeResume,
        toastMessage,
        showToast,
        copyEmail,
        emailCopied,
      }}
    >
      {children}
    </AppPreferencesContext.Provider>
  );
}

export function useAppPreferences() {
  const ctx = useContext(AppPreferencesContext);
  if (!ctx) {
    throw new Error("useAppPreferences must be used within AppPreferencesProvider");
  }
  return ctx;
}
