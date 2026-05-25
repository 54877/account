import { useState } from "react";
import { LoginTemplate } from "./component/LoginTemplate";
import { infoProps } from "./Login";
import { useNavigate } from "react-router-dom";
import { register } from "./api/auth";
import axios from "axios";
import { toast } from "sonner";

export function Register() {
  const init = {
    account: "",
    password: "",
  };
  const [information, setInformation] = useState<infoProps>(init);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const registerApi = async () => {
    setLoading(true);
    try {
      await register(information.account, information.password);
      navigate("/account/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "請求錯誤");
        return;
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <LoginTemplate
        information={information}
        setInformation={setInformation}
        title="註冊"
        button="登入"
        loading={loading}
        state={true}
        link="/account/"
        fuc={registerApi}
      />
    </>
  );
}
