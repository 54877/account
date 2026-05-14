import { NavLink } from "react-router-dom";
import {
  LoginContainer,
  SectionTitle,
  FormTable,
  ItemTitle,
  FromInput,
  Button,
} from "../styled/App.styled";
import { infoProps } from "../Login";

interface LoginTemplateProps {
  information: infoProps;
  setInformation: React.Dispatch<React.SetStateAction<infoProps>>;
  title: string;
  button: string;
  secButton: string;
  state: boolean;
  link: string;
  secLink: string;
  fuc: () => Promise<void>;
}

export const LoginTemplate = ({
  information,
  setInformation,
  title,
  button,
  secButton,
  state,
  link,
  secLink,
  fuc,
}: LoginTemplateProps) => {
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "account" | "password",
  ) => {
    setInformation((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const onclickFuc = () => {
    fuc();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 100px)",
        paddingBottom: "100px",
      }}
    >
      <LoginContainer>
        <SectionTitle style={{ margin: 0 }}>{title}</SectionTitle>
        <FormTable
          style={{ margin: "0" }}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <ItemTitle htmlFor="帳號">
            帳號:
            <FromInput
              onChange={(e) => handleOnChange(e, "account")}
              value={information.account}
              type="text"
              id="帳號"
              name="帳號"
            />
          </ItemTitle>
          {!state ? (
            <ItemTitle
              style={{ width: "100%", minWidth: "0px" }}
              htmlFor="密碼"
            >
              密碼:
              <FromInput
                onChange={(e) => handleOnChange(e, "password")}
                value={information.password}
                type="text"
                id="密碼"
                name="密碼"
              />
            </ItemTitle>
          ) : (
            ""
          )}
        </FormTable>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignContent: "center",
            gap: "16px",
            width: "100%",
            marginRight: "16px",
          }}
        >
          <NavLink to={link}>
            <Button>{button}</Button>
          </NavLink>
          <NavLink to={secLink}>
            <Button>{secButton}</Button>
          </NavLink>

          <Button onClick={onclickFuc}>確認</Button>
        </div>
      </LoginContainer>
    </div>
  );
};
