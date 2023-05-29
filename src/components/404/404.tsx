import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Page404 = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
        {t("404.msg")}
      </Typography>
    </Box>
  );
};

export default Page404;
