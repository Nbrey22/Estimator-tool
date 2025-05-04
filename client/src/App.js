import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import EstimateForm from './components/EstimateForm';
//*import EstimateResult from './components/EstimateResult';
import EstimateList from './components/EstimateList';

function App() {
  // state to control showing of EstimateList
  const [showEstimateList, setShowEstimateList] = useState(false); 
  
  return (
    <div className="App">
      <Header /> {/* Render Header Component */}
      <EstimateForm /> {/* Render EstimateForm Component*/}
      
      {/* do not render estimateResult breaks page */}
      {/*<EstimateResult />*/} {/* Render EstimateResult Component*/}

      {/* button to toggle showing of the EstimateList */}
      <button
        className={`view-estimates-button ${showEstimateList ? 'open' : ''}`}
        onClick={() => setShowEstimateList(!showEstimateList)}
      >
        {showEstimateList ? 'Hide Estimates' : 'View Estimates'}
      </button>

      {/* conditionally render EstimateList based on state */}
      {showEstimateList && <EstimateList />} {/* show EstimateList if state is true */}
    </div>
  );
}

export default App;
