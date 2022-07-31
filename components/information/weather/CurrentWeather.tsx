import React from 'react'
import styles from './CurrentWeather.module.scss'
import {WiHumidity} from 'react-icons/wi'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../store/store'

export default function CurrentWeather(props: any) {
  const {degreeSymbol} = useSelector((state: RootState) =>state.settings)
  const {temperature, weatherIcon, weatherIconAlt, humidity} = props.currentWeather

  return (
    <>
    {/* <h3 className={styles.current}>Current</h3> */}
    <div className={styles.current_weather}>
      
      
        <div className={styles.row}>
      
        <p>{temperature.toFixed(1)}</p><span>{degreeSymbol}</span>
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
