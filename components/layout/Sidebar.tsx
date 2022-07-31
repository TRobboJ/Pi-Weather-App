import React,{useState} from 'react'
import styles from './Sidebar.module.scss'
import Clock from '../information/Clock'
import GetWeather from '../information/weather/GetWeather'

export default function Sidebar() {

  const [hideWarning, setHideWarning] = useState(false)

  const warningContent = (<div className={styles.warning}><h5>This project was designed to run on a Raspberry Pi 7inch display. Please adjust your viewport to 1024px * 600px.</h5><button onClick={()=>{setHideWarning(true)}}>Understood</button></div>)
  return (
    <div className={styles.sidebar_container}>
       <Clock />
       {!hideWarning && warningContent}
       <GetWeather />
        
    </div>
  )
}
