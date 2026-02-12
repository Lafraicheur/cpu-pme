"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useCookieConsentContext } from "./CookieConsentProvider";

interface CookiePreferencesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categories = [
  {
    id: "essential" as const,
    label: "Cookies essentiels",
    description:
      "Nécessaires au fonctionnement du site. Ils permettent la navigation et l'accès aux fonctionnalités de base.",
    alwaysOn: true,
  },
  {
    id: "analytics" as const,
    label: "Cookies analytiques",
    description:
      "Nous aident à comprendre comment les visiteurs utilisent le site afin d'améliorer votre expérience.",
    alwaysOn: false,
  },
  {
    id: "marketing" as const,
    label: "Cookies marketing",
    description:
      "Utilisés pour vous proposer des contenus et offres adaptés à vos centres d'intérêt.",
    alwaysOn: false,
  },
];

export function CookiePreferencesDialog({
  open,
  onOpenChange,
}: CookiePreferencesDialogProps) {
  const { preferences, savePreferences, rejectAll } =
    useCookieConsentContext();

  const [localAnalytics, setLocalAnalytics] = useState(preferences.analytics);
  const [localMarketing, setLocalMarketing] = useState(preferences.marketing);

  useEffect(() => {
    if (open) {
      setLocalAnalytics(preferences.analytics);
      setLocalMarketing(preferences.marketing);
    }
  }, [open, preferences.analytics, preferences.marketing]);

  const handleSave = () => {
    savePreferences({
      essential: true,
      analytics: localAnalytics,
      marketing: localMarketing,
    });
    onOpenChange(false);
  };

  const handleRejectAll = () => {
    rejectAll();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] z-[70] bg-white">
        <DialogHeader>
          <DialogTitle>Paramétrer les cookies</DialogTitle>
          <DialogDescription>
            Choisissez les catégories de cookies que vous acceptez.
            Les cookies essentiels ne peuvent pas être désactivés.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {categories.map((cat) => {
            const checked =
              cat.id === "essential"
                ? true
                : cat.id === "analytics"
                  ? localAnalytics
                  : localMarketing;
            const onCheckedChange =
              cat.id === "analytics"
                ? setLocalAnalytics
                : cat.id === "marketing"
                  ? setLocalMarketing
                  : undefined;

            return (
              <div
                key={cat.id}
                className="flex items-start justify-between gap-4 rounded-lg border border-gray-200 p-4"
              >
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900">
                    {cat.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {cat.description}
                  </p>
                </div>
                <Switch
                  checked={checked}
                  onCheckedChange={onCheckedChange}
                  disabled={cat.alwaysOn}
                  className="data-[state=checked]:bg-[#F08223] shrink-0 mt-0.5"
                />
              </div>
            );
          })}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={handleRejectAll}
            className="border-gray-300 text-gray-700"
          >
            Tout refuser
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#F08223] hover:bg-[#d46f1a] text-white"
          >
            Enregistrer mes préférences
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
