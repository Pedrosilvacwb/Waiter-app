import { ProductContainer } from "./styles";

import burguer from "../../../../assets/burger-molho-especial.png";
import Modal from "../../../../components/Modal";
import { CategoryProps, ProductProps } from "../../../../types";
import { api } from "../../../../utils/api";
import { formatCurrency } from "../../../../utils/FormatCurrency";

interface RemoveProductModal {
  visible: boolean;
  setProducts: React.Dispatch<React.SetStateAction<ProductProps[]>>;
  onClose: () => void;
  selectedProduct: ProductProps | undefined;
  productCategory: CategoryProps | undefined;
}

const RemoveProductModal = ({
  onClose,
  visible,
  selectedProduct,
  setProducts,
  productCategory,
}: RemoveProductModal) => {
  const handleRemoveProduct = async () => {
    api.delete(`/products/${selectedProduct?._id}`);
    setProducts((prev) =>
      prev.filter((product) => product._id !== selectedProduct?._id)
    );
    onClose();
  };
  return (
    <Modal
      onClose={onClose}
      visible={visible}
      title="Excluir Produto"
      actionLabel="Excluir Produto"
      cancelLabel="Manter Produto"
      onAction={handleRemoveProduct}
    >
      <span>Tem certeza que deseja excluir esse produto?</span>
      <ProductContainer>
        <img
          src={`http://192.168.0.13:3001/uploads/${selectedProduct?.imagePath}`}
          alt="Produto"
        />{" "}
        <div>
          <span>{`${productCategory?.icon} ${productCategory?.name}`}</span>
          <strong>{selectedProduct?.name}</strong>
          <span>{formatCurrency(selectedProduct?.price)}</span>
        </div>
      </ProductContainer>
    </Modal>
  );
};

export default RemoveProductModal;
