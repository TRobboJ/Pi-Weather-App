import React, { useEffect, useState } from "react";
import styles from "./Clock.module.scss";
export default function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(clockInterval);
    };
  }, []);

  const timeFormatted = {
    hours: date.getHours(),
    minutes: (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
  };

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateFormatted = date.toLocaleDateString("en-GB", dateOptions);

  return (
    <div className={styles.clock}>
      <div className={styles.time}>{`${
        timeFormatted.hours
      }:${timeFormatted.minutes}`}</div>
      <div className={styles.date}>{dateFormatted}</div>
    </div>
  );
}
