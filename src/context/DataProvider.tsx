import { ReactNode, createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface DataContextInterface {
  name: string;
  mode?: string | null;
  lang?: string | null;
  tasks: { id: string; task: string; isDone: boolean }[];
  handleNameChange: (name: string) => void;
  handleLangChange: (lang: string) => void;
  handleThemeChange: (theme: string) => void;
  handletaskAdd: (task: { id: string; task: string; isDone: boolean }) => void;
  handleTaskDelete: (taskID: string) => void;
  handleTaskDone: (taskID: string) => void;
}

export const DataContext = createContext<DataContextInterface>({
  name: "",
  lang: "en",
  mode: "dark",
  tasks: [],
  handleNameChange: () => {},
  handleLangChange: () => {},
  handleThemeChange: () => {},
  handletaskAdd: () => {},
  handleTaskDelete: () => {},
  handleTaskDone: () => {},
});

interface Props {
  children: ReactNode;
}

const DataProvider = ({ children }: Props) => {
  const [name, setName] = useState("");
  const [lang, setLang] = useState(
    localStorage.getItem("lang") ? localStorage.getItem("lang") : "en"
  );
  const [mode, setMode] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"
  );
  const { i18n } = useTranslation();
  const storedTasks = localStorage.getItem("tasks");
  const [tasks, setTasks] = useState(
    storedTasks ? JSON.parse(storedTasks) : []
  );

  lang === "fa"
    ? (document.documentElement.dir = "rtl")
    : (document.documentElement.dir = "ltr");

  useEffect(() => {
    i18n.changeLanguage(lang === "en" ? "en" : "fa");
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleNameChange = (name: string) => {
    setName(name);
    localStorage.setItem("user name", name);
  };

  const handletaskAdd = (task: {
    id: string;
    task: string;
    isDone: boolean;
  }) => {
    setTasks([...tasks, task]);
  };

  const handleTaskDelete = (taskID: string) => {
    setTasks(
      tasks.filter(
        (task: { id: string; task: string; isDone: boolean }) =>
          task.id !== taskID
      )
    );
  };

  const handleTaskDone = (taskID: string) => {
    setTasks(
      tasks.map((task: { id: string; task: string; isDone: boolean }) =>
        task.id === taskID
          ? task.isDone === true
            ? { ...task, isDone: false }
            : { ...task, isDone: true }
          : task
      )
    );
  };

  const handleLangChange = (selectedLang: string) => {
    setLang(selectedLang);
    i18n.changeLanguage(selectedLang);
    localStorage.setItem("lang", selectedLang);
  };

  const handleThemeChange = (selectedTheme: string) => {
    setMode(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  };

  return (
    <DataContext.Provider
      value={{
        name,
        mode,
        lang,
        tasks,
        handleNameChange,
        handleLangChange,
        handleThemeChange,
        handletaskAdd,
        handleTaskDelete,
        handleTaskDone,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
