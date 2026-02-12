"use client";

import { useState, useEffect, useCallback } from "react";

export interface CookiePreferences {
  essential: true;
  analytics: boolean;
  marketing: boolean;
}

interface CookieConsentData {
  preferences: CookiePreferences;
  consentDate: string;
}

const STORAGE_KEY = "cpupme_cookie_consent";
const EXPIRATION_MONTHS = 13;

const defaultPreferences: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

function isConsentExpired(consentDate: string): boolean {
  const date = new Date(consentDate);
  const expirationDate = new Date(date);
  expirationDate.setMonth(expirationDate.getMonth() + EXPIRATION_MONTHS);
  return new Date() > expirationDate;
}

function readStoredConsent(): CookieConsentData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data: CookieConsentData = JSON.parse(raw);
    if (isConsentExpired(data.consentDate)) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function writeConsent(preferences: CookiePreferences): void {
  const data: CookieConsentData = {
    preferences,
    consentDate: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useCookieConsent() {
  const [preferences, setPreferences] =
    useState<CookiePreferences>(defaultPreferences);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();
    if (stored) {
      setPreferences(stored.preferences);
      setHasConsented(true);
    }
    setIsLoaded(true);
  }, []);

  const acceptAll = useCallback(() => {
    const all: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    writeConsent(all);
    setPreferences(all);
    setHasConsented(true);
  }, []);

  const rejectAll = useCallback(() => {
    const minimal: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    writeConsent(minimal);
    setPreferences(minimal);
    setHasConsented(true);
  }, []);

  const savePreferences = useCallback((prefs: CookiePreferences) => {
    const safe: CookiePreferences = { ...prefs, essential: true };
    writeConsent(safe);
    setPreferences(safe);
    setHasConsented(true);
  }, []);

  const resetConsent = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setPreferences(defaultPreferences);
    setHasConsented(false);
  }, []);

  return {
    preferences,
    isLoaded,
    hasConsented,
    acceptAll,
    rejectAll,
    savePreferences,
    resetConsent,
  };
}
