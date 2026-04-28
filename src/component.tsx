import { FromInput, TableBox, TableIcon } from "./styled/App.styled";
import { DataItem, EditingCell, updataType } from "./App";
import { CellContext } from "@tanstack/react-table";
import { updateData } from "./styled/API";

export interface EditableCellProps {
  info: CellContext<DataItem, string>;
  editingCell: EditingCell;
  setEditingCell: React.Dispatch<React.SetStateAction<EditingCell>>;
  updataInformation: updataType;
  setUpdataInformation: React.Dispatch<React.SetStateAction<updataType>>;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EditableCell({
  info,
  editingCell,
  setEditingCell,
  updataInformation,
  setUpdataInformation,
  setState,
}: EditableCellProps) {
  const isEditing =
    editingCell?.rowId === info.row.original.id &&
    editingCell?.columnId === info.column.id;

  //編輯onclick
  const onclickEdit = () => {
    setEditingCell({
      rowId: info.row.original.id,
      columnId: info.column.id,
    });

    setUpdataInformation({
      key: info.column.id,
      value: info.getValue(),
    });
  };

  //確認onclick
  const onclickCheck = async (id: string) => {
    try {
      await updateData(updataInformation.key, updataInformation.value, id);
      setState((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
    setEditingCell({
      rowId: "",
      columnId: "",
    });

    setUpdataInformation({
      key: "",
      value: "",
    });
  };

  if (isEditing) {
    return (
      <TableBox>
        <FromInput
          autoFocus
          value={updataInformation.value}
          onChange={(e) =>
            setUpdataInformation({
              key: info.column.id,
              value: e.target.value,
            })
          }
        />
        <TableIcon
          style={{ color: "white" }}
          onClick={() => {
            onclickCheck(info.row.original.id);
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
      </TableBox>
    );
  }

  return (
    <TableBox>
      <span>{info.getValue()}</span>
      <TableIcon
        style={{ color: "white" }}
        onClick={() => {
          onclickEdit();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#EAC452"
        >
          <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
        </svg>
      </TableIcon>
    </TableBox>
  );
}
