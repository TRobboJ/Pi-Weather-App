import React from 'react'
import styles from './CurrentWeather.module.scss'
import {WiHumidity} from 'react-icons/wi'

export default function CurrentWeather(props) {
  if (!props) return
  const {temperature, weatherIcon, weatherIconAlt, humidity} = props.currentWeather

  return (
    <>
    <h3 className={styles.current}>Current</h3>
    <div className={styles.current_weather}>
      
      
      <div className={styles.row}>
      
        <p>{temperature.toFixed(1)}°C</p>
        <div className={styles.weather_icon}>
          <img src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt={weatherIconAlt} />
        </div>
        </div>
        <div className={styles.row}>
        <p>{humidity}</p>
        <WiHumidity/>
        </div>
    </div>
    </>
  )
}
