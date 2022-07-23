import React, { useState, useEffect } from "react";
import styles from "./SunriseSunset.module.scss";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { formatHoursAndMinutes } from "../../../utils/utils";

export default function SunriseSunset(props) {
  
  if (props.sunriseSunset.sunrise !== "" && props.sunriseSunset.sunset !== "") {
    const sunrise = new Date(props.sunriseSunset.sunrise * 1000);
    const sunset = new Date(props.sunriseSunset.sunset * 1000);
    const sunriseTimeFormatted = formatHoursAndMinutes(sunrise);
    const sunsetTimeFormatted = formatHoursAndMinutes(sunset);

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
