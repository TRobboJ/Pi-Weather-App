import React, { useEffect, useState } from "react";
import styles from "./Clock.module.scss";
import { formatHoursAndMinutes, returnAMPMString } from "../../utils/utils";
import { useSelector } from "react-redux";


export default function Clock() {
  const { useAMPM, useImperial } = useSelector(state => state.settings)
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(clockInterval);
    };
  }, []);

  const timeFormatted = formatHoursAndMinutes(date)
  let clockFormatted
  let displayAMPM
  if (useAMPM) {
    clockFormatted = returnAMPMString(timeFormatted.hours, timeFormatted.minutes)
    displayAMPM = <span className={styles.ampm}>{timeFormatted.hours > 11 && timeFormatted.hours < 24 ? "PM" : "AM"}</span>
  }
  if (!useAMPM) {
    clockFormatted = `${timeFormatted.hours
      }:${timeFormatted.minutes}`
  }

  let locale
  if (useImperial) {
    locale = 'en-US'
  }
  if (!useImperial) {
    locale = 'en-GB'
  }

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateFormatted = date.toLocaleDateString(locale, dateOptions);

  return (
    <div className={styles.clock}>
      <div className={styles.time}>{clockFormatted}{useAMPM && displayAMPM}</div>
      <div className={styles.date}>{dateFormatted}</div>
    </div>
  );
}
