import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import { useCollectionData } from 'react-firebase-hooks/firestore';


  function Map(props) {
    

    const mapStyles = {        
        height: "50vh",
        width: "70%"};
      
      const defaultCenter = {
        lat: 29.651634, lng: -82.324829
      }
      
      const [ selected, setSelected ] = React.useState({});
  
      const onSelect = item => {
        console.log(item.photoURL)
        setSelected(item);
      }
      

    return (
        <div className="Map">
            <LoadScript
            googleMapsApiKey="AIzaSyCMY1Hr_OzO_tlBagPatYZ8SqFUG4jkbCU">
                <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={12}
                center={defaultCenter}
                >
                {props.dat?.map(prev => <Marker key={prev.name} 
                position={{lat:parseFloat(prev.Lat),lng:parseFloat(prev.long)}} 
                onClick={() => onSelect(prev)}/>)}

            {
                    selected.name && 
                    (
                    <InfoWindow
                    position={{lat:parseFloat(selected.Lat),lng:parseFloat(selected.long)}}
                    clickable={true}
                    onCloseClick={() => setSelected({})}
                    >
                    <p>{selected.name}</p>
                    </InfoWindow>
                    )
                }

                </GoogleMap>
            </LoadScript>
        </div>
    )
  }
  
  export default React.memo(Map)