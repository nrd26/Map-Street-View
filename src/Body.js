import { Button, Image, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker
} from "react-simple-maps";
import { FaArrowRight } from "react-icons/fa"
import { gps } from "exifr";

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const markers = [
  { markerOffset: -15, name: "Hyderabad", coordinates: [], image: "1.jpeg" },
  { markerOffset: -15, name: "Hyderabad", coordinates: [], image: "2.jpeg" },
  { markerOffset: 25, name: "Hyderabad", coordinates: [], image: "3.jpeg" },
  { markerOffset: 25, name: "Hyderabad", coordinates: [], image: "4.jpeg" },
  { markerOffset: 25, name: "Hyderabad", coordinates: [], image: "5.jpeg" },
  { markerOffset: 25, name: "Hyderabad", coordinates: [], image: "6.jpeg" },
  { markerOffset: -15, name: "Hyderabad", coordinates: [], image: "7.jpeg" },
  { markerOffset: -15, name: "Hyderabad", coordinates: [], image: "8.jpeg" },
  { markerOffset: 25, name: "Hyderabad", coordinates: [], image: "9.jpeg" },
  { markerOffset: 25, name: "Hyderabad", coordinates: [], image: "10.jpeg" },
  { markerOffset: -15, name: "Hyderabad", coordinates: [], image: "11.jpeg" },
  { markerOffset: -15, name: "Hyderabad", coordinates: [], image: "12.jpeg" }
];

for (let index = 0; index < markers.length; index++) {
  markers[index]["index"] = index;
  let {latitude, longitude} = await gps(markers[index].image);
  markers[index].coordinates[0] = parseFloat(longitude.toFixed(4));
  markers[index].coordinates[1] = parseFloat(latitude.toFixed(4));

  // console.log("At index ",index,", marker is:", markers[index])
}

// console.log("All markers:", markers)


const Body = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [name, setName] = React.useState(null)
    const [image, setImage] = React.useState(null)
    const [index, setIndex] = React.useState(0);


  return (
  <>
  {/* MODAL */}
  <Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        {name}
        <Button float={"right"} rightIcon={<FaArrowRight/>} onClick={()=>{
          if (index+1>=markers.length) {
            setIndex(0)
          }else{
            setIndex(index+1)
          }
          setName(markers[index].name)
          setImage(markers[index].image)
        }}>Next</Button>
        </ModalHeader>
      <ModalBody>
<Image src={image}  />
      </ModalBody>
    </ModalContent>
  </Modal>

  {/* MAPS */}
  <ComposableMap
  projection="geoMercator"
    >
      <ZoomableGroup center= {[78.4693, 17.4442]} zoom={20}>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#EAEAEC"
              stroke="#D6D6DA"
            />
          ))
        }
      </Geographies>
      
      {markers.map(({ name, coordinates, markerOffset, image, index }) => (
        <>
        <Marker 
        onClick={()=>{
          setIndex(index)
          onOpen();
          setName(name);
          setImage(image);
      }}
       key={name} 
       coordinates={coordinates}
       >
            
          <circle r={3} fill="#F00" stroke="#fff" strokeWidth={2} />
          <text
            textAnchor="middle"
            // y={markerOffset}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize:"8px" }}
          >
            {name}
          </text>
        </Marker>
        </>
        
      ))}
      </ZoomableGroup>
    </ComposableMap></>
    
  );
};

export default Body;