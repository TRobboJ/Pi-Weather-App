import React from 'react'
import styles from './Sidebar.module.scss'
<<<<<<< Updated upstream
=======
import Clock from '../information/Clock'
import SunriseSunset from '../information/SunriseSunset'
import GetWeather from '../information/GetWeather'
>>>>>>> Stashed changes

export default function Sidebar() {
  return (
    <div className={styles.sidebar_container}>
<<<<<<< Updated upstream
        Sidebar content will go here
=======
       <Clock />
       <SunriseSunset />
       <GetWeather />
>>>>>>> Stashed changes
        
    </div>
  )
}
