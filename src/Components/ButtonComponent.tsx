import * as React from "react";
import { Button, ButtonProps } from "semantic-ui-react";

export type ButtonComponentProps = {
  buttonText: string;
  onButtonClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => void;
  isDisabled?: boolean;
  isSubmit?: boolean;
  loading?: boolean;
  hasMarginTop?: boolean;
};

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  loading,
  isDisabled,
  isSubmit,
  buttonText,
  onButtonClick,
  hasMarginTop,
}) => {
  return (
    <div style={{ marginTop: `${hasMarginTop ? "20px" : 0}` }}>
      <Button
        basic
        color="blue"
        loading={loading}
        type={isSubmit ? "submit" : "button"}
        onClick={onButtonClick}
        disabled={!!isDisabled}
      >
        {buttonText}
      </Button>
    </div>
  );
};
export default ButtonComponent;
