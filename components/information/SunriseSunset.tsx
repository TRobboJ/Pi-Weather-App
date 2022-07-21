import React, { useState, useEffect } from "react";
import styles from "./SunriseSunset.module.scss";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { formatHoursAndMinutes } from "../../utils/utils";
import { useInterval } from "../../utils/hooks";
import { useSelector } from "react-redux";
import settings from "../../settings.json";

export default function SunriseSunset() {
  const userCoords = useSelector((state) => state.settings.coords);
  const sunriseSunsetTimer = useSelector(
    (state) => state.settings.sunriseSunsetTimer
  );
  const ssAPI = `${settings.api.sunrisesunset}?lat=${userCoords[0]}&lng=${userCoords[1]}&formatted=0`;
  const [todaysDate, setTodaysDate] = useState(new Date().getDay());
  const [ssTimes, setssTimes] = useState({
    sunriseTime: "",
    sunsetTime: "",
  });

  useEffect(() => {
    const data = getSunriseSunsetData();
    data.then((data) => {
      const sunrise = new Date(data.results.sunrise);
      const sunset = new Date(data.results.sunset);
      setssTimes({
        sunriseTime: sunrise,
        sunsetTime: sunset,
      });
    });
  }, []);
  useInterval(() => {
    if (todaysDate === new Date().getDay()) return;
    const data = getSunriseSunsetData();
    data.then((data) => {
      const sunrise = new Date(data.results.sunrise);
      const sunset = new Date(data.results.sunset);
      setssTimes({
        sunriseTime: sunrise,
        sunsetTime: sunset,
      });
      setTodaysDate(new Date().getDay());
    });
    console.log("Reloaded sunrise & sunset times");
  }, sunriseSunsetTimer);

  async function getSunriseSunsetData() {
    const response = await fetch(ssAPI);
    const data = await response.json();
    return data;
  }

  if (ssTimes.sunriseTime !== "" && ssTimes.sunsetTime !== "") {
    const sunriseTimeFormatted = formatHoursAndMinutes(ssTimes.sunriseTime);
    const sunsetTimeFormatted = formatHoursAndMinutes(ssTimes.sunsetTime);

    return (
      <div className={styles.sunrise_sunset}>
        <div className={styles.sunrise}>
          <FiSunrise />
          <p>{`${sunriseTimeFormatted.hours}:${sunriseTimeFormatted.minutes}`}</p>
        </div>
        <div className={styles.sunset}>
          <FiSunset />
          <p>{`${sunsetTimeFormatted.hours}:${sunsetTimeFormatted.minutes}`}</p>
        </div>
      </div>
    );
  }
}
