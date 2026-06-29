import { Button } from "../styled/App.styled";
import { EditableCell, EditableCellProps } from "./component";

type DeleteCellProps = {
  readonly id: string;
  readonly deleteApi: (id: string) => void;
};

export function DeleteCell({ id, deleteApi }: DeleteCellProps) {
  return (
    <Button
      onClick={() => {
        deleteApi(id);
      }}
    >
      刪除
    </Button>
  );
}

export function EditableTableCell({
  info,
  setState,
  setEditingCell,
  editingCell,
  time = false,
}: EditableCellProps) {
  return (
    <EditableCell
      info={info}
      time={time}
      setState={setState}
      setEditingCell={setEditingCell}
      editingCell={editingCell}
    />
  );
}
