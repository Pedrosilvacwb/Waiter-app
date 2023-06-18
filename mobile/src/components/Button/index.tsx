import React from "react";
import { Container } from "./styles";
import { Text } from "../Text";
import { ActivityIndicator } from "react-native";

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const Button = ({ children, onPress, disabled, loading }: ButtonProps) => {
  return (
    <Container onPress={onPress} disabled={disabled || loading}>
      {!loading && (
        <Text weight={600} color={"#fff"}>
          {children}
        </Text>
      )}

      {loading && <ActivityIndicator color="#fff" />}
    </Container>
  );
};

export default Button;
