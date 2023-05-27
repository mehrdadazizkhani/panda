import {
  Card,
  Stack,
  Typography,
  IconButton,
  ButtonGroup,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { DataContext } from "../../context/DataProvider";
import { useContext } from "react";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import DoneIcon from "@mui/icons-material/Done";

interface Props {
  task: {
    id: string;
    task: string;
    isDone: boolean;
  };
}

const TodoItem = ({ task }: Props) => {
  const { handleTaskDelete, handleTaskDone } = useContext(DataContext);

  const handleDelete = () => {
    handleTaskDelete(task.id);
  };

  const handleDone = () => {
    handleTaskDone(task.id);
  };
  return (
    <Card
      key={task.id}
      sx={{
        p: "10px",
        backgroundColor: `${task.isDone && "#1976d2"}`,
        color: `${task.isDone && "#fff"}`,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography>{task.task}</Typography>
        <ButtonGroup>
          {task.isDone ? (
            <IconButton onClick={handleDone} aria-label="delete">
              <PendingActionsIcon sx={{ color: `${task.isDone && "#fff"}` }} />
            </IconButton>
          ) : (
            <IconButton onClick={handleDone}>
              <DoneIcon />
            </IconButton>
          )}
          <IconButton onClick={handleDelete}>
            <ClearIcon sx={{ color: `${task.isDone && "#fff"}` }} />
          </IconButton>
        </ButtonGroup>
      </Stack>
    </Card>
  );
};

export default TodoItem;
