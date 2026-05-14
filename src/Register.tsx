import { useState } from "react";
import { LoginTemplate } from "./component/LoginTemplate";
import { infoProps } from "./Login";
import { register } from "./styled/API";
import { useNavigate } from "react-router-dom";

export function Register() {
  const init = {
    account: "",
    password: "",
  };
  const [information, setInformation] = useState<infoProps>(init);
  const navigate = useNavigate();
  const registerApi = async () => {
    try {
      await register(information.account, information.password);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <LoginTemplate
        information={information}
        setInformation={setInformation}
        title="註冊"
        button="登入"
        secButton="忘記密碼"
        link="/"
        secLink="/forget"
        state={false}
        fuc={registerApi}
      />
    </>
  );
}
