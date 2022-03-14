import { render, screen } from "@testing-library/react";
import ButtonComponent from "./ButtonComponent";

describe("ButtonComponent", () => {
  const TestedComponent = () => (
    <ButtonComponent
      buttonText="button text"
      onButtonClick={jest.fn()}
      isSubmit={true}
      loading={false}
    />
  );
  const TestedComponentSubmit = () => (
    <ButtonComponent
      buttonText="button text"
      onButtonClick={jest.fn()}
      isSubmit={true}
      loading={false}
    />
  );

  test("renders as button type", () => {
    render(<TestedComponent />);
    // screen.debug();
    expect(screen.getByText(/button text/i)).toBeInTheDocument();
  });
  test("renders as submit type", () => {
    render(<TestedComponentSubmit />);
    expect(screen.getByText(/button text/i)).toBeInTheDocument();
  });
  test("match snapshot", () => {
    render(<TestedComponent />);
    expect(screen).toMatchSnapshot();
  });
});
