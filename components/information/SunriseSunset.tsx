import React from "react";
import styles from "./SunriseSunset.module.scss";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import settings from "../../settings.json";
import { setSunriseSunset, setLastFetchedDate } from "../../store/uiSlice";

export default function SunriseSunset() {
  const dispatch = useDispatch();
  const userCoords = useSelector((state) => state.settings.coords);
  const { sunriseSunsetDataLastFetched, sunriseTime, sunsetTime } = useSelector(
    (state) => state.ui
  );
  const todaysDate = new Date().getDay();
  if (userCoords.length !== 0) {
    if (
      sunriseSunsetDataLastFetched === "" ||
      sunriseSunsetDataLastFetched !== todaysDate
    ) {
      console.log(userCoords)
      async function getSunriseSunsetData() {
        const response = await fetch(
          `${settings.api.sunrisesunset}?lat=${userCoords[0]}&lng=${userCoords[1]}`
        );
        const data = await response.json();
        return data;
      }
      const data = getSunriseSunsetData();
      data.then((data) => {
        console.log(data.results);
        dispatch(
          setSunriseSunset({
            sunriseTime: data.results.sunrise,
            sunsetTime: data.results.sunset,
          })
        );
        dispatch(setLastFetchedDate());
      });
      console.log(sunriseTime);
    }
    return (
      <div className={styles.sunrise_sunset}>
        <div className={styles.sunrise}>
          <FiSunrise />
          {sunriseTime.toLocaleString()}
        </div>
        <div className={styles.sunset}>
          <FiSunset />
          {sunsetTime.toLocaleString()}
        </div>
      </div>
    );
  }
}
