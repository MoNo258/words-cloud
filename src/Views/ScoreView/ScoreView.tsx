import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "semantic-ui-react";

const ScoreView: React.FC = () => {
  const navigate = useNavigate();
  const idParam = window.location.pathname;
  const [isLoading, setIsLoading] = React.useState(false);
  const [userName, setUserName] = React.useState<IUser["name"]>("");
  const [pointsTotal, setPointsTotal] = React.useState<number>(0);

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Header as="h3">{`Congratulations, ${userName}!`}</Header>
        <Header as="h3">Your score:</Header>
        <Header as="h3">{`${pointsTotal} points`}</Header>
      </div>
    </React.Fragment>
  );
};

export default ScoreView;
