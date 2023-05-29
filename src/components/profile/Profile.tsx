import { useContext, useState } from "react";
import { DataContext } from "../../context/DataProvider";
import { Button, Stack, TextField, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const theme = useTheme();
  const { handleNameChange, handleLangChange, handleThemeChange, mode, lang } =
    useContext(DataContext);
  const { t } = useTranslation();
  const [name, setName] = useState("");

  const handleSave = () => {
    handleNameChange(name);
    setName("");
  };

  return (
    <Stack
      component="form"
      spacing={2}
      sx={{
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          width: "60%",
        },
      }}
    >
      <TextField
        onChange={(e) => setName(e.target.value)}
        fullWidth
        variant="outlined"
        label={t("profile.name")}
        value={name}
      />
      <Button
        size="large"
        onClick={handleSave}
        disabled={!name ? true : false}
        variant="contained"
      >
        {t("profile.save")}
      </Button>
      <TextField
        fullWidth
        select
        defaultValue={mode}
        variant="outlined"
        label={t("profile.theme")}
        SelectProps={{
          native: true,
        }}
        onChange={(event) => handleThemeChange(event.target.value)}
      >
        <option value="dark">{t("profile.dark")}</option>
        <option value="light">{t("profile.light")}</option>
      </TextField>
      <TextField
        fullWidth
        select
        variant="outlined"
        defaultValue={lang}
        SelectProps={{
          native: true,
        }}
        onChange={(event) => handleLangChange(event.target.value)}
        label={t("profile.theme")}
      >
        <option value="en">English</option>
        <option value="fa">Farsi</option>
      </TextField>
    </Stack>
  );
};

export default Profile;
