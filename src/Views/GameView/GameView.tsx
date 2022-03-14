import * as React from "react";
import WordCloud from "react-d3-cloud";
import { Header } from "semantic-ui-react";
import { getWords } from "src/Api";
import ButtonComponent from "../../Components/ButtonComponent";

export type GameViewProps = {
  loading?: boolean;
};
const GameView: React.FC<GameViewProps> = ({ loading }) => {
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
    setCloudData([...allWords.map((word) => ({ text: word, value: 5 }))]);
  }, [allWords]);

  return (
    <div
      style={{
        margin: "2rem",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Header as="h3">{question}</Header>
      <div
        style={{
          width: "40vw",
          border: "1px solid gray",
        }}
      >
        <WordCloud
          data={cloudData}
          width={200}
          height={200}
          font="Times"
          fontStyle="italic"
          fontWeight="bold"
          fontSize={(word) => Math.log2(word.value) * 5}
          spiral="rectangular"
          // rotate={(word) => word.value % 360}
          rotate={0}
          padding={5}
          random={Math.random}
          // fill={"black"}
          fill={(d: any, i: number) => console.log("render")}
          // fill={(d: any, i: number) => console.log("d:", d, "i:", i)}
          onWordClick={(event, d) => {
            console.log(`onWordClick: ${d.text}`);
          }}
        />
      </div>
      <ButtonComponent
        buttonText="check answers"
        onButtonClick={() => console.log("check")}
      />
    </div>
  );
};

export default GameView;
