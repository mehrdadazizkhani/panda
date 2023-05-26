import { Box, Typography } from "@mui/material";

const Page404 = () => {
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
        page not found
      </Typography>
    </Box>
  );
};

export default Page404;
