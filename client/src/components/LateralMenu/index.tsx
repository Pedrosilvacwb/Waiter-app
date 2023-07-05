import { Container, Tabs, TabContainer, Logo } from "./styles";
import { managementTabs, profileTabs } from "../../constants";
import { useNavigate } from "react-router-dom";

const LateralMenu = ({ tabName }: { tabName: string }) => {
  const navigate = useNavigate();

  const handleChangeTab = (tab: string) => {
    navigate(tab);
  };
  return (
    <Container>
      <Logo>
        <strong>W</strong>A
      </Logo>
      <Tabs>
        {managementTabs.map((tab) => (
          <TabContainer
            onClick={() => handleChangeTab(tab.tab)}
            color={tabName === tab.tab ? "#d73035" : "#666"}
            key={tab.title}
          >
            <img src={tab.icon} alt={tab.title} />
            <span>{tab.title}</span>

            <div
              className={tabName === tab.tab ? "selected" : "unselected"}
            ></div>
          </TabContainer>
        ))}
      </Tabs>
      <Tabs>
        {profileTabs.map((tab) => (
          <TabContainer
            onClick={() => {
              handleChangeTab(tab.tab);
              localStorage.clear();
            }}
            color={tabName === tab.tab ? "#d73035" : "#666"}
            key={tab.title}
          >
            <img src={tab.icon} alt={tab.title} />
            <span>{tab.title}</span>
            <div
              className={tabName === tab.tab ? "selected" : "unselected"}
            ></div>
          </TabContainer>
        ))}
      </Tabs>
    </Container>
  );
};

export default LateralMenu;
