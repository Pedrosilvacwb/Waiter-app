import { useState } from "react";
import { Modal, Platform, TouchableOpacity } from "react-native";
import { Text } from "../Text";
import { Form, Input, ModalBody, ModalHeader, Overlay } from "./styles";
import { Close } from "../Icons/Close";
import Button from "../Button";

interface TableModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}

const TableModal = ({ visible, onClose, onSave }: TableModalProps) => {
  const [table, setTable] = useState("");

  const handleSave = () => {
    onSave(table);
    onClose();
    setTable("");
  };
  return (
    <Modal
      onRequestClose={onClose}
      animationType="fade"
      visible={visible}
      transparent
    >
      <Overlay behavior={Platform.OS === "android" ? "height" : "padding"}>
        <ModalBody>
          <ModalHeader>
            <Text weight="600">Informe a mesa</Text>
            <TouchableOpacity
              onPress={() => {
                onClose();
              }}
            >
              <Close color="#666" />
            </TouchableOpacity>
          </ModalHeader>
          <Form>
            <Input
              keyboardType="number-pad"
              placeholder="Número da mesa"
              placeHolderTextColor="#666"
              onChangeText={setTable}
            />
            <Button disabled={table.length === 0} onPress={handleSave}>
              Salvar
            </Button>
          </Form>
        </ModalBody>
      </Overlay>
    </Modal>
  );
};

export default TableModal;
