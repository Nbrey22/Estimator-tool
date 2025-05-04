import React, {useRef} from 'react';
import './EstimateResult.css'; 
import axios from 'axios';


const EstimateResult = ({ 
    customer, 
    materials, 
    labor, 
    materialMarkupPercentage, 
    finalCostsPercentage, 
    total 
  }) => {
  
  // function to save estimates
  const saveEstimate = async () => {
    try {
      const estimateData = {
        customer,
        materials,
        labor,
        materialMarkupPercentage,
        finalCostsPercentage,
        total
      };

      // send POST request to backend API
      const response = await axios.post('http://localhost:3001/api/estimates', estimateData);

      // if successful, notify user and log the result
      alert('Estimate saved successfully!');
      console.log(response.data);
    } catch (error) {
      // handle errors if something goes wrong
      console.error('Error saving estimate:', error);
      alert('Failed to save estimate');
    }
  };
  
    return (
      <div className="estimate-result" /*ref={estimateRef}*/>
        <div className="estimate-header">
          <h1>Job Estimate</h1>
      </div>
    
      <div className="company-info">
        <h3>Company Information</h3>
        <p><strong>Name:</strong> Name</p>
        <p><strong>Address:</strong> Address</p>
        <p><strong>Phone:</strong> Number</p>
        <p><strong>Email:</strong> Email</p>
      </div>

      <div className="customer-info">
        <h3>Customer Information</h3>
        <p><strong>Name:</strong> {customer.name}</p>
        <p><strong>Address:</strong> {customer.address}</p>
        <p><strong>City, State, Postal Code:</strong> {customer.cityStateZip}</p>
        <p><strong>Phone:</strong> {customer.phone}</p>
        <p><strong>Email:</strong> {customer.email}</p>
      </div>

    <div className="section">
      <h3>Materials</h3>
      {materials && materials.length > 0 ? (
        <table className="estimate-table">
          <thead>
            <tr>
              <th>Material</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material, index) => (
              <tr key={index}>
                <td>{material.name}</td>
                <td>{material.quantity}</td>
                <td>${material.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No materials added</p>
      )}
    </div>

    <div className="section">
      <h3>Labor</h3>
      {labor && labor.length > 0 ? (
        <table className="estimate-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Quantity (hrs)</th>
              <th>Rate/hr</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {labor.map((item, index) => (
              <tr key={index}>
                <td>{item.type}</td>
                <td>{item.quantity}</td>
                <td>${item.rate.toFixed(2)}</td>
                <td>${(item.quantity * item.rate).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No labor added</p>
      )}
    </div>

    <div className="estimate-summary">
      <h3>Estimate Summary</h3>
      <p><strong>Material Markup:</strong> {materialMarkupPercentage}%</p>
      <p><strong>Final Cost Percentage:</strong> {finalCostsPercentage}%</p>
      <p className="total-estimate"><strong>Total Estimate:</strong> ${Number(total).toFixed(2)}</p>
    </div>
    
    {/* save Button displays after the estimate result */}
    <button onClick={saveEstimate}>Save Estimate</button>

    </div>
    );
  };
  
  export default EstimateResult;