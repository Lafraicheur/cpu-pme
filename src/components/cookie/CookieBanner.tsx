"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCookieConsentContext } from "./CookieConsentProvider";
import { CookiePreferencesDialog } from "./CookiePreferencesDialog";

export function CookieBanner() {
  const { isLoaded, hasConsented, acceptAll, rejectAll } =
    useCookieConsentContext();
  const [showPreferences, setShowPreferences] = useState(false);

  const showBanner = isLoaded && !hasConsented;

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
          >
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4 sm:py-5">
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-base mb-1">
                    Confidentialité et Cookies sur le CPU-PME HUB
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Nous utilisons des cookies pour sécuriser votre
                    navigation et optimiser nos services. En continuant, vous
                    acceptez notre utilisation des cookies essentiels. Vous
                    pouvez consulter notre{" "}
                    <Link
                      href="/politique-de-confidentialite"
                      className="text-[#F08223] underline hover:text-[#d46f1a] transition-colors"
                    >
                      Politique de Confidentialité
                    </Link>{" "}
                    et gérer vos préférences.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Button
                    onClick={acceptAll}
                    className="bg-[#F08223] hover:bg-[#d46f1a] text-white font-medium"
                  >
                    Tout accepter
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowPreferences(true)}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Paramétrer
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={rejectAll}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Continuer sans accepter
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CookiePreferencesDialog
        open={showPreferences}
        onOpenChange={setShowPreferences}
      />
    </>
  );
}
