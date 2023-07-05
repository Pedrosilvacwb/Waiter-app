import CancelButton from "../CancelButton";
import refresh from "../../assets/images/icons/interface/refresh.svg";
import { AppHeader, Content } from "./styles";

interface HomeProps {
  icon: string;
  page: string;
  label: string;
  isHome?: boolean;
  onOpenModal?: () => void;
}

const Header = ({ icon, page, label, isHome, onOpenModal }: HomeProps) => {
  return (
    <AppHeader>
      <Content>
        <div>
          <img src={icon} alt={page} />
          <strong>{page}</strong>
        </div>
        <span>{label}</span>
      </Content>

      {isHome && (
        <CancelButton
          icon={refresh}
          onClick={onOpenModal}
          label={"Reiniciar o dia"}
        />
      )}
    </AppHeader>
  );
};

export default Header;
