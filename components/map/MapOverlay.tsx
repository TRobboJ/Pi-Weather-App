import React from 'react'
import { TileLayer, useMap } from 'react-leaflet'


var optionKind = 'radar'; // can be 'radar' or 'satellite'

var optionTileSize = 256; // can be 256 or 512.
var optionColorScheme = 2; // from 0 to 8. Check the https://rainviewer.com/api/color-schemes.html for additional information
var optionSmoothData = 1; // 0 - not smooth, 1 - smooth
var optionSnowColors = 1; // 0 - do not show snow colors, 1 - show snow colors

export default async function MapOverlay() {
    const map = useMap()

    const response = await fetch("https://api.rainviewer.com/public/weather-maps.json")
    const data = await response.json()
    return <TileLayer url={`https://tilecache.rainviewer.com/${optionTileSize}/{z}/{x}/{y}/${optionColorScheme}/${optionSmoothData}_${optionSnowColors}.png`} />

//   return (
//    <>
//     <TileLayer url={`https://tilecache.rainviewer.com/${optionTileSize}/{z}/{x}/{y}/${optionColorScheme}/${optionSmoothData}_${optionSnowColors}.png`} opacity={0.5} zIndex={10} />
//    </>
//   )
}


// async function getWeatherMapJSON() {
//     const response = await fetch("https://api.rainviewer.com/public/weather-maps.json")
//     const data = await response.json()
//     return data
// }
// async function getWeatherMapJSON() {
//     const response = await fetch("https://api.rainviewer.com/public/weather-maps.json")
//     const data = await response.json()
//     map.TileLayer(`${data.host}/${optionTileSize}/{z}/{x}/{y}/${optionColorScheme}/${optionSmoothData}_${optionSnowColors}.png`)
// }
//{`https://tilecache.rainviewer.com/${optionTileSize}/{z}/{x}/{y}/${optionColorScheme}/${optionSmoothData}_${optionSnowColors}.png`} opacity={0.5} zIndex={10} />