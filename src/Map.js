import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { gps } from "exifr";

const Map = () => {
  const mapRef = useRef(null);
  const images = ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg", "7.jpeg", "8.jpeg", "9.jpeg", "10.jpeg", "11.jpeg", "12.jpeg"]
  var greenIcon = L.icon({
    iconUrl: 'leaf-green.png',
    shadowUrl: 'leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
  
  async function getLatLong(imageArray) {
    for (let index = 0; index < imageArray.length; index++) {
        let {latitude, longitude} = await gps(imageArray[index]);
        addMarker(latitude, longitude, imageArray[index])
    }
  }

  useEffect(() => {
    // Initialize the map
    mapRef.current = L.map('map', {
      center: [17.4442, 78.4693], 
      zoom: 20, // Initial zoom level
    })

    //Extract lat long
    getLatLong(images)

    // Add the tile layer (Map tiles from OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © OpenStreetMap contributors',
    }).addTo(mapRef.current);

    return () => {
      // Clean up the map when the component unmounts
      mapRef.current.remove();
    };
  }, []);

  const addMarker = (lat, lng, imageSrc) => {
    // Create a marker and add it to the map
    const marker = L.marker([lat, lng], {icon: greenIcon}).addTo(mapRef.current);
    const imageElement = document.createElement('img');
    imageElement.src = imageSrc;

    // Create a popup and bind it to the marker
    const popup = L.popup({ minWidth: 500 }).setContent(imageElement);
    marker.bindPopup(popup);
  };

  return <div id="map" style={{ height: '704px' }}></div>;
};

export default Map;
