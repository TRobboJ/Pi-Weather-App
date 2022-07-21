<<<<<<< Updated upstream
=======
import React from 'react'
import styles from './CurrentWeather.module.scss'

export default function CurrentWeather(props) {
  const {temperature, weatherIcon, weatherIconAlt} = props.currentWeather


  return (
    <div className={styles.current_weather}>
        <p>{temperature.toFixed(1)}°C</p>
        <div className={styles.weather_icon}>
          <img src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt={weatherIconAlt} />
        </div>
    </div>
  )
}
>>>>>>> Stashed changes
