// import the required react libraries
import React from "react";
import { useGlobalContext } from "./store/user_context";

function App() {
  const { userLocation, findBreweriesByCurrentCity, locationCity } =
    useGlobalContext();

  return <div></div>;
}

export default App;

//  Using Google Geolocation
