import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  BoxType,
  Button,
  CenterBox,
  FormTable,
  FromInput,
  ItemTitle,
  NodataStyle,
  SectionTitle,
  SelectInput,
  SelectLabel,
  TableBox,
  TableColumnTh,
  TableRowTd,
  ThirdTitle,
} from "./styled/App.styled";
import { deleteData, getData, postData } from "./api/ProductAPI";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Chart from "chart.js/auto";
import { useTheme } from "styled-components";
import { EditableCell } from "./component/component";
import axios from "axios";
import { toast } from "sonner";
export interface DataItem {
  id: string;
  category: string;
  date: Dayjs;
  amount: string;
  type: "income" | "expense";
  description: string;
  startDate: string;
  endDate: string;
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

export function Index() {
  const now = dayjs();
  const init = {
    id: "",
    category: "",
    date: now,
    amount: "",
    type: "expense",
    description: "",
    startDate: "",
    endDate: "",
  } as DataItem;
  const theme = useTheme();
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<boolean>(true);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [editingCell, setEditingCell] = useState<EditingCell>({
    rowId: "",
    columnId: "",
  });
  const [information, setInformation] = useState<DataItem>(init);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15,
  });
  const [pieData, setPieData] = useState<Array<string>>([]);
  const [pieSumData, setPieSumData] = useState<number[]>([]);
  const [sumData, setSumData] = useState<sumType>({
    incomeTotal: "",
    expenseTotal: "",
    balance: "",
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  //chart.js 圖表
  useEffect(() => {
    if (!canvasRef.current) return;
    if (!pieData.length) return;
    const ctx = canvasRef.current.getContext("2d");

    if (!ctx) return;
    const myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: pieData,
        datasets: [
          {
            data: pieSumData,
            backgroundColor: [
              "#00C2FF",
              "#FF6B6B",
              "#FFD93D",
              "#6EFFA3",
              "#B983FF",
            ],
            borderColor: "black",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: `${theme.colors.fontColor}`,
              font: {
                weight: "bold",
                size: 14,
              },
            },
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [pieData, pieSumData, theme]);

  //init data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getData(information);
        if (res.state != true) {
          throw new Error(res.message);
        }
        setPieData(Object.keys(res.categoryObj));
        setPieSumData(Object.values(res.categoryObj).map(Number));

        setData(res.dataSet ?? []);
        setSumData(
          res.sumData ?? { incomeTotal: "", expenseTotal: "", balance: "" },
        );
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data?.message || "請求錯誤");
          return;
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [state]);

  //information值
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | Dayjs | null,
    type:
      | "category"
      | "amount"
      | "description"
      | "type"
      | "date"
      | "startDate"
      | "endDate",
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
    setLoading(true);
    try {
      await postData(information);
      setState((prev) => !prev);
      setInformation(init);
      setLoading(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "請求錯誤");
        return;
      }
      setLoading(false);
    }
  };

  //刪除紀錄API
  const deleteApi = async (id: string) => {
    try {
      await deleteData(id);
      setState((prev) => !prev);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "請求錯誤");
        return;
      }
    }
  };

  const columnHelper = createColumnHelper<DataItem>();
  //表格欄位設定
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
  //table表單
  const table = useReactTable({
    data,
    columns,
    state: { pagination, sorting },
    onPaginationChange: setPagination, //分頁功能
    onSortingChange: setSorting, //  排序功能
    getCoreRowModel: getCoreRowModel(), //基本功能
    getPaginationRowModel: getPaginationRowModel(), //分頁功能
    getSortedRowModel: getSortedRowModel(), //排序功能
    enableSortingRemoval: false, //點擊排序後再次點擊取消排序功能
  });

  return (
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
                <ItemTitle style={{ flex: 1 }}>日期:</ItemTitle>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={information.date ? dayjs(information.date) : null}
                    onChange={(e) => handleOnChange(e, "date")}
                    format="YYYY/MM/DD"
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                        variant: "outlined",
                        sx: {
                          backgroundColor: "white",
                          m: "4px 8px",
                          borderRadius: "4px",
                          "& fieldset": {
                            borderColor: "black",
                          },
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </BoxType>
              <ItemTitle htmlFor="項目">
                項目:
                <FromInput
                  onChange={(e) => handleOnChange(e, "description")}
                  value={information.description}
                  type="text"
                  id="項目"
                  name="項目"
                />
              </ItemTitle>
            </div>
            <div style={{ maxWidth: "33%" }}>
              <SelectLabel htmlFor="類型">
                類型:
                <SelectInput
                  style={{
                    padding: "11px 8px 11px 8px",
                    marginRight: "8px",
                    marginBottom: "4px",
                    width: "100%",
                  }}
                  onChange={(e) => handleOnChange(e, "type")}
                  name="類型"
                  id="類型"
                >
                  <option value="expense">支出</option>
                  <option value="income">收入</option>
                </SelectInput>
              </SelectLabel>
              <ItemTitle style={{ whiteSpace: "nowrap" }} htmlFor="標籤">
                標籤:
                <FromInput
                  onChange={(e) => handleOnChange(e, "category")}
                  value={information.category}
                  type="text"
                  id="標籤"
                  name="標籤"
                />
              </ItemTitle>
            </div>
            <div style={{ maxWidth: "33%" }}>
              <ItemTitle htmlFor="金額">
                金額:
                <FromInput
                  onChange={(e) => handleOnChange(e, "amount")}
                  value={information.amount}
                  type="text"
                  id="金額"
                  name="金額"
                />
              </ItemTitle>
            </div>
          </BoxType>
        </CenterBox>
      </FormTable>

      <CenterBox
        style={{
          display: "flex",
          alignItems: "start",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            maxWidth: "25%",
            width: "100%",
          }}
        >
          <SectionTitle>總覽</SectionTitle>
          <ThirdTitle>總收入: {sumData.incomeTotal}</ThirdTitle>
          <ThirdTitle>總支出: {sumData.expenseTotal}</ThirdTitle>
          <ThirdTitle>結餘: {sumData.balance}</ThirdTitle>
        </div>
        {/* 圖表 */}
        <div
          style={{
            flex: "1",
            maxHeight: "400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <canvas ref={canvasRef} />
        </div>
      </CenterBox>

      <CenterBox>
        <BoxType style={{ marginBottom: "32px" }}>
          <SectionTitle style={{ marginBottom: "0px" }}>記帳列表</SectionTitle>
          <TableBox style={{ gap: "16px" }}>
            <BoxType>
              <ItemTitle>起始日期:</ItemTitle>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={
                    information.startDate ? dayjs(information.startDate) : null
                  }
                  onChange={(e) => handleOnChange(e, "startDate")}
                  format="YYYY/MM/DD"
                  slotProps={{
                    textField: {
                      size: "small",
                      fullWidth: true,
                      variant: "outlined",
                      sx: {
                        backgroundColor: "white",
                        m: "4px 8px",
                        borderRadius: "4px",
                        "& fieldset": {
                          borderColor: "black",
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </BoxType>

            <BoxType>
              <ItemTitle>結束日期:</ItemTitle>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={
                    information.endDate ? dayjs(information.endDate) : null
                  }
                  onChange={(e) => handleOnChange(e, "endDate")}
                  format="YYYY/MM/DD"
                  slotProps={{
                    textField: {
                      size: "small",
                      fullWidth: true,
                      variant: "outlined",
                      sx: {
                        backgroundColor: "white",
                        m: "4px 8px",
                        borderRadius: "4px",
                        "& fieldset": {
                          borderColor: "black",
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </BoxType>
            <Button onClick={() => setState((pre) => !pre)}>查詢</Button>
          </TableBox>
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
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableColumnTh
                    onClick={header.column.getToggleSortingHandler()}
                    key={header.id}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null}
                  </TableColumnTh>
                ))}
              </tr>
            ))}
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <NodataStyle colSpan={columns.length}>Loading...</NodataStyle>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <NodataStyle colSpan={columns.length}>無資料</NodataStyle>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.original.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableRowTd key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableRowTd>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          )}
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
          <span style={{ margin: "0 8px", color: `${theme.colors.fontColor}` }}>
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
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
            style={{
              marginLeft: "12px",
              padding: "8px",
              borderRadius: "4px",
              borderColor: `${theme.colors.fontColor}`,
            }}
          >
            {[5, 10, 15, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size} 筆/頁
              </option>
            ))}
          </select>
        </div>
      </CenterBox>
    </main>
  );
}
