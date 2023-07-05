import React from "react";
import { Container } from "./styles";

const AppContainer = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};

export default AppContainer;
