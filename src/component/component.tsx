import { CellContext } from "@tanstack/react-table";

import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PickerValue } from "@mui/x-date-pickers/internals";
import { EditingCell, DataItem } from "../Index";
import { updateData } from "../styled/API";
import {
  TableBox,
  SelectInput,
  FromInput,
  TableIcon,
  TableColumn,
} from "../styled/App.styled";

export interface EditableCellProps {
  editingCell: EditingCell;
  setEditingCell: React.Dispatch<React.SetStateAction<EditingCell>>;
  info: CellContext<DataItem, string | Dayjs>;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  time?: boolean;
}

export function EditableCell({
  info,
  time,
  setState,
  setEditingCell,
  editingCell,
}: EditableCellProps) {
  const init = {
    rowId: "",
    columnId: "",
  };
  const [value, setValue] = useState<string>(() => {
    if (time) {
      const raw = info.row.original.date;
      return raw ? dayjs(raw).format("YYYY-MM-DD") : "";
    }
    return info.getValue() as string;
  });
  const isEditing =
    editingCell?.rowId === info.row.original.id &&
    editingCell?.columnId === info.column.id;

  //編輯onclick
  const onclickEdit = () => {
    setEditingCell({
      rowId: info.row.original.id,
      columnId: info.column.id,
    });
  };

  //確認onclick
  const onclickCheck = async () => {
    try {
      await updateData(info.column.id, value, info.row.original.id);
      setState((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
    setEditingCell(init);
  };

  //information 值
  const onchangeInformation = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | PickerValue
      | null,
  ) => {
    if (!e) return;
    if (dayjs.isDayjs(e)) {
      setValue(e.format("YYYY-MM-DD"));
      return;
    }
    setValue(e.target.value);
  };

  if (isEditing) {
    return (
      <TableBox>
        {info.column.id === "type" ? (
          <SelectInput
            onChange={(e) => onchangeInformation(e)}
            value={value}
            name="類型"
            id="類型"
          >
            <option value="expense">支出</option>
            <option value="income">收入</option>
          </SelectInput>
        ) : time ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="YYYY/MM/DD"
              value={value ? dayjs(value) : null}
              onChange={(e) => onchangeInformation(e)}
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
        ) : (
          <FromInput value={value} onChange={(e) => onchangeInformation(e)} />
        )}
        <TableIcon
          onClick={() => {
            onclickCheck();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="31px"
            viewBox="0 -960 960 960"
            width="31px"
            fill="#EAC452"
          >
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
          </svg>
        </TableIcon>
        <TableIcon
          onClick={() => {
            setEditingCell(init);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="31px"
            viewBox="0 -960 960 960"
            width="31px"
            fill="#EAC452"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </TableIcon>
      </TableBox>
    );
  }

  return (
    <TableColumn
      onClick={() => {
        onclickEdit();
      }}
    >
      {info.column.id === "type" ? (
        <span
          style={{
            color: info.getValue() === "income" ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {info.getValue() === "income" ? "收入" : "支出"}
        </span>
      ) : time ? (
        <span>{dayjs(info.getValue()).format("YYYY-MM-DD")}</span>
      ) : (
        <span>{info.getValue() as string}</span>
      )}
    </TableColumn>
  );
}
