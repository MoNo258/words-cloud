import React from "react";
import styled from "styled-components";
import { LoginView } from "../LoginView";

export const HomeStyled = styled.div`
  margin: 2rem;
  height: 90vh;
  display: flex;
  align-items: center;
`;

const Home: React.FC = () => {
  React.useEffect(() => {
    window.localStorage.removeItem("user");
  }, []);

  return (
    <HomeStyled className="home">
      <LoginView />
    </HomeStyled>
  );
};

export default Home;
