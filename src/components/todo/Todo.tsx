import { Box, Button, Stack, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState, useContext } from "react";
import { t } from "i18next";
import TodoItem from "./TodoItem";
import { DataContext } from "../../context/DataProvider";

const Todo = () => {
  const [taskInput, setTaskInput] = useState("");
  const { handletaskAdd, tasks } = useContext(DataContext);
  const handleAdd = () => {
    taskInput &&
      handletaskAdd({
        id: new Date().toLocaleTimeString(),
        task: taskInput,
        isDone: false,
      });
    setTaskInput("");
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row" gap={2}>
        <TextField
          onChange={(e) => setTaskInput(e.target.value)}
          fullWidth
          variant="outlined"
          label={t("todos.task")}
          value={taskInput}
        />
        <Button onClick={handleAdd} variant="contained" endIcon={<AddIcon />}>
          {t("todos.add")}
        </Button>
      </Stack>
      <Stack direction="column" gap={1} sx={{ mt: "10px" }}>
        {tasks.map((task: { id: string; task: string; isDone: boolean }) => {
          return <TodoItem key={task.id} task={task} />;
        })}
      </Stack>
    </Box>
  );
};

export default Todo;
