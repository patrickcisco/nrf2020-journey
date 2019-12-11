
import React from 'react';
import FloorPlan from './components/FloorPlan';
import FloorPlanImage from './components/FloorPlan.jpg';

import { Socket } from 'react-socket-io';

import './App.css';
const uri = 'http://localhost:4001';
const options = { transports: ['websocket'] };

function App() {
  return (
    <Socket uri={uri} options={options}> 
      <FloorPlan image={FloorPlanImage}/>
    </Socket>
  )
}

export default App;