import React from 'react'
import styles from './Sidebar.module.scss'
import Clock from '../information/Clock'
import SunriseSunset from '../information/SunriseSunset'
import GetWeather from '../information/GetWeather'

export default function Sidebar() {
  return (
    <div className={styles.sidebar_container}>
       <Clock />
       <SunriseSunset />
       <GetWeather />
        
    </div>
  )
}
