import { MapContainer, TileLayer } from "react-leaflet";
import React, { useEffect, useState } from "react";
import styles from "./MapView.module.scss";
import { useInterval } from "../../utils/hooks";
import { useSelector } from "react-redux";
import { setCoords } from "../../store/settingsSlice";
import { useDispatch } from "react-redux";
import settings from '../../settings.json'

export default function MapView() {
  const dispatch = useDispatch()
  const userCoords = useSelector(state=>state.settings.coords)
  const rainmapTimer = useSelector(state=>state.settings.rainmapTimer)
  const [rainTilesTimestamp, setRainTilesTimestamp] = useState("");
  const [rainTilesLoaded, setRainTilesLoaded] = useState(false);
  
  const [userCoordsLoaded, setUserCoordsLoaded] = useState(false);

  if (!userCoordsLoaded && !settings.general.getLocation) {
    setUserCoordsLoaded(true)
  }
  if (!userCoordsLoaded && settings.general.getLocation) {
    function getUserLocation() {
      if (!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition(getUserLocationAsCoords);
    }
    getUserLocation()

    function getUserLocationAsCoords(position) {
      dispatch(setCoords([position.coords.latitude, position.coords.longitude]))
      setUserCoordsLoaded(true)
    }
  }
  
  useEffect(()=> {
    const apiData = getWeatherTiles();
    if (!apiData) {
      return;
    }
    apiData.then((data) => {
      setRainTilesTimestamp(data.radar.nowcast[0].path);
      console.log("Loaded rain weather map");
    });
    if (!rainTilesLoaded) {
      setRainTilesLoaded(true);
    }},[])

  useInterval(() => {
    const apiData = getWeatherTiles();
    if (!apiData) {
      return;
    }
    apiData.then((data) => {
      setRainTilesTimestamp(data.radar.nowcast[0].path);
      console.log("Reloaded rain weather map");
      if (!rainTilesLoaded) {
        setRainTilesLoaded(true);
      }
    });
  }, rainmapTimer);

  async function getWeatherTiles() {
    const response = await fetch(
      "https://api.rainviewer.com/public/weather-maps.json"
    );
    const data = await response.json();
    return data;
  }

  if (rainTilesTimestamp !== '' && rainTilesLoaded) {
    return (
      <MapContainer
        className={styles.map}
        center={userCoords}
        zoom={7}
        scrollWheelZoom={true}
      >
        <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" />
        
          <TileLayer
            url={`https://tilecache.rainviewer.com/v2/radar/${rainTilesTimestamp}/256/{z}/{x}/{y}/2/1_1.png`}
        />
    </MapContainer>
  )}
}

//Add when it won't get in the way
//attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
