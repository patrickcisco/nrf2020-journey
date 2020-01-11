
import React from 'react';
import FloorPlan from './components/FloorPlan';
import FloorPlanImage from './components/FloorPlan.jpg';

import { Socket } from 'react-socket-io';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import './App.css';
import QA from './pages/QA';
import Admin from './pages/Admin';
const uri = 'http://localhost:4001';
const options = { transports: ['websocket'] };


function App() {
  return (
    <div
    style={{
      backgroundColor: 'white',
    }}
    >
    <Router>
      <Socket uri={uri} options={options}> 
        <Switch>
          <Route path='/qa'>
            <QA/>
          </Route>
          <Route path='/admin'>
            <Admin/>
          </Route>
        </Switch>
      {/* <FloorPlan image={FloorPlanImage}/> */}
      </Socket>

    </Router>
    </div>
  )
}

export default App;