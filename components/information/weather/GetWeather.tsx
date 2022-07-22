import React, { useEffect, useState } from "react";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast"; 
import { useSelector } from "react-redux";
import settings from "../../../settings.json";
import { useInterval } from "../../../utils/hooks";
import {kelvinToCelsius} from '../../../utils/utils'
import SunriseSunset from "./SunriseSunset";
import DailyMinMax from "./DailyMinMax";

export default function GetWeather() {
  const weatherTimer = useSelector((state) => state.settings.openweatherTimer);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentWeather, setCurrentWeather] = useState({
    temperature: 0,
    weatherIcon: '',
    weatherIconAlt: '',
    humidity: 0,

  })
  const [sunriseSunset, setSunriseSunset] = useState({
    sunrise: '',
    sunset: ''
  })

  const [todaysMinMax, setTodaysMinMax] = useState({
    min: 0,
    max: 0
  })
  const openWeatherAPI = settings.api.openweather;
  const openWeatherAPIKey = process.env.NEXT_PUBLIC_OPENWEATHERAPIKEY ? process.env.NEXT_PUBLIC_OPENWEATHERAPIKEY : settings.api.openweatherAPIkey
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
      console.log(data);
      const temp = kelvinToCelsius(data.current.temp)
      const minTemp = kelvinToCelsius(data.daily[0].temp.min)
      const maxTemp = kelvinToCelsius(data.daily[0].temp.max)

      setCurrentWeather({
        temperature: temp,
        weatherIcon: data.current.weather[0].icon,
        weatherIconAlt: data.current.weather[0].main,
        humidity: data.current.humidity,
      })
      setSunriseSunset({
        sunrise: data.current.sunrise,
        sunset: data.current.sunset
      })
      setTodaysMinMax({
        min: minTemp,
        max: maxTemp
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
      <SunriseSunset sunriseSunset={sunriseSunset} />
      
        
      
      <CurrentWeather currentWeather={currentWeather}/>
      <DailyMinMax todaysMinMax={todaysMinMax} />
      <Forecast />
    </>
  );
}