import { Container } from "./styles";

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  icon?: string;
}

const Button = ({ label, onClick, disabled, icon }: ButtonProps) => {
  return (
    <Container disabled={disabled} onClick={onClick}>
      {icon} {label}
    </Container>
  );
};

export default Button;
