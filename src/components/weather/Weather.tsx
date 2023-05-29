import {
  Autocomplete,
  Card,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CircularProgress from "@mui/material/CircularProgress";
import cities from "../../ir.json";

const Weather = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const storedCity = localStorage.getItem("city");
  const [city, setCity] = useState(
    storedCity ? JSON.parse(storedCity) : ["35.7000", "51.4167"]
  );
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const apiKey = "ab939675fd2424a38982c7662d33d8af";
  const citiesLabel = cities.map((item, index) => {
    return {
      id: index,
      label: item.city,
      location: [item.lat, item.lng],
    };
  });

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city[0]}&lon=${city[1]}&appid=${apiKey}&units=metric`
      )
      .then((res) => {
        setData(res.data);
        setLoading(true);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city[0]}&lon=${city[1]}&appid=${apiKey}&units=metric`
      )
      .then((res) => {
        setData(res.data);
        setLoading(true);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
    localStorage.setItem("city", JSON.stringify(city));
  }, [city]);

  return (
    <Stack gap={2}>
      <Stack>
        <Autocomplete
          disablePortal
          freeSolo
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          autoHighlight
          id="combo-box-demo"
          options={citiesLabel}
          sx={{
            width: 200,
            [theme.breakpoints.up("sm")]: {
              width: 250,
            },
          }}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.id} value={option.location}>
                {option.label}
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField {...params} key={params.id} label={t("weather.input")} />
          )}
          onChange={(_, value) => {
            if (typeof value === "object" && value) {
              setCity(value && value.location);
            }
          }}
        />
      </Stack>
      {loading ? (
        <Card
          dir="ltr"
          sx={{
            position: "relative",
            p: 2,
            width: "100%",
            aspectRatio: "2.5/4",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>{data.name}</Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              gap={1}
            >
              <Typography>{data.sys.country}</Typography>
              <img
                src={`https://openweathermap.org/images/flags/${data.sys.country.toLowerCase()}.png`}
              ></img>
            </Stack>
          </Stack>
          <Typography fontSize={15}>{city.join(", ")}</Typography>
          <img
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          ></img>
          <Stack direction="row" alignItems="flex-end" gap={2}>
            <Typography>Temp:</Typography>
            <Typography variant="h4">{data.main.temp}°</Typography>
          </Stack>
          <p>{data.weather[0].description}</p>
        </Card>
      ) : (
        <Card
          sx={{
            p: 2,
            width: "100%",
            aspectRatio: "2/3",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Card>
      )}
    </Stack>
  );
};

export default Weather;
