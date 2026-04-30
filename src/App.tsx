import { useEffect, useMemo, useState } from "react";
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
import { deleteData, getData, postData } from "./styled/API";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { EditableCell } from "./component";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export interface DataItem {
  id: string;
  category: string;
  date: Dayjs;
  amount: string;
  type: "income" | "expense";
  description: string;
}

export interface updataType {
  rowId: string;
  key: string;
  value: string;
}

export interface EditingCell {
  rowId: string;
  columnId: string;
}

interface sumType {
  incomeTotal: string;
  expenseTotal: string;
  balance: string;
}

//TODO 新增LOADING 小動畫
//TODO 新增篩選功能
//TODO 新增圖表功能
//TODO 新增登入功能
//TODO 切換顏色
//TODO API改JAVA+JAVA SPRING

export function App() {
  const now = dayjs();
  const init = {
    id: "",
    category: "",
    date: now,
    amount: "",
    type: "expense",
    description: "",
  } as DataItem;

  const [data, setData] = useState<DataItem[]>([]);
  const [state, setState] = useState<boolean>(true);
  const [editingCell, setEditingCell] = useState<EditingCell>({
    rowId: "",
    columnId: "",
  });
  const [information, setInformation] = useState<DataItem>(init);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15,
  });

  const [sumData, setSumData] = useState<sumType>({
    incomeTotal: "",
    expenseTotal: "",
    balance: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData();
        setData(res.dataSet ?? []);
        setSumData(
          res.sumData ?? { incomeTotal: "", expenseTotal: "", balance: "" },
        );
      } catch (err) {
        console.error("抓取資料失敗:", err);
      }
    };

    fetchData();
  }, [state]);

  //information值
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | Dayjs | null,
    type: "category" | "amount" | "description" | "type" | "date",
  ) => {
    let key: string;
    if (dayjs.isDayjs(e)) {
      key = e.format("YYYY-MM-DD");
    } else if (e && "target" in e) {
      key = e.target.value;
    }
    setInformation((pre) => ({
      ...pre,
      [type]: key,
    }));
  };

  //新增紀錄API
  const postDataApi = async () => {
    try {
      await postData(information);
      setState((prev) => !prev);
      setInformation(init);
    } catch (err) {
      console.error("新增資料失敗:", err);
    }
  };

  //刪除紀錄API
  const deleteApi = async (id: string) => {
    try {
      await deleteData(id);
      setState((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  const columnHelper = createColumnHelper<DataItem>();

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "display",
        header: "刪除",
        cell: (info) => (
          <>
            <Button
              onClick={() => {
                deleteApi(info.row.original.id);
              }}
            >
              刪除
            </Button>
          </>
        ),
      }),
      columnHelper.accessor("date", {
        header: "時間",
        cell: (info) => {
          return (
            <EditableCell
              info={info}
              time={true}
              setState={setState}
              setEditingCell={setEditingCell}
              editingCell={editingCell}
            />
          );
        },
      }),
      columnHelper.accessor("description", {
        header: "項目",
        cell: (info) => {
          return (
            <EditableCell
              info={info}
              setState={setState}
              setEditingCell={setEditingCell}
              editingCell={editingCell}
            />
          );
        },
      }),
      columnHelper.accessor("category", {
        header: "標籤",
        cell: (info) => {
          return (
            <EditableCell
              info={info}
              setState={setState}
              setEditingCell={setEditingCell}
              editingCell={editingCell}
            />
          );
        },
      }),
      columnHelper.accessor("amount", {
        header: "金額",
        cell: (info) => {
          return (
            <EditableCell
              info={info}
              setState={setState}
              setEditingCell={setEditingCell}
              editingCell={editingCell}
            />
          );
        },
      }),
      columnHelper.accessor("type", {
        header: "類型",
        cell: (info) => {
          return (
            <EditableCell
              info={info}
              setState={setState}
              setEditingCell={setEditingCell}
              editingCell={editingCell}
            />
          );
        },
      }),
    ],
    [columnHelper],
  );

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(), //基本功能
    getPaginationRowModel: getPaginationRowModel(), //分頁功能
  });

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
                <Button onClick={() => postDataApi()}>新增紀錄</Button>
              </BoxType>

              <BoxType style={{ alignItems: "end" }}>
                <div style={{ maxWidth: "33%" }}>
                  <BoxType style={{ gap: "0" }}>
                    <label style={{ whiteSpace: "nowrap" }}>日期:</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        format="YYYY/MM/DD"
                        value={
                          information.date ? dayjs(information.date) : null
                        }
                        onChange={(e) => handleOnChange(e, "date")}
                        slotProps={{
                          textField: {
                            size: "small",
                            fullWidth: true,
                            sx: {
                              backgroundColor: "white",
                              margin: "4px 8px",
                              maxHeight: "36px",
                              borderRadius: "4px",
                            },
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </BoxType>
                  <label htmlFor="項目">
                    項目:
                    <FromInput
                      onChange={(e) => handleOnChange(e, "description")}
                      value={information.description}
                      type="text"
                      id="項目"
                      name="項目"
                    />
                  </label>
                </div>
                <div style={{ maxWidth: "33%" }}>
                  <SelectLabel style={{ whiteSpace: "nowrap" }} htmlFor="類型">
                    類型:
                    <SelectInput
                      style={{ margin: "4px 8px 4px 0px", width: "100%" }}
                      onChange={(e) => handleOnChange(e, "type")}
                      name="類型"
                      id="類型"
                    >
                      <option value="expense">支出</option>
                      <option value="income">收入</option>
                    </SelectInput>
                  </SelectLabel>
                  <label style={{ whiteSpace: "nowrap" }} htmlFor="標籤">
                    標籤:
                    <FromInput
                      onChange={(e) => handleOnChange(e, "category")}
                      value={information.category}
                      type="text"
                      id="標籤"
                      name="標籤"
                    />
                  </label>
                </div>
                <label htmlFor="金額">
                  金額:
                  <FromInput
                    onChange={(e) => handleOnChange(e, "amount")}
                    value={information.amount}
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
              <ThirdTitle>總收入: {sumData.incomeTotal}</ThirdTitle>
            </div>
            <ThirdTitle>總支出: {sumData.expenseTotal}</ThirdTitle>
            <ThirdTitle>結餘: {sumData.balance}</ThirdTitle>
          </CenterBox>

          <CenterBox>
            <BoxType style={{ marginBottom: "32px" }}>
              <SectionTitle style={{ marginBottom: "0px" }}>
                記帳列表
              </SectionTitle>
              <ButtonFlexContainer>
                <Button>全部</Button>
                <Button>收入</Button>
                <Button>支出</Button>
              </ButtonFlexContainer>
            </BoxType>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "center",
              }}
            >
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr style={{ color: "white" }} key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        style={{ border: "1px solid white", color: "white" }}
                        key={header.id}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody>
                {table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      style={{
                        textAlign: "center",
                        padding: "16px",
                        color: "white",
                      }}
                    >
                      無資料
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <tr style={{ color: "white" }} key={row.original.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td
                          style={{ padding: "8px", border: "1px solid white" }}
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                paddingTop: "16px",
              }}
            >
              <Button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                上一頁
              </Button>
              <span style={{ margin: "0 8px", color: "white" }}>
                {table.getState().pagination.pageIndex + 1} /{" "}
                {table.getPageCount()}
              </span>
              <Button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                下一頁
              </Button>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
                style={{ marginLeft: "12px" }}
              >
                {[5, 10, 20, 50].map((size) => (
                  <option key={size} value={size}>
                    {size} 筆/頁
                  </option>
                ))}
              </select>
            </div>
          </CenterBox>
        </main>
      </Container>
    </Body>
  );
}
