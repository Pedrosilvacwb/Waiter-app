import { Header } from "./styles";
import CancelButton from "../CancelButton";
import { ProductProps } from "../../types";

interface TableHeaderProps {
  label: string;
  quantity: number;
  action?: boolean;
  actionLabel?: string;
  onAction?: ({ product }: { product: ProductProps }) => void;
}

const TableHeader = ({
  label,
  quantity,
  action,
  onAction,
  actionLabel,
}: TableHeaderProps) => {
  return (
    <Header>
      <div>
        <strong>{label}</strong> <span>{quantity}</span>
      </div>

      {action && actionLabel && (
        <>
          <CancelButton onClick={onAction} label={actionLabel} />
        </>
      )}
    </Header>
  );
};

export default TableHeader;
