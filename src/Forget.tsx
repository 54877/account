import { useState } from "react";
import { LoginTemplate } from "./component/LoginTemplate";
import { infoProps } from "./Login";

export function Forget() {
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
        title="忘記密碼"
        button="登入"
        secButton="註冊"
        link="/"
        secLink="/register"
        state={true}
      />
    </>
  );
}
