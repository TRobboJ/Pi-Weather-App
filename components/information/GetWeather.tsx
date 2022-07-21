import React, { useEffect, useState } from "react";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import { useSelector } from "react-redux";
import settings from "../../settings.json";
import { useInterval } from "../../utils/hooks";
import {kelvinToCelsius} from '../../utils/utils'

export default function GetWeather() {
  const weatherTimer = useSelector((state) => state.settings.openweatherTimer);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentWeatherInformation, setCurrentWeatherInformation] = useState({
    temperature: 0,
    weatherIcon: '',
    weatherIconAlt: ''

  })
  const openWeatherAPI = settings.api.openweather;
  const openWeatherAPIKey = process.env.OPENWEATHERAPIKEY ? process.env.OPENWEATHERAPIKEY : settings.api.openweatherAPIkey
  const userCoords = useSelector((state) => state.settings.coords);
  const formattedWeatherAPIKey = `${openWeatherAPI}?lat=${userCoords[0]}&lon=${userCoords[1]}&appid=${openWeatherAPIKey}`;

  async function getWeatherData() {
    const response = await fetch(formattedWeatherAPIKey);
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    const apiData = getWeatherData();

    apiData.then((data) => {
      console.log(formattedWeatherAPIKey);
      console.log(data);
      const temp = kelvinToCelsius(data.current.temp)


      setCurrentWeatherInformation({
        temperature: temp,
        weatherIcon: data.current.weather[0].icon,
        weatherIconAlt: data.current.weather[0].main,
      })
      if (!isLoaded) {
        setIsLoaded(true)
      }
    });
  }, []);

  useInterval(() => {
    if (!isLoaded) return
    const apiData = getWeatherData();
    setIsLoaded(false)
    apiData.then((data) => {
      console.log(formattedWeatherAPIKey);
      console.log(data);

      setIsLoaded(true)
    });
  }, weatherTimer);

  return (
    <>
      <CurrentWeather currentWeather={currentWeatherInformation}/>
      {/* <Forecast /> */}
    </>
  );
}
