import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Header } from "semantic-ui-react";
import { getWords } from "src/Api";
import ButtonComponent from "../../Components/ButtonComponent";

export type LoginViewProps = {
  loading?: boolean;
};
const LoginView: React.FC<LoginViewProps> = ({ loading }) => {
  const navigate = useNavigate();
  const [question, setQuestion] = React.useState<IApiResponse["question"]>("");
  const [allWords, setAllWords] = React.useState<IApiResponse["all_words"]>([]);
  const [goodWords, setGoodWords] = React.useState<IApiResponse["good_words"]>(
    []
  );
  const [isLoading, setIsLoading] = React.useState(true);
  const [cloudData, setCloudData] = React.useState<CloudData>([]);
  const [userName, setUserName] = React.useState<IUser["name"]>("");
  const [pointsTotal, setPointsTotal] = React.useState<number>(0);

  React.useEffect(() => {
    getWords()
      .then((data) => {
        setQuestion(data.question);
        setAllWords(data.all_words);
        setGoodWords(data.good_words);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);
  React.useEffect(() => {
    setCloudData([...allWords.map((word) => ({ text: word, value: 10 }))]);
  }, [allWords]);
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
