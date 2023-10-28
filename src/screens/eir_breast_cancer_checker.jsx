import { useLocation } from 'react-router-dom';
import '../styles/screens/diagonostic.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BreastCancerML() {

  const location = useLocation();
  const [prediction, setPrediction] = useState('');
  const patient_id = location.state.id;
  const BASE_URL = 'https://e-react-node-backend-22ed6864d5f3.herokuapp.com'; // Update with your node backend app URL
  //const BASE_URL = 'http://localhost:8080'; // Update with your node backend app URL

  useEffect(() => {
    // Function to retrieve breast cancer data
    const getBreastCancerData = async () => {
      try {
        console.log("patient found ", patient_id);
        const response = await axios.post(`${BASE_URL}/getBreastCancerData`, {
          patient_id,
        });
        const { data } = response;
        if (data.error) {
          alert(JSON.stringify(data.error));
        } else {
          delete data.id;
          delete data.patient_id;
          console.log(data)
          const responsePrediction = await axios.post(`https://breastcancerml-717ef42b90b4.herokuapp.com/predict`, data, {
            headers: {
              'Content-Type': 'multipart/form-data', // Important: Set the content type to form data
            },
          });
          console.log(responsePrediction.data)
          setPrediction(responsePrediction.data);
        }
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    };

    getBreastCancerData();
  }, [patient_id]);

  return (
    <>
      {prediction}
    </>
  )
}

export default BreastCancerML;



