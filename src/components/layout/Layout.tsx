import * as React from "react";
import { useTranslation } from "react-i18next";
import CloudIcon from "@mui/icons-material/Cloud";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  styled,
  useTheme,
  Theme,
  CSSObject,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Outlet, useLocation, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { DataContext } from "../../context/DataProvider";
import { Button, Paper, TextField, Tooltip, Zoom } from "@mui/material";
import { Modal } from "@mui/base";

export default function Layout() {
  const theme = useTheme();
  const { mode, lang, name, handleNameChange } = useContext(DataContext);
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const [inputName, setInputName] = useState("");

  const listItems = [
    { id: 1, title: t("dashboard.title"), icon: <DashboardIcon />, to: "/" },
    { id: 2, title: t("todos.title"), icon: <PlaylistAddIcon />, to: "/todo" },
    { id: 3, title: t("weather.title"), icon: <CloudIcon />, to: "/weather" },
    {
      id: 4,
      title: t("profile.title"),
      icon: <ManageAccountsIcon />,
      to: "/profile",
    },
  ];

  const location = useLocation();

  const drawerWidth = 240;

  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: lang === "fa" ? "flex-start" : "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginRight: lang === "fa" ? drawerWidth : 0,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const darkMode = createTheme({
    palette: {
      mode: mode === "dark" ? "dark" : "light",
    },
    typography: {
      fontFamily: `${lang === "fa" ? "Vazirmatn" : "Roboto"}, sans-serif`,
    },
  });

  const handleSetName = () => {
    handleNameChange(inputName);
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  return localStorage.getItem("user name") ? (
    <ThemeProvider theme={darkMode}>
      <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <CssBaseline />
        <AppBar open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge={lang === "fa" ? "end" : "start"}
              sx={{
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {t(`appTitle`)}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor={lang === "fa" ? "right" : "left"}
          variant="permanent"
          open={open}
        >
          <DrawerHeader dir="ltr">
            <IconButton onClick={handleDrawerClose}>
              {lang === "fa" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {listItems.map((item) => (
              <Tooltip
                disableHoverListener={open ? true : false}
                disableFocusListener={open ? true : false}
                disableTouchListener={open ? true : false}
                TransitionComponent={Zoom}
                title={item.title}
                placement={lang === "fa" ? "left" : "right"}
              >
                <ListItemButton
                  key={item.id}
                  selected={location.pathname === item.to}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "flex-start" : "center",
                    px: 2.5,
                    gap: open ? 3 : "auto",
                  }}
                  component={Link}
                  to={item.to}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{
                      opacity: open ? 1 : 0,
                      textAlign: lang === "fa" ? "right" : "left",
                    }}
                  />
                </ListItemButton>
              </Tooltip>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            display: "flex",
            position: "absolute",
            flexGrow: 1,
            p: 3,
            height: "calc(100vh - 56px)",
            left: lang === "fa" ? -theme.spacing(7) : theme.spacing(7),
            width: `calc(100vw - ${theme.spacing(7)})`,
            top: "56px",
            [theme.breakpoints.up("sm")]: {
              width: `calc(100vw - ${theme.spacing(8)})`,
              left: lang === "fa" ? -theme.spacing(7) : theme.spacing(7),
              height: "calc(100vh - 64px)",
              top: "64px",
            },
            justifyContent: "center",
            alignItems: "self-start",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={darkMode}>
      <CssBaseline />
      <Modal open={name ? false : true}>
        <Paper sx={{ width: "100vw", height: "100vh" }}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Please enter your name
            </Typography>
            <TextField
              onChange={(e) => setInputName(e.target.value)}
              fullWidth
              variant="outlined"
              label={t("profile.name")}
              value={inputName}
            />
            <Button
              onClick={handleSetName}
              disabled={!inputName ? true : false}
              variant="contained"
            >
              {t("profile.save")}
            </Button>
          </Box>
        </Paper>
      </Modal>
    </ThemeProvider>
  );
}
