import { useState } from "react";
import { LoginTemplate } from "./component/LoginTemplate";
import { infoProps } from "./Login";

export function Register() {
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
        title="註冊"
        button="登入"
        secButton="忘記密碼"
        link="/"
        secLink="/forget"
        state={false}
      />
    </>
  );
}
