import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import React, { useState } from "react";
import styles from "./MapView.module.scss";
import MapOverlay from "../map/MapOverlay";
import { useInterval } from "../../utils/hooks";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {setCoords} from '../../store/settingsSlice'

export default function MapView() {
  const userCoords = useSelector(state=>state.settings.coords)
  const awaitCoords = useSelector(state => state.settings.awaitCoords)
  const [initRainmap, setInitRainmap] = useState({
    timerInterval: 1000 * 5, //init at 1s then change to 15 minutes,
    init: false,
  });
  const [rainTilesTimestamp, setRainTilesTimestamp] = useState("");
  const [userCoordsLocated, setUserCoordsLocated] = useState(false);
  const [rainTilesLoaded, setRainTilesLoaded] = useState(false);

  useInterval(() => {
    const apiData = getWeatherTiles();
    if (!apiData) {
      return;
    }
    apiData.then((data) => {
      setRainTilesTimestamp(data.radar.nowcast[0].path);
      console.log("Reloaded rain weather map")
      if (!rainTilesLoaded) {
        setRainTilesLoaded(true);
      }
      if (!initRainmap.init) {
        setInitRainmap({
          init: true,
          timerInterval: 1000 * 60 * 15, //15 minutes
        });
      }
    });
  }, initRainmap.timerInterval);

  const dispatch = useDispatch()

  if (awaitCoords){
  function getUserLocation() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(getUserLocationAsCoords);
  }
  
  function getUserLocationAsCoords(position) {
    dispatch(setCoords({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }))
    setUserCoordsLocated(true)
  }
  getUserLocation()
  }
 

  if (userCoords.length !== 0) {
    return (
      <MapContainer
        className={styles.map}
        center={userCoords}
        zoom={7}
        scrollWheelZoom={true}
      >
        <TileLayer
         
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
        {rainTilesLoaded && (
          <TileLayer
            
            url={`https://tilecache.rainviewer.com/v2/radar/${rainTilesTimestamp}/256/{z}/{x}/{y}/2/1_1.png`}
          />
        )}
      </MapContainer>
    );
  }
}

async function getWeatherTiles() {
  const response = await fetch(
    "https://api.rainviewer.com/public/weather-maps.json"
  );
  const data = await response.json();
  return data;
}

//Add when it won't get in the way
//attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'