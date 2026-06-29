import { NavLink } from "react-router-dom";
import {
  LoginContainer,
  SectionTitle,
  FormTable,
  ItemTitle,
  FromInput,
  Button,
  ThirdTitle,
  InputPsd,
} from "../styled/App.styled";
import { InfoProps } from "../Login";
import { useState } from "react";

interface LoginTemplateProps {
  information: InfoProps;
  loading: boolean;
  setInformation: React.Dispatch<React.SetStateAction<InfoProps>>;
  title: string;
  button: string;
  link: string;
  state: boolean;
  fuc: () => Promise<void>;
}

export const LoginTemplate = ({
  information,
  setInformation,
  loading,
  title,
  button,
  link,
  fuc,
  state,
}: LoginTemplateProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
          autoComplete="on"
          style={{ margin: "0" }}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <ItemTitle htmlFor="username">
            帳號:
            <FromInput
              onChange={(e) => handleOnChange(e, "account")}
              value={information.account}
              type="text"
              id="username"
              name="username"
            />
          </ItemTitle>

          <ItemTitle
            style={{ width: "100%", minWidth: "0px", position: "relative" }}
            htmlFor="password"
          >
            密碼:
            <FromInput
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              name="password"
              id="password"
              onChange={(e) => handleOnChange(e, "password")}
              value={information.password}
            />
            <InputPsd onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? "隱藏" : "顯示"}
            </InputPsd>
          </ItemTitle>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginRight: "8px",
              marginTop: "8PX",
            }}
          >
            {state && (
              <div style={{ textAlign: "end" }}>
                <ThirdTitle style={{ fontSize: "12px" }}>
                  帳號長度為8~20位,
                </ThirdTitle>
                <ThirdTitle style={{ fontSize: "12px" }}>
                  密碼需包含大小寫字母、數字、特殊字符，且長度為8~20位,
                </ThirdTitle>
              </div>
            )}
          </div>
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
          {loading ? (
            <Button disabled={true}>{state ? "註冊中" : "登入中"}</Button>
          ) : (
            <Button onClick={onclickFuc}>確認</Button>
          )}
        </div>
      </LoginContainer>
    </div>
  );
};
