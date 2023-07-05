import React from "react";
import { Content, ModalFooter, Overlay } from "./Styles";
import close from "../../assets/images/icons/interface/close.svg";
import CancelButton from "../CancelButton";
import Button from "../Button";
import useAnimatedUnmount from "../../hooks/useAnimatedUnmount";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  onAction?: () => void;
  cancelLabel?: string | false;
  actionLabel?: string;
  children: React.ReactNode;
  title: string;
  onCancel?: () => Promise<void> | void;
  actionDisabled?: boolean;
}

const Modal = ({
  children,
  onAction,
  onClose,
  onCancel,
  visible,
  title,
  actionLabel,
  cancelLabel,
  actionDisabled,
}: ModalProps) => {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(visible);
  if (!shouldRender) return null;
  return (
    <Overlay isLeaving={!visible} onClick={onClose}>
      <Content
        ref={animatedElementRef}
        isLeaving={!visible}
        onClick={(e) => e.stopPropagation()}
      >
        <header>
          <strong>{title}</strong>
          <button onClick={onClose}>
            <img src={close} alt="Botão de fechar o modal" />
          </button>
        </header>
        {children}
        <ModalFooter>
          {cancelLabel && (
            <CancelButton
              onClick={onCancel ? onCancel : onClose}
              label={cancelLabel}
            />
          )}
          {actionLabel && onAction && (
            <Button
              disabled={actionDisabled}
              label={actionLabel}
              onClick={onAction}
            />
          )}
        </ModalFooter>
      </Content>
    </Overlay>
  );
};

export default Modal;
