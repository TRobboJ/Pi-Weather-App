import React from "react";
import styles from "./DailyForecast.module.scss";

export default function DailyForecast(props) {
  if (!props) return;
  const { temperature, weatherIcon, weatherDescription, dayOfTheWeek } = props;
  const arrayOfWeekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const weekday = arrayOfWeekdays[dayOfTheWeek];

  const weatherDescriptionFormatted =
    weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);

  return (
    <>
      <div className={styles.forecast_daily}>
        <h4>{weekday}</h4>
        <p>{temperature.toFixed(1)}</p>
        <div className={styles.weather_icon}>
          <img
            src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
            alt={weatherDescriptionFormatted}
          />
        </div>
        {/* <p>{weatherDescriptionFormatted}</p> */}
      </div>
    </>
  );
}
