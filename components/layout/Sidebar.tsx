import React from 'react'
import styles from './Sidebar.module.scss'
import Clock from '../information/Clock'
import CurrentWeather from '../information/CurrentWeather'
import Forecast from '../information/Forecast'
import SunriseSunset from '../information/SunriseSunset'

export default function Sidebar() {
  return (
    <div className={styles.sidebar_container}>
       <Clock />
       <SunriseSunset />
       <CurrentWeather />
       <Forecast /> 
        
    </div>
  )
}
