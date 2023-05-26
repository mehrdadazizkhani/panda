import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { name } = useContext(DataContext);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const { t } = useTranslation();
  const currentHour = currentTime.getHours();
  let message = "";

  if (currentHour >= 0 && currentHour < 6) {
    message = t("dashboard.message4");
  } else if (currentHour >= 6 && currentHour < 12) {
    message = t("dashboard.message1");
  } else if (currentHour >= 12 && currentHour < 18) {
    message = t("dashboard.message3");
  } else {
    message = t("dashboard.message2");
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h2">{currentTime.toLocaleTimeString()}</Typography>
      <Typography
        variant="h4"
        sx={{ width: "50%", textTransform: "capitalize" }}
      >
        hello {name}
      </Typography>
      <Typography sx={{ width: "50%" }}>"{message}"</Typography>
    </Box>
  );
};

export default Dashboard;
