import React from 'react'
import styles from './Sidebar.module.scss'
import Clock from '../information/Clock'
import GetWeather from '../information/weather/GetWeather'

export default function Sidebar() {
  return (
    <div className={styles.sidebar_container}>
       <Clock />
       
       <GetWeather />
        
    </div>
  )
}
