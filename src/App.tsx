import { useEffect, useState } from "react";
import {
  Body,
  BoxType,
  Button,
  ButtonFlexContainer,
  CenterBox,
  Container,
  FormTable,
  FromInput,
  HeaderTitle,
  SectionTitle,
  SelectInput,
  SelectLabel,
  ThirdTitle,
} from "./styled/App.styled";
import { getData, postData } from "./styled/API";

export interface DataItem {
  id?: string;
  category: string;
  amount: string;
  type: "income" | "expense";
  description: string;
}

export function App() {
  const [data, setData] = useState<DataItem[]>([]);
  const [state, setState] = useState<boolean>(true);
  const [information, setInformation] = useState<DataItem>({
    category: "",
    amount: "",
    type: "expense",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData();
        setData(res);
      } catch (err) {
        console.error("抓取資料失敗:", err);
      }
    };

    fetchData();
  }, [state]);

  //information值
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    type: "category" | "amount" | "description" | "type",
  ) => {
    setInformation((prev) => ({
      ...prev,
      [type]: e.target.value,
    }));
  };

  //新增紀錄API
  const postDataApi = async () => {
    try {
      await postData(information);
      setState((prev) => !prev);
    } catch (err) {
      console.error("新增資料失敗:", err);
    }
  };

  useEffect(() => {
    console.log(information);
    console.log(data);
  }, [information, data]);

  return (
    <Body>
      <Container>
        <header
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="72px"
            viewBox="0 -960 960 960"
            width="72px"
            fill="#EAC452"
          >
            <path d="M444-200h70v-50q50-9 86-39t36-89q0-42-24-77t-96-61q-60-20-83-35t-23-41q0-26 18.5-41t53.5-15q32 0 50 15.5t26 38.5l64-26q-11-35-40.5-61T516-710v-50h-70v50q-50 11-78 44t-28 74q0 47 27.5 76t86.5 50q63 23 87.5 41t24.5 47q0 33-23.5 48.5T486-314q-33 0-58.5-20.5T390-396l-66 26q14 48 43.5 77.5T444-252v52Zm36 120q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
          </svg>
          <HeaderTitle>Accounting Web</HeaderTitle>
        </header>
        <main>
          <FormTable
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <CenterBox>
              <BoxType style={{ marginBottom: "16px" }}>
                <SectionTitle>新增記帳</SectionTitle>
                <BoxType>
                  <SelectLabel htmlFor="類型">
                    類型:
                    <SelectInput
                      onChange={(e) => handleOnChange(e, "type")}
                      name="類型"
                      id="類型"
                    >
                      <option value="expense">支出</option>
                      <option value="income">收入</option>
                    </SelectInput>
                  </SelectLabel>
                  <Button onClick={() => postDataApi()}>新增紀錄</Button>
                </BoxType>
              </BoxType>
              <BoxType>
                <label htmlFor="項目">
                  項目:
                  <FromInput
                    onChange={(e) => handleOnChange(e, "description")}
                    type="text"
                    id="項目"
                    name="項目"
                  />
                </label>

                <label htmlFor="標籤">
                  標籤:
                  <FromInput
                    onChange={(e) => handleOnChange(e, "category")}
                    type="text"
                    id="標籤"
                    name="標籤"
                  />
                </label>

                <label htmlFor="金額">
                  金額:
                  <FromInput
                    onChange={(e) => handleOnChange(e, "amount")}
                    type="text"
                    id="金額"
                    name="金額"
                  />
                </label>
              </BoxType>
            </CenterBox>
          </FormTable>

          <CenterBox
            style={{
              flexDirection: "column",
              alignItems: "start",
              marginBottom: "24px",
            }}
          >
            <div>
              <SectionTitle>總覽</SectionTitle>
              <ThirdTitle>總收入: 0</ThirdTitle>
            </div>
            <ThirdTitle>總支出: 0</ThirdTitle>
            <ThirdTitle>結餘: 0</ThirdTitle>
          </CenterBox>

          <CenterBox>
            <BoxType>
              <SectionTitle style={{ marginBottom: "0px" }}>
                記帳列表
              </SectionTitle>
              <ButtonFlexContainer>
                <Button>全部</Button>
                <Button>收入</Button>
                <Button>支出</Button>
              </ButtonFlexContainer>
            </BoxType>
          </CenterBox>
        </main>
      </Container>
    </Body>
  );
}
