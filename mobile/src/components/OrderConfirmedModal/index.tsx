import React from "react";
import { Modal } from "react-native";
import { Container, OkButton } from "./styled";
import { CheckCircle } from "../Icons/CheckCircle";
import { Text } from "../Text";

interface OrderConfirmedModalProps {
  visible: boolean;
  onClose: () => void;
}

const OrderConfirmedModal = ({
  visible,
  onClose,
}: OrderConfirmedModalProps) => {
  return (
    <Modal onRequestClose={onClose} animationType="slide" visible={visible}>
      <Container>
        <CheckCircle />
        <Text style={{ marginTop: 12 }} color="#fff" size={20} weight="600">
          Pedido confirmado
        </Text>
        <Text style={{ marginTop: 4 }} color="#fff" opacity={0.9}>
          O pedido já entrou na fila de produção
        </Text>
        <OkButton onPress={onClose}>
          <Text weight="600" color="#d73035">
            OK
          </Text>
        </OkButton>
      </Container>
    </Modal>
  );
};

export default OrderConfirmedModal;
