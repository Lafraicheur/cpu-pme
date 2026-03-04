import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertCircle, CheckCircle } from "lucide-react";
import { ValidationError } from "@/lib/validation-helpers";

interface ValidationErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  errors: ValidationError[];
  isSuccess?: boolean;
  successTitle?: string;
  successMessage?: string;
}

export const ValidationErrorModal = ({
  isOpen,
  onClose,
  errors,
  isSuccess = false,
  successTitle = "Succès",
  successMessage = "Opération réussie",
}: ValidationErrorModalProps) => {
  if (!isOpen) return null;

  // Mode succès
  if (isSuccess) {
    return (
      <AlertDialog open={isOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <AlertDialogTitle className="text-green-600">
                {successTitle}
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-gray-700">
              {successMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction
            onClick={onClose}
            className="bg-green-600 hover:bg-green-700"
          >
            Fermer
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  // Mode erreurs
  const errorCount = errors.length;
  const hasErrors = errors.some((e) => e.severity === "error");
  const hasWarnings = errors.some((e) => e.severity === "warning");

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <AlertDialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
            <AlertDialogTitle className="text-red-600">
              {errorCount} erreur{errorCount > 1 ? "s" : ""} détectée{errorCount > 1 ? "s" : ""}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-gray-700">
            Veuillez corriger les champs suivants avant de soumettre votre demande:
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Liste des erreurs */}
        <div className="space-y-3 my-4 pr-4">
          {errors.map((error, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border-l-4 flex gap-3 ${
                error.severity === "error"
                  ? "bg-red-50 border-red-400"
                  : "bg-yellow-50 border-yellow-400"
              }`}
            >
              <div className="flex-shrink-0 pt-0.5">
                <AlertCircle
                  className={`h-5 w-5 ${
                    error.severity === "error"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                />
              </div>
              <div>
                <p
                  className={`font-medium ${
                    error.severity === "error"
                      ? "text-red-900"
                      : "text-yellow-900"
                  }`}
                >
                  {error.field.replace(/([A-Z])/g, " $1").trim()}
                </p>
                <p
                  className={`text-sm mt-0.5 ${
                    error.severity === "error"
                      ? "text-red-700"
                      : "text-yellow-700"
                  }`}
                >
                  {error.message}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Aide supplémentaire */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
          <p className="text-sm text-blue-900">
            <span className="font-medium">💡 Conseil:</span> Vérifiez chaque champ en surlignant
            l'erreur indiquée. Les messages vous aident à corriger exactement ce qu'il faut.
          </p>
        </div>

        <AlertDialogAction
          onClick={onClose}
          className="bg-red-600 hover:bg-red-700 mt-4"
        >
          Corriger les erreurs
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ValidationErrorModal;
