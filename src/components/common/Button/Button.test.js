import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "../../../../Theme";
import CustomButton from "./Button";
import { shallow } from "enzyme";

const MockCustomButton = ({label}) => {
  return (
    <ThemeProvider theme={Theme}>
      <CustomButton label={label} />
    </ThemeProvider>
  );
};

describe("test ui block",()=>{
  test("should render same text that passed in label prop", async () => {
    render(<MockCustomButton label={'test label'} />);
    const button = screen.queryByText(/test label/i);
    expect(button).toBeInTheDocument();
  });
  
  test("should render and user can see it in screen", async () => {
    render(<MockCustomButton label={'test label'} />);
    const button = screen.queryByText(/test label/i);
    expect(button).toBeVisible();
  });


  it('Test click event', () => {
    const mockCallBack = jest.fn();
    const button = shallow((<MockCustomButton onClick={mockCallBack}>Ok!</MockCustomButton>));
    button.find('button').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
})

