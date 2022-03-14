// import _times from "lodash/times";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ButtonProps } from "semantic-ui-react";
import styled from "styled-components";
import { LoginView } from "../LoginView";

export const HomeStyled = styled.div`
  margin: 2rem;
`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = React.useState<IApiResponse["question"]>("");
  const [allWords, setAllWords] = React.useState<IApiResponse["all_words"]>([]);
  const [goodWords, setGoodWords] = React.useState<IApiResponse["good_words"]>(
    []
  );
  const [isLoading, setIsLoading] = React.useState(true);
  // const manySkeletons = _times(3, (i: number) => <SkeletonList key={i} />);
  const [cloudData, setCloudData] = React.useState<CloudData>([]);
  const [userName, setUserName] = React.useState<IUser["name"]>("");
  const [pointsTotal, setPointsTotal] = React.useState<number>(0);

  // React.useEffect(() => {
  //   getWords()
  //     .then((data) => {
  //       setQuestion(data.question);
  //       setAllWords(data.all_words);
  //       setGoodWords(data.good_words);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setIsLoading(false);
  //     });
  // }, []);
  // React.useEffect(() => {
  //   setCloudData([...allWords.map((word) => ({ text: word, value: 10 }))]);
  // }, [allWords]);
  React.useEffect(() => {
    window.localStorage.removeItem("user");
    // window.localStorage.getItem("user");
    // setUserName(()=>)
    // window.localStorage.getItem("user") && JSON.parse(window.localStorage.getItem("user"));
  }, []);
  console.log(
    'window.localStorage.getItem("user"):',
    window.localStorage.getItem("user")
  );
  // console.log('window.localStorage.getItem("user"):', JSON.parse(window.localStorage.getItem("user"));

  const submitFormHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => {
    console.log("submitFormHandler");
    console.log("data:", data);
    console.log("event:", event.currentTarget.value);
    console.log("event:", event.currentTarget.formAction);
    const person = {
      name: "Obaseki Nosa",
    };
    window.localStorage.setItem("user", JSON.stringify(person));
  };

  return (
    <HomeStyled className="home">
      <LoginView />

      {/* <ScoreView /> */}
    </HomeStyled>
  );
};

export default Home;
