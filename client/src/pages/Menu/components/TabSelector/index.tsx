import { Container } from "./styles";

interface TabSelectorProps {
  selectedTab: string;
  onChangeTab: (name: string) => void;
}

const TabSelector = ({ onChangeTab, selectedTab }: TabSelectorProps) => {
  return (
    <Container>
      <button
        onClick={(e) => onChangeTab(e.currentTarget.name)}
        name="Produtos"
        className={selectedTab === "Produtos" ? "selected" : "unselected"}
      >
        <span>Produtos</span>
      </button>
      <button
        onClick={(e) => onChangeTab(e.currentTarget.name)}
        name="Categorias"
        className={selectedTab === "Categorias" ? "selected" : "unselected"}
      >
        <span>Categorias</span>
      </button>
    </Container>
  );
};

export default TabSelector;
