import React from 'react'
import Sidebar from './Sidebar'
import styles from './Layout.module.scss'
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function Layout() {
    const Map = useMemo(
        () =>
          dynamic(() => import("./MapView"), {
            loading: () => <p className={styles.loading_status}>Please wait while the map loads...</p>,
            ssr: false,
          }),
        []
      );
  return (
    <div>
        <Map />
        <Sidebar />
    </div>
  )
}
