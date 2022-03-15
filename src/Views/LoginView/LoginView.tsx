import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Header } from "semantic-ui-react";
import ButtonComponent from "../../Components/ButtonComponent";

const LoginView: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState<IUser["name"]>("");

  const submitFormHandler = () => {
    window.localStorage.setItem("user", JSON.stringify({ name: userName }));
    navigate("/game");
  };
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  return (
    <Container textAlign="center" text>
      <Header as="h1">Wordcloud game</Header>
      <Form>
        <Form.Input
          type="nickname"
          placeholder="nickname"
          onChange={(e) => onInputChange(e)}
        />
        <ButtonComponent
          buttonText="play"
          isSubmit
          onButtonClick={submitFormHandler}
          isDisabled={userName.length === 0}
        />
      </Form>
    </Container>
  );
};

export default LoginView;
