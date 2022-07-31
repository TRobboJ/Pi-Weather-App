import React from 'react'
import styles from './DailyMinMax.module.scss'
import {FaTemperatureLow, FaTemperatureHigh} from 'react-icons/fa'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../store/store'

export default function DailyMinMax(props: any) {

    const {degreeSymbol} = useSelector((state: RootState)=>state.settings)
    const {min, max} = props.todaysMinMax
  return (
    <>
    <div className={styles.temperatures}>
        <div>
        <FaTemperatureLow />
        <p>{min.toFixed(1)}</p><span>{degreeSymbol}</span>
        </div>
        <div>
        <FaTemperatureHigh />
        <p>{max.toFixed(1)}</p><span>{degreeSymbol}</span>
        </div>
    </div>
    </>
  )
}
