import Head from "next/head";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import Sidebar from '../components/layout/Sidebar'
import Layout from "../components/layout/Layout";

const Home = () => {
  
  return (
    <>
      <Head>
        <title>Pi Weather</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
          integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
          
        />
        <script
          src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
          integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ=="
          
        ></script>
      </Head>
      <Layout />
    </>
  );
};

export default Home;
