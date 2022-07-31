import React from 'react'
import DailyForecast from './DailyForecast'
import styles from './Forecast.module.scss'
import { kelvinToCelsius, kelvinToFarenheit } from "../../../utils/utils";
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store'

export default function Forecast(props: any) {
  const {useImperial} = useSelector((state: RootState)=>state.settings)
  const renderForecast = props.dailyForecast.map((day: any, i: number) => {
    if (i === 0) return // dailyForecast is an array of 8 days, including today. I skip today and return the next 7 days
    const dayOfTheWeek = getDayOfTheWeek(i)
    const temp = useImperial ? kelvinToFarenheit(day.temp.day): kelvinToCelsius(day.temp.day)
    const weatherDescription = day.weather[0].description
    const weatherIcon = day.weather[0].icon
    return <DailyForecast key={dayOfTheWeek} temperature={temp} weatherDescription={weatherDescription} weatherIcon={weatherIcon} dayOfTheWeek={dayOfTheWeek}/>
  })

  function getDayOfTheWeek(dayOfWeekIndex: number) {
    const today = new Date().getDay()
    let dayOfTheWeek = today + (dayOfWeekIndex)
    if (dayOfTheWeek > 6) dayOfTheWeek -= 7
    return dayOfTheWeek // returns an array index between 0-6 (Sun-Sat)
  }
  return (
    <div className={styles.forecast}>
    <h3 className={styles.forecast_title}>Forecast</h3>
    <div className={styles.forecast_content}>
      <>
        {renderForecast}
      </>
    </div>
    </div>
  )
}