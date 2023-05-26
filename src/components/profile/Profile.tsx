import { useContext, useState } from "react";
import { DataContext } from "../../context/DataProvider";
import { Button, Stack, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { handleNameChange, handleLangChange, handleThemeChange, mode, lang } =
    useContext(DataContext);
  const { t } = useTranslation();
  const [theme, setTheme]: any = useState(mode);
  const [language, setLanguage]: any = useState(lang);
  const [name, setName] = useState("");

  const handleSave = () => {
    handleNameChange(name);
    setName("");
    handleLangChange(language);
    handleThemeChange(theme);
  };

  return (
    <Stack component="form" spacing={2} width="50%">
      <TextField
        onChange={(e) => setName(e.target.value)}
        fullWidth
        variant="outlined"
        label={t("profile.name")}
        value={name}
      />
      <TextField
        fullWidth
        select
        defaultValue={theme}
        variant="outlined"
        label={t("profile.theme")}
        SelectProps={{
          native: true,
        }}
        onChange={(event) => setTheme(event.target.value)}
      >
        <option value="dark">{t("profile.dark")}</option>
        <option value="light">{t("profile.light")}</option>
      </TextField>
      <TextField
        fullWidth
        select
        variant="outlined"
        defaultValue={language}
        SelectProps={{
          native: true,
        }}
        onChange={(event) => setLanguage(event.target.value)}
        label={t("profile.theme")}
      >
        <option value="en">English</option>
        <option value="fa">Farsi</option>
      </TextField>
      <Button
        onClick={handleSave}
        disabled={!name ? true : false}
        variant="contained"
      >
        {t("profile.save")}
      </Button>
    </Stack>
  );
};

export default Profile;
