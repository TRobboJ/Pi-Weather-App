import React from 'react'
import DailyForecast from './DailyForecast'
import styles from './Forecast.module.scss'
import { kelvinToCelsius } from "../../../utils/utils";

export default function Forecast(props) {
  const renderForecast = props.dailyForecast.map((day, i) => {
    if (i === 0) return // I only want to get 7 days
    const dayOfTheWeek = getDayOfTheWeek(i)
    const temp = kelvinToCelsius(day.temp.day)
    const weatherDescription = day.weather[0].description
    const weatherIcon = day.weather[0].icon
    return <DailyForecast key={dayOfTheWeek} temperature={temp} weatherDescription={weatherDescription} weatherIcon={weatherIcon} dayOfTheWeek={dayOfTheWeek}/>
  })

  function getDayOfTheWeek(dayOfWeekIndex: number) {
    const today = new Date().getDay()
    let dayOfTheWeek = today + (dayOfWeekIndex)
    if (dayOfTheWeek >= 6) dayOfTheWeek -= 7
    return dayOfTheWeek
  }
  return (
    <div className={styles.forecast}>
    <h3 className={styles.forecast_title}>Forecast</h3>
    <div className={styles.forecast_content}>
        {renderForecast}
    </div>
    </div>
  )
}