import { ReactNode, createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface DataContextInterface {
  name: string;
  mode?: string | null;
  lang?: string | null;
  handleNameChange: (name: string) => void;
  handleLangChange: (lang: string) => void;
  handleThemeChange: (theme: string) => void;
}

export const DataContext = createContext<DataContextInterface>({
  name: "",
  lang: "en",
  mode: "dark",
  handleNameChange: () => {},
  handleLangChange: () => {},
  handleThemeChange: () => {},
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

  useEffect(() => {
    i18n.changeLanguage(lang === "en" ? "en" : "fa"), [];
  });

  const handleNameChange = (name: string) => {
    setName(name);
    localStorage.setItem("user name", name);
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
        handleNameChange,
        handleLangChange,
        handleThemeChange,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
