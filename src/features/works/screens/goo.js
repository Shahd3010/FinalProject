import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: "AIzaSyAWiyyQ5aNjGu6RzqE9ni2K5f2G9Ac270Y",
        language: "iw",
      }}
    />
  );
};

export default GooglePlacesInput;
