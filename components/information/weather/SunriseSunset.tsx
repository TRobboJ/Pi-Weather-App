import React, { useState, useEffect } from "react";
import styles from "./SunriseSunset.module.scss";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { formatHoursAndMinutes, returnAMPMString } from "../../../utils/utils";
import { useSelector } from "react-redux";

export default function SunriseSunset(props) {
  const { useAMPM } = useSelector(state => state.settings)
  
  if (props.sunriseSunset.sunrise !== "" && props.sunriseSunset.sunset !== "") {
    const sunrise = new Date(props.sunriseSunset.sunrise * 1000);
    const sunset = new Date(props.sunriseSunset.sunset * 1000);
    const sunriseTimeFormatted = formatHoursAndMinutes(sunrise);
    const sunsetTimeFormatted = formatHoursAndMinutes(sunset);
  let sunriseClockFormatted
  let sunsetClockFormatted
  let sunriseDisplayAMPM
  let sunsetDisplayAMPM
  if (useAMPM) {
    sunriseClockFormatted = returnAMPMString(sunriseTimeFormatted.hours, sunriseTimeFormatted.minutes)
    sunsetClockFormatted = returnAMPMString(sunsetTimeFormatted.hours, sunsetTimeFormatted.minutes)
    sunriseDisplayAMPM = <span className={styles.ampm}>{sunriseTimeFormatted.hours > 11 && sunriseTimeFormatted.hours < 24 ? "PM" : "AM"}</span>
    sunsetDisplayAMPM = <span className={styles.ampm}>{sunsetTimeFormatted.hours > 11 && sunsetTimeFormatted.hours < 24 ? "PM" : "AM"}</span>
  
  }
  if (!useAMPM) {
    sunriseClockFormatted = `${sunriseTimeFormatted.hours
      }:${sunriseTimeFormatted.minutes}`
      sunsetClockFormatted = `${sunsetTimeFormatted.hours
      }:${sunsetTimeFormatted.minutes}`
  }

    return (
      <div className={styles.sunrise_sunset}>
        <div className={styles.sunrise}>
          <FiSunrise />
          <p>{sunriseClockFormatted}{useAMPM && sunriseDisplayAMPM}</p>
        </div>
        <div className={styles.sunset}>
          <FiSunset />
          <p>{sunsetClockFormatted}{useAMPM && sunsetDisplayAMPM}</p>
        </div>
      </div>
    );
  }
}
