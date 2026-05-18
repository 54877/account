import { useState } from "react";
import { LoginTemplate } from "./component/LoginTemplate";
import { login } from "./api/auth";
import { useNavigate } from "react-router-dom";

export interface infoProps {
  account: string;
  password: string;
}

export function Login() {
  const init = {
    account: "",
    password: "",
  };
  const navigate = useNavigate();
  const [information, setInformation] = useState<infoProps>(init);
  const loginApi = async () => {
    try {
      const res = await login(information.account, information.password);
      const token = res.data.accessToken;
      console.log(res);
      console.log(res.data.accessToken);
      if (!token) {
        return;
      }
      sessionStorage.setItem("GSIMS_Token", token);
      navigate("/account");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <LoginTemplate
        information={information}
        setInformation={setInformation}
        title="登入"
        button="註冊"
        secButton="忘記密碼"
        link="/register"
        secLink="/forget"
        state={false}
        fuc={loginApi}
      />
    </>
  );
}
