import close from "../../../../assets/images/icons/interface/close.svg";
import Button from "../../../../components/Button";
import CancelButton from "../../../../components/CancelButton";
import {
  Overlay,
  Content,
  ProductDetails,
  ProductIngredients,
  IngredientsList,
  ModalFooter,
  NoResult,
} from "./styles";
import img from "../../../../assets/images/img.png";
import image from "../../../../assets/images/icons/interface/image.svg";
import FormGroup from "../../../../components/FormGroup";
import Input from "../../../../components/input";
import useAnimatedUnmount from "../../../../hooks/useAnimatedUnmount";
import { useState, useEffect, useRef, SetStateAction } from "react";
import {
  CategoryProps,
  IngredientProps,
  ProductProps,
} from "../../../../types";
import { api } from "../../../../utils/api";
import NewIngredientModal from "../NewIngredientModal";

import { toast } from "react-toastify";

import useErrors from "../../../../hooks/useErrors";

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  getProducts: () => void;
  selectedProduct?: ProductProps | undefined;
  setSelectedProduct: React.Dispatch<SetStateAction<ProductProps | undefined>>;
}
const ProductModal = ({
  visible,
  onClose,
  getProducts,
  selectedProduct,
  setSelectedProduct,
}: ProductModalProps) => {
  const [ingredients, setIngredients] = useState<IngredientProps[]>([]);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [openIngredientModal, setIngredientModal] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [productForm, setProductForm] = useState({
    category: "",
    description: "",
    name: "",
    price: "",
  });
  const [picture, setPicture] = useState<string | Blob>("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { setError, removeError, getErrorMenssageByFieldName, errors } =
    useErrors();
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(visible);

  useEffect(() => {
    getIngredients();
    getCategories();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setProductForm({
        category: selectedProduct.category,
        description: selectedProduct.description,
        name: selectedProduct.name,
        price: selectedProduct.price?.toString(),
      });
      selectedProduct.ingredients?.length &&
        setSelectedIngredients(
          selectedProduct?.ingredients?.map((i) => i?._id as string)
        );
      setImageUrl(`http://localhost:3001/uploads/${selectedProduct.imagePath}`);
    } else {
      setProductForm({
        category: "",
        description: "",
        name: "",
        price: "",
      });
      setSelectedIngredients([]);
      setImageUrl("");
    }
  }, [visible, selectedProduct]);

  const handleOpenFileInput = () => {
    if (fileInputRef) {
      fileInputRef?.current?.click();
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e?.target?.files![0];
    setImageUrl(URL.createObjectURL(selectedFile));
    setPicture(selectedFile);
  };

  const getIngredients = () => {
    api
      .get("/ingredients")
      .then((res) => setIngredients(res.data))
      .catch((err) => console.log(err));
  };

  const getCategories = () => {
    api
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  };

  const handleOpenIngredientModal = () => {
    setIngredientModal(true);
  };

  const handleCloseIngredientModal = () => {
    setIngredientModal(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!value) {
      setError({ field: name, message: "Campo obrigatório." });
    } else {
      removeError(`${name}`);
    }
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectedIngredients((prev) => [...prev, value]);
    } else {
      setSelectedIngredients((prev) =>
        prev.filter((ingredient) => {
          return ingredient !== value;
        })
      );
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", productForm.name);
    formData.append("description", productForm.description);
    formData.append("image", picture);
    formData.append("price", productForm.price);
    formData.append("category", productForm.category);
    formData.append("ingredients", JSON.stringify(selectedIngredients));

    if (selectedProduct) {
      api
        .patch(`/products/${selectedProduct._id}`, formData)
        .then((res) => {
          onClose();
          getProducts();
          toast.success("Produto adicionado com sucesso!");
        })
        .catch((err) => {
          toast.error("Ocorreu um erro, Por Favor tente novamente mais tarde!");
        });

      setSelectedProduct(undefined);
    } else {
      api
        .post("/products", formData)
        .then((res) => {
          onClose();
          getProducts();
          toast.success("Produto adicionado com sucesso!");
        })
        .catch((err) => {
          toast.error("Ocorreu um erro, Por Favor tente novamente mais tarde!");
        });

      setSelectedProduct(undefined);
    }
  };

  const isFormValid =
    productForm.category &&
    productForm.name &&
    productForm.description &&
    productForm.price &&
    ingredients.length > 0 &&
    (picture || imageUrl) &&
    errors.length === 0;

  const filteredIngredients = ingredients.filter(
    (ingredient) =>
      ingredient?.name
        ?.toLowerCase()
        .includes(searchTerm.trim().toLowerCase()) ||
      ingredient?.icon?.includes(searchTerm)
  );

  if (!shouldRender) return null;

  return (
    <>
      <NewIngredientModal
        getIngredients={getIngredients}
        visible={openIngredientModal}
        onClose={handleCloseIngredientModal}
      />
      <Overlay isLeaving={!visible} onClick={onClose}>
        <Content
          ref={animatedElementRef}
          isLeaving={!visible}
          onClick={(e) => e.stopPropagation()}
        >
          <header>
            <strong>Novo Produto</strong>
            <button onClick={onClose}>
              <img src={close} alt="Botão de fechar modal" />
            </button>
          </header>
          <div className="modal-body">
            <ProductDetails>
              <div className="image-container">
                <strong>Imagem</strong>
                <div className="image">
                  <img src={imageUrl ? imageUrl : img} alt="" />
                  <CancelButton
                    onClick={handleOpenFileInput}
                    icon={image}
                    label="Alterar Imagem"
                  />
                  <Input
                    placeholder=""
                    error={getErrorMenssageByFieldName("image")}
                    name="image"
                    ref={fileInputRef}
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    accept=".jpg, .jpeg, .png"
                    multiple={false}
                  />
                </div>
              </div>
              <div className="product-details-container">
                <FormGroup htmlFor="name" label="Nome do Produto">
                  <Input
                    error={getErrorMenssageByFieldName("name")}
                    id="name"
                    name="name"
                    value={productForm.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Quatro Queijos"
                  />
                </FormGroup>
                <FormGroup htmlFor="description" label="Descrição">
                  <Input
                    id="description"
                    name="description"
                    value={productForm.description}
                    placeholder="Pizza de Quatro Queijos com borda tradicional"
                    maxLength={110}
                    onChange={handleChange}
                    error={getErrorMenssageByFieldName("description")}
                    type="text"
                  />
                </FormGroup>
              </div>

              <div className="category-container">
                <span>Categoria</span>
                <div className="categories">
                  {categories?.map((category) => (
                    <span
                      onClick={() =>
                        setProductForm((prev) => ({
                          ...prev,
                          category:
                            prev.category === category._id ? "" : category._id,
                        }))
                      }
                      id={category._id}
                      key={category._id}
                      className={
                        productForm.category === category._id ? "selected" : ""
                      }
                    >
                      {category.icon} {category.name}
                    </span>
                  ))}
                </div>
              </div>
            </ProductDetails>
            <ProductIngredients>
              <div className="ingredients-header">
                <strong>Ingredientes</strong>
                <CancelButton
                  onClick={handleOpenIngredientModal}
                  label="Novo Ingrediente"
                />
              </div>
              <FormGroup htmlFor="search" label="Busque o Ingrediente">
                <Input
                  id="search"
                  placeholder="ex: Cheddar"
                  error={false}
                  type="text"
                  name="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </FormGroup>

              <IngredientsList>
                {filteredIngredients?.map((i) => (
                  <div key={i._id}>
                    <span>
                      {i.icon} {i.name}
                    </span>
                    <input
                      onChange={handleSelect}
                      value={i._id}
                      type="checkbox"
                      checked={
                        i._id ? selectedIngredients.includes(i?._id) : false
                      }
                    />
                  </div>
                ))}
                {!!searchTerm.length && !filteredIngredients.length && (
                  <NoResult>
                    <strong>
                      Não foram encontrados ingredientes que correspondam a sua
                      busca!
                    </strong>
                  </NoResult>
                )}
              </IngredientsList>
              <FormGroup htmlFor="price" label="Preço">
                <Input
                  id="price"
                  placeholder="R$:0,00"
                  error={getErrorMenssageByFieldName("price")}
                  type="number"
                  name="price"
                  value={productForm.price}
                  onChange={handleChange}
                />
              </FormGroup>
            </ProductIngredients>
          </div>

          <ModalFooter>
            <Button
              disabled={!isFormValid}
              onClick={handleSubmit}
              label="Salver Produto"
            />
          </ModalFooter>
        </Content>
      </Overlay>
    </>
  );
};

export default ProductModal;
