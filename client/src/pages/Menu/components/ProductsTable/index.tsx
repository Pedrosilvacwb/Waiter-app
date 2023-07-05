import Table from "../../../../components/Table";
import TableHeader from "../../../../components/TableHeader";
import edit from "../../../../assets/images/icons/interface/edit.svg";
import remove from "../../../../assets/images/icons/interface/remove.svg";
import RemoveProductModal from "../RemoveProductModal";
import { useEffect, useState } from "react";

import ProductModal from "../ProductModal";
import { api } from "../../../../utils/api";
import { CategoryProps, ProductProps } from "../../../../types";

const headings = ["Imagem", "Nome", "Categoria", "Preço", "Ações"];

interface ProductsTableProps {
  categories: CategoryProps[];
}

const ProductsTable = ({ categories }: ProductsTableProps) => {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [products, setProducts] = useState<ProductProps[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<
    ProductProps | undefined
  >();

  const getProducts = async () => {
    await api.get("/products").then((res) => setProducts(res.data));
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleOpenRemoveModal = (product: ProductProps) => {
    setIsRemoveModalOpen(true);
    setSelectedProduct(product);
  };
  const handleCloseRemoveModal = () => {
    setIsRemoveModalOpen(false);
    setSelectedProduct(undefined);
  };
  const handleOpenProductModal = ({ product }: { product: ProductProps }) => {
    setIsProductModalOpen(true);
    console.log(product);

    if (product) {
      setSelectedProduct(product);
    }
  };

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(undefined);
  };

  const tableData = products.map((product) => ({
    values: [
      product.name,
      categories
        .map((c) => {
          if (c._id === product.category) {
            return `${c.icon} ${c.name}`;
          }
        })
        .join(""),
      product.price,
    ],
    actions: [
      {
        name: "Edit",
        icon: edit,
        action: () => handleOpenProductModal({ product: product }),
      },
      {
        name: "Remove",
        icon: remove,
        action: () => handleOpenRemoveModal(product),
      },
    ],
    images: {
      name: product.name,
      path: product.imagePath,
    },
  }));

  return (
    <>
      <RemoveProductModal
        productCategory={categories.find(
          (c) => c._id === selectedProduct?.category
        )}
        setProducts={setProducts}
        selectedProduct={selectedProduct}
        onClose={handleCloseRemoveModal}
        visible={isRemoveModalOpen}
      />
      <ProductModal
        getProducts={getProducts}
        visible={isProductModalOpen}
        onClose={handleCloseProductModal}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
      <TableHeader
        label="Produtos"
        quantity={products.length}
        action
        actionLabel="Novo Produto"
        onAction={handleOpenProductModal}
      />

      <Table values={tableData} headings={headings} />
    </>
  );
};

export default ProductsTable;
