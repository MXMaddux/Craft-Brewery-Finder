import React, { useState, useContext, createContext } from "react";
import axios from "axios";

const UserContext = createContext();
//  OpenBreweryDb = https://openbrewerydb.org/documentation#search-breweries
// GoogleReversGeocoding = https://developers.google.com/maps/documentation/geocoding/requests-reverse-geocoding#reverse-requests

const UserProvider = ({ children }) => {
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const [userLocation, setUserLocation] = useState(null);
  const [locationCity, setLocationCity] = useState(null);
  const [breweries, setBreweries] = useState([]);
  const [areBreweries, setAreBreweries] = useState(false);

  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  const formatPhoneNumber = (phoneNumberString) => {
    const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return null;
  };

  const reverseGeocodingLookup = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleMapsApiKey}`
      );
      const results = response.data.results;
      if (results.length > 0) {
        const city = results[0].address_components.find((component) =>
          component.types.includes("locality")
        );
        return city ? city.long_name : null; // Directly return the city name
      } else {
        console.log("No results found");
        return null;
      }
    } catch (error) {
      console.error("Error during reverse geocoding lookup:", error);
      return null;
    }
  };

  const findByCityState = async (city, state) => {
    try {
      const response = await axios.get(
        `https://api.openbrewerydb.org/breweries?by_city=${encodeURIComponent(
          city
        )}&by_state=${encodeURIComponent(state)}&per_page=300`
      );
      setBreweries(response.data);
      setAreBreweries(true);
    } catch (error) {
      console.error("Error finding breweries:", error);
    }
  };

  const findBreweriesByCurrentCity = async () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });

        const cityName = await reverseGeocodingLookup(latitude, longitude);
        // Use the directly returned cityName for further actions
        if (cityName) {
          setLocationCity(cityName); // Update state if needed for other purposes
          try {
            const res = await axios.get(
              `https://api.openbrewerydb.org/breweries?by_city=${encodeURIComponent(
                cityName
              )}&per_page=100`
            );
            console.log(res.data);
            setBreweries(res.data);
            setAreBreweries(true); // Update breweries list based on city name;
          } catch (error) {
            console.error("Error finding breweries:", error);
          }
        } else {
          console.error("City not found.");
        }
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  };

  return (
    <UserContext.Provider
      value={{
        userLocation,
        findBreweriesByCurrentCity,
        locationCity,
        breweries,
        formatPhoneNumber,
        findByCityState,
        areBreweries,
        setAreBreweries,
        states,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(UserContext);
};

export { UserContext, UserProvider };
