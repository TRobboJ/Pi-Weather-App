import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import React, {useState} from 'react'
import styles from './MapView.module.scss'
import MapOverlay from '../map/MapOverlay'




export default function MapView() {
const [rainTilesTimestamp, SetRainTilesTimestamp] = useState('')
const [userCoords, SetUserCoords] = useState({
    lat: 0,
    lon: 0,
    fetched: false
})
const [rainTilesLoaded, SetRainTilesLoaded] = useState(false)
const apiData = getWeatherTiles()
if (!apiData) {return}
apiData.then(data => {
    SetRainTilesTimestamp(data.radar.nowcast[0].path)
    SetRainTilesLoaded(true)
})

function getUserLocation() {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(getUserLocationAsCoords)
}

function getUserLocationAsCoords(position) {
    SetUserCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        fetched: true
    })
}
if (!userCoords.fetched) {
    getUserLocation()
}

if (userCoords.fetched){
  return (
    <MapContainer className={styles.map} center={[userCoords.lat, userCoords.lon]} zoom={7} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
        />
        {rainTilesLoaded && <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url={`https://tilecache.rainviewer.com/v2/radar/${rainTilesTimestamp}/256/{z}/{x}/{y}/2/1_1.png`}
        />}
    </MapContainer>
  )}
}

async function getWeatherTiles() {
    const response = await fetch("https://api.rainviewer.com/public/weather-maps.json")
    const data =  await response.json()
    return data
}


