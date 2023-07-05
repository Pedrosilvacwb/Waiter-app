import React from "react";
import { Container } from "./styles";

interface FormGroupProps {
  label: string;
  children: React.ReactNode;
  htmlFor: string;
  error?: boolean;
}

const FormGroup = ({ label, children, htmlFor, error }: FormGroupProps) => {
  return (
    <Container error={error}>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </Container>
  );
};

export default FormGroup;
