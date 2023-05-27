import { Card, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const Weather = () => {
  const { t } = useTranslation();
  const [city, setCity] = useState(
    localStorage.getItem("city") ? localStorage.getItem("city") : "tehran"
  );
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const apiKey = "ab939675fd2424a38982c7662d33d8af";

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
        {
          params: {
            latitude: "38.08",
            longitude: "46.29",
            current_weather: "true",
          },
        }
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
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
        {
          params: {
            latitude: "38.08",
            longitude: "46.29",
            current_weather: "true",
          },
        }
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
    <Stack gap={2} alignItems="center">
      <Stack>
        <TextField
          onChange={(e) => setCity(e.target.value)}
          fullWidth
          variant="outlined"
          label={t("weather.input")}
          value={city}
        />
      </Stack>
      {loading ? (
        <Card
          sx={{
            p: 2,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
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
          <img
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          ></img>
          <Typography variant="h5">Temp: {data.main.temp}</Typography>
          <p>{data.weather[0].description}</p>
        </Card>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Stack>
  );
};

export default Weather;
