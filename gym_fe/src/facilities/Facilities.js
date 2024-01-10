import React, { useEffect, useState } from 'react';
import ResponsiveAppBar from "../components/appbar";
import agent from '../api/agent';

export default function Facilities() {
  const [facilities, setFacilities] = useState();

  useEffect(() => {
    agent.Facilities.list()
      .then(facilities => setFacilities(facilities))
      .catch(error => console.error('Error fetching facilities:', error));
  }, []);

  return (
    <div>
      <ResponsiveAppBar />
      <div>
        {facilities && facilities.length > 0 ? (
          facilities.map(facility => (
            <div key={facility.id} style={facilityContainerStyle}>
             
              <img src={facility.imageUrl} alt={facility.gymName} style={imageStyle} />
              <div style={facilityDetailsStyle}>
                <h2 style={{ fontSize: '1.5rem' }}>{facility.gymName}</h2>
               
                <p style={{ fontSize: '0.8rem' }}>{facility.address}</p>
                {/* Render other facility details here */}
              </div>
            </div>
          ))
        ) : (
          <p>No facilities available</p>
        )}
      </div>
    </div>
  );
}

const facilityContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '20px',
};

const imageStyle = {
  width: '100%',
  height: '70vh',
  objectFit: 'cover',
  borderRadius: '8px',

};

const facilityDetailsStyle = {
  textAlign: 'center',
  marginTop: '10px',
};
