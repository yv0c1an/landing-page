import { useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface RedirectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  error?: string | null;
}

export function RedirectModal({
  isOpen,
  onClose,
  title,
  error
}: RedirectModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {error && (
            <DialogDescription className="text-red-500 flex items-center gap-2 mt-2">
              <AlertCircle className="h-5 w-5" />
              {error}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="flex items-center justify-center py-8">
          {!error && <Loader2 className="h-8 w-8 animate-spin text-primary" />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
