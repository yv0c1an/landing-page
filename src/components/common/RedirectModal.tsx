import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTranslations } from "next-intl";

interface RedirectModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

export const RedirectModal = ({ isOpen, onClose, url }: RedirectModalProps) => {
  const t = useTranslations('common');

  const handleConfirm = () => {
    if (url) {
      window.location.href = url;
    }
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('redirectModal.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('redirectModal.description')}
            <div className="mt-2 p-2 bg-gray-100 rounded break-all">
              {url}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('redirectModal.cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            {t('redirectModal.confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
