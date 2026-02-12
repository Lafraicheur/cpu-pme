"use client";

import React, { createContext, useContext } from "react";
import { useCookieConsent } from "@/hooks/use-cookie-consent";

type CookieConsentContextType = ReturnType<typeof useCookieConsent>;

const CookieConsentContext = createContext<CookieConsentContextType | null>(
  null
);

export function CookieConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieConsent = useCookieConsent();

  return (
    <CookieConsentContext.Provider value={cookieConsent}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsentContext() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error(
      "useCookieConsentContext must be used within a CookieConsentProvider"
    );
  }
  return context;
}
