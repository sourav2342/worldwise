import { useNavigate, useSearchParams } from "react-router-dom"
import styles from "./Map.module.css";
import {MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import useGeolocation from "../hooks/useGeolocation";
import Button from "./Button";
import useUrlPosition from "../hooks/useUrlPosition";

export default function Map(){

    const {cities} = useCities();
    const [mapPosition, setMapPosition ]= useState([0,40]);
    
    const {lat, lng} = useUrlPosition();

    const {
        isLoading:isLoadingPosition ,
         position: geolocationPosition ,
         getPosition
         } = 
         useGeolocation();
    

    useEffect(
        function(){
      
          if(lat && lng){setMapPosition([lat, lng]);console.log(lat, lng)}
        
      },
       [lat, lng]
    );
    
    useEffect(
        function(){
            if(geolocationPosition)
            setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
        }, [geolocationPosition]
    )
    
    return <div className={styles.mapContainer} 
     >
    <Button type="position" onClick={getPosition}  >
        {isLoadingPosition ? "...loading": "use your position"}
    </Button>
    <MapContainer 
       center={mapPosition} 
       zoom={60} 
       scrollWheelZoom={true} 
       className={styles.map}
    >
    <TileLayer
      attribution='&copy; <a href="https://www.
      openstreetmap.org/copyright">OpenStreetMap</a>
      contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/
      {x}/{y}.png"
    />
   
    {/* {cities.map((city)=>{
         <Marker 
         position={mapPosition} //[city.position.lat, city.position.lng]
         key={city.id}
         >
         <Popup>
         A pretty CSS3 popup. <br /> Easily customizable.
         </Popup>
     </Marker>
    })} */}

   {cities.map((city) => {
     return <Marker  
        position={[city.position.lat, city.position.lng]} 
        key={city.id}
    >
         <Popup>
         <span>{city.emoji} </span>
          <span>{city.cityName}</span>
         </Popup>
     </Marker>
    })}
    
   <ChangeCenter position={mapPosition}  />
   <DetectClick/>
  </MapContainer>
    </div>
}

function ChangeCenter({position}){

    if (!position[0] || !position[1]) return null;
    const map = useMap()
    map.setView(position);
    return null;
}

function DetectClick(){
    const navigate = useNavigate();

    useMapEvents({

        click: e => {console.log(e);navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)},
    })
}
// onClick={()=>navigate("form")} onclick event should be a call back function 
// onClick={navigate("form")} this line of code gives an error saying " Cannot update a component (`BrowserRouter`) while rendering a different component "
// it happens when where you are trying to update the BrowserRouter component or its state and ensure that such updates are performed at an appropriate time in the component lifecycle, such as during event handlers, useEffect hooks, or other lifecycle methods.
// if you need to perform state updates based on user interactions, you can use the useEffect hook to handle these updates after the initial rendering
// Updating state during rendering: You might have written code inside a rendering function that causes a state update. For example:
// jsx
// Copy code
// function MyComponent() {
//   const [count, setCount] = useState(0);
  
//   // This is incorrect and will trigger the warning
//   setCount(count + 1);
  
//   return (
//     // JSX rendering code
//   );
// }