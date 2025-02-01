import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RedirectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRedirect: () => void;
  title: string;
  redirectDelay?: number; // 延迟时间，默认 1.5 秒
}

export function RedirectModal({
  isOpen,
  onClose,
  onRedirect,
  title,
  redirectDelay = 1500
}: RedirectModalProps) {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      timer = setTimeout(() => {
        onRedirect();
        onClose();
      }, redirectDelay);
    }
    return () => clearTimeout(timer);
  }, [isOpen, onRedirect, onClose, redirectDelay]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
