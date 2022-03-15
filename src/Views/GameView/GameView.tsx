import * as React from "react";
import WordCloud from "react-d3-cloud";
import { Header } from "semantic-ui-react";
import { getWords } from "src/Api";
import ButtonComponent from "../../Components/ButtonComponent";
import { ScoreView } from "../ScoreView";

const GameView: React.FC = () => {
  const [question, setQuestion] = React.useState<IApiResponse["question"]>("");
  const [allWords, setAllWords] = React.useState<IApiResponse["all_words"]>([]);
  const [goodWords, setGoodWords] = React.useState<IApiResponse["good_words"]>(
    []
  );
  const [isLoading, setIsLoading] = React.useState(true);
  const [cloudData, setCloudData] = React.useState<CloudData>([]);
  let correctCount: number = 0;
  let wrongCount: number = 0;
  let correctIndex: number[] = [];
  let wrongIndex: number[] = [];
  const [pointsTotal, setPointsTotal] = React.useState<number>(0);
  const [displayAnswers, setDisplayAnswers] = React.useState<boolean>(false);
  const [displayScore, setDisplayScore] = React.useState<boolean>(false);

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
    setCloudData([...allWords.map((word, i) => ({ text: word, value: i }))]);
  }, [allWords]);

  const handleCheck = () => {
    setPointsTotal(() => correctCount * 2 - (wrongCount + goodWords.length));
    setDisplayAnswers(true);
  };
  const handleFinish = () => {
    setDisplayScore(true);
  };

  const handleWordClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    d: any
  ) => {
    // event.currentTarget.style.fill = "blue"; // this changes root so it is not correct
    // console.log("event:", event);
    // console.log("d.value:", d.value); // value is basically an index for each word
    // FIXME: I don't know how to change color for one word
    const isCorrect = goodWords.includes(d.text);
    if (isCorrect) {
      const index = goodWords.findIndex((word) => word === d.text);
      goodWords.splice(index, 1);
      correctCount++;
      correctIndex.push(d.value);
    } else {
      wrongCount++;
      wrongIndex.push(d.value);
    }
  };

  return (
    <div
      style={{
        margin: "2rem",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {displayScore ? (
        <ScoreView pointsTotal={pointsTotal} />
      ) : (
        <React.Fragment>
          <Header as="h3">{question}</Header>
          <div
            style={{
              width: "40vw",
              border: "1px solid gray",
            }}
          >
            {allWords.length > 0 && !displayAnswers && (
              <WordCloud
                data={cloudData}
                width={200}
                height={200}
                font="Times"
                fontStyle="italic"
                fontWeight="bold"
                fontSize={12}
                spiral="rectangular"
                rotate={0}
                padding={5}
                random={Math.random}
                fill="black"
                onWordClick={(
                  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
                  d
                ) => {
                  handleWordClick(event, d);
                }}
              />
            )}
            {allWords.length > 0 && displayAnswers && (
              <WordCloud
                data={cloudData}
                width={200}
                height={200}
                font="Times"
                fontStyle="italic"
                fontWeight="bold"
                fontSize={12}
                spiral="rectangular"
                rotate={0}
                padding={5}
                random={Math.random}
                fill={(d: any, i: number) =>
                  // FIXME: this isn't working
                  correctIndex.includes(i)
                    ? "green"
                    : wrongIndex.includes(i)
                    ? "red"
                    : "black"
                }
              />
            )}
          </div>
          {!displayAnswers && (
            <ButtonComponent
              buttonText="check answers"
              onButtonClick={handleCheck}
              hasMarginTop
            />
          )}
          {displayAnswers && (
            <ButtonComponent
              buttonText="finish game"
              onButtonClick={handleFinish}
              hasMarginTop
            />
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default GameView;
