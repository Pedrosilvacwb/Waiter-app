import { ProductProps } from "../../types";
import { Container } from "./styles";
interface ButtonProps {
  label: string;
  onClick?: () => void | (({ product }: { product: ProductProps }) => void);
  icon?: string;
  disabled?: boolean;
}

const CancelButton = ({ label, onClick, icon, disabled }: ButtonProps) => {
  return (
    <Container disabled={disabled} onClick={onClick}>
      {icon && (
        <>
          <img src={icon} alt="" />
        </>
      )}
      {label}
    </Container>
  );
};

export default CancelButton;
