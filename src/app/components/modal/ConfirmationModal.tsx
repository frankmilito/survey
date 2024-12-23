import i18n from "@/app/locales/i18n";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
} from "@chakra-ui/react";

export type ConfirmationModalProps = {
  isOpen: boolean;
  title?: any;
  onClose: VoidFunction;
  bodyText?: string;
  confirmHandler?: VoidFunction;
  disclaimer?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  children?: JSX.Element;
  disableFooter?: boolean;
  size?: ModalProps["size"];
  headerSize?: ModalProps["size"];
};

export function ConfirmationModal({
  isOpen,
  title,
  bodyText,
  onClose,
  confirmHandler = () => null,
  disclaimer,
  cancelLabel = i18n.t("common.cancel"),
  confirmLabel = i18n.t("common.confirm"),
  disableFooter = false,
  children,
  size,
  headerSize = "md",
}: ConfirmationModalProps) {
  return (
    <Modal
      isCentered
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent gap="4" py="2" borderTop="5px" borderRadius="5px">
        <ModalHeader>
          <Text fontSize={headerSize}>{title}</Text>
        </ModalHeader>

        <ModalBody>
          {children && children}
          {bodyText && (
            <Text fontSize="md" mb="3">
              {bodyText}
            </Text>
          )}
          {disclaimer && <Text fontSize="xs">{disclaimer}</Text>}
        </ModalBody>

        {!disableFooter && (
          <ModalFooter gap="5">
            <Button variant="outline" onClick={onClose}>
              {cancelLabel}
            </Button>
            <Button
              colorScheme="brand"
              onClick={() => {
                confirmHandler();
                onClose();
              }}
            >
              {confirmLabel}
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ConfirmationModal;
