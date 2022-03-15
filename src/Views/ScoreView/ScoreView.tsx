import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "semantic-ui-react";
import ButtonComponent from "src/Components/ButtonComponent";
import styled from "styled-components";

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  h3.ui.header {
    margin: 10px;
  }
`;

type ScoreViewProps = {
  pointsTotal: number;
};
const ScoreView: React.FC<ScoreViewProps> = ({ pointsTotal }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState<IUser["name"]>("");

  React.useEffect(() => {
    const stringUser =
      window.localStorage.getItem("user") === null
        ? ""
        : window.localStorage.getItem("user");
    const objectUser = stringUser && JSON.parse(stringUser);
    setUserName(objectUser?.name);
  }, []);

  return (
    <StyledHeader>
      <Header as="h3">{`Congratulations, ${userName}!`}</Header>
      <Header as="h3">Your score:</Header>
      <Header as="h3" color="blue">{`${pointsTotal} points`}</Header>
      <ButtonComponent buttonText="home" onButtonClick={() => navigate("/")} />
    </StyledHeader>
  );
};

export default ScoreView;
