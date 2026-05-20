import { useState } from "react";
import { LoginTemplate } from "./component/LoginTemplate";
import { login } from "./api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

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
  const [loading, setLoading] = useState<boolean>(false);
  const loginApi = async () => {
    setLoading(true);
    try {
      const res = await login(information.account, information.password);
      const token = res.data.accessToken;
      if (!token) {
        return;
      }
      sessionStorage.setItem("GSIMS_Token", token);
      toast.success("登入成功");
      navigate("/charge");
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
        title="登入"
        button="註冊"
        loading={loading}
        link="/register"
        state={false}
        fuc={loginApi}
      />
    </>
  );
}
