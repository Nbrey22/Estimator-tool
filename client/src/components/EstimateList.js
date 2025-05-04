import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EstimateList.css';
import EstimateResult from './EstimateResult'; 

const EstimateList = () => {
  const [estimates, setEstimates] = useState([]);
  // state to store selected estimate
  const [selectedEstimate, setSelectedEstimate] = useState(null);  

  // fetch estimates from the backend on component mount
  useEffect(() => {
    const fetchEstimates = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/estimates');
        // log to see saved estimate
        console.log(response.data);
        setEstimates(response.data);
      } catch (error) {
        console.error('Error fetching estimates:', error);
      }
    };

    fetchEstimates();
  }, []); // empty array ensures this runs only once after initial render

  // handle deleting an estimate
  const handleDelete = async (id) => {
    // confirmation dialog before proceeding with the delete
    const isConfirmed = window.confirm('Are you sure you want to delete this estimate?');
    
    if(isConfirmed){
        try {
        await axios.delete(`http://localhost:3001/api/estimates/${id}`);
        setEstimates(estimates.filter((estimate) => estimate.id !== id)); // Remove from state
        alert('Estimate deleted successfully!');
        } catch (error) {
        console.error('Error deleting estimate:', error);
        alert('Failed to delete estimate');
        }
    }else{
        // if not confirmed, just log delete was cancelled
        console.log('Delete action was cancelled')
    }
  };

    // handle selecting an estimate
    const handleSelect = (estimate) => {
        console.log('Selected Estimate:', estimate);
        // ask if the user wants to display the selected estimate
        const isConfirmed = window.confirm('Would you like to display this estimate?');
        if (isConfirmed) {
        setSelectedEstimate(estimate); // set the selected estimate to display
        } else {
            console.log('Display action was cancelled');
        }
    };

  return (
    <div className="estimate-list-container">
        <div className="estimate-list">
            <h2>Saved Estimates</h2>
            <ul>
                {estimates.map((estimate) => (
                <li key={estimate.id} className="estimate-item">
                    <div>
                        <h3>{estimate.customer_name}</h3>
                        <p>Total: ${estimate.total}</p>
                    </div>
                    <button onClick={() => handleSelect(estimate)}>Select</button>
                    <button onClick={() => handleDelete(estimate.id)}>Delete</button>
                </li>
            ))}
      </ul>
      </div>
      
      {/* conditionally render EstimateResult if a selected estimate exists */}
      {selectedEstimate && (
        <div className="selected-estimate">
          <EstimateResult
            customer={{
                name: selectedEstimate.customer_name,
                address: selectedEstimate.customer_address,
                cityStateZip: selectedEstimate.customer_city_state_zip,
                phone: selectedEstimate.customer_phone,
                email: selectedEstimate.customer_email
              }}
              materials={selectedEstimate.materials}
              labor={selectedEstimate.labor}
              materialMarkupPercentage={selectedEstimate.material_markup_percentage}
              finalCostsPercentage={selectedEstimate.final_costs_percentage}
              total={selectedEstimate.total}
          />
        </div>
      )}
    </div>
  );
};

export default EstimateList;