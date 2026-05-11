import { useState } from "react";
import { LoginTemplate } from "./component/LoginTemplate";

export interface infoProps {
  account: string;
  password: string;
}

export function Login() {
  const init = {
    account: "",
    password: "",
  };
  const [information, setInformation] = useState<infoProps>(init);
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
      />
    </>
  );
}
