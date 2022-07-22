import React from 'react'
import styles from './DailyMinMax.module.scss'
import {FaTemperatureLow, FaTemperatureHigh} from 'react-icons/fa'
export default function DailyMinMax(props) {

    if (!props) return
    const {min, max} = props.todaysMinMax
  return (
    <>
    <h3 className={styles.minmax}>Lows/Highs</h3>
    <div className={styles.temperatures}>
      
        <FaTemperatureLow />
        <p>{min.toFixed(1)}°C</p>
        <FaTemperatureHigh />
        <p>{max.toFixed(1)}°C</p>
    </div>
    </>
  )
}
