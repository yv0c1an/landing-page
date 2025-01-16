import { Modal, ModalContent, ModalBody, Spinner } from "@nextui-org/react";
import { useEffect } from "react";

interface RedirectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRedirect: () => void;
  title: string;
  redirectDelay?: number; // 延迟时间，默认 1.5 秒
}

export const RedirectModal: React.FC<RedirectModalProps> = ({
  isOpen,
  onClose,
  onRedirect,
  title,
  redirectDelay = 1500
}) => {
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
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      hideCloseButton
      className="bg-white/70 backdrop-blur-md"
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: 20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>
        <ModalBody className="py-8 flex flex-col items-center gap-4">
          <Spinner color="primary" size="lg" />
          <p className="text-lg text-center">{title}</p>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
