import {useLocation} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {useNavigate } from "react-router-dom";
import '../styles/screens/Search.css';

function Searchresult() {

    const navigate = useNavigate();
    const location = useLocation();
    let dataskin = {};
     dataskin=location.state;
     console.log(dataskin);
    const goToskinml = () => navigate('/Skincancerml',{state:dataskin});
    const goTokidneystoneml = () => navigate('/kidneystoneml',{state:dataskin});
    const goToCkdML = () => navigate('/chronickidneyml',{state:dataskin}); 
    const goToBreastCancerML = () => navigate('/breastcancerml',{state:dataskin});   
    const goToThyroid_Disease_ML = () => navigate('/thyroidDiseaseml',{state:dataskin});   

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    return (

            <>
    <br></br>
    <h2>Pateint Basic Information details</h2>
<       div class="center">
            <center> 
                <table class="my_table">
                    <tr>
                        <td>ID</td>
                        <td>{location.state.id}</td>
                    
                    </tr>
                        <tr>
                        <td>Name</td>
                        <td>{location.state.FName} {location.state.LName}</td>
                    
                    </tr>
                        <tr>
                        <td>Blood Group</td>
                        <td>{location.state.BloodGroup}</td>
                        
                    </tr>
                    <tr>
                        <td>Age</td>
                        <td>{location.state.Age}</td>
                        
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td>{location.state.MobileNumber}</td>
                        
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{location.state.EmailId}</td>
                        
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>{location.state.Address}</td>
                        
                    </tr>
                </table>
            </center>
        </div>



<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 
  <link rel="stylesheet" href="style.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/remixicon@3.2.0/fonts/remixicon.css" rel="stylesheet" />
</head>

<section class="container">
    <h2>Patient Specific Services</h2>
    <div class="row">
      <div class="service">
        <i class="ri-macbook-line"></i>
        <h3>Skin Cancer Dignostic </h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <button class="button button5" onClick={goToskinml}> go
        </button>
       
      </div>
      <div class="service">
        <i class="ri-store-3-line"></i>
        <h3>Brain Dignostic</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <button class="button button5">Go</button>
        
      </div>
    </div>
    <div class="row">
      <div class="service">
        <i class="ri-macbook-line"></i>
        <h3>Kidney Stone Diagnosis</h3>
        <p>94% accuracy ~ Convolutional Neural Networks</p>
        <button class="button button5" onClick={goTokidneystoneml}>Go</button>
      </div>
      <div class="service">
        <i class="ri-store-3-line"></i>
        <h3>Chronic Kidney Disease Diagnosis</h3>
        <p>93% accuracy~ Decision Tree</p>
        <button class="button button5" onClick={goToCkdML}>Go</button>
      </div>
    </div>
    <div class="row">
      <div class="service">
        <i class="ri-macbook-line"></i>
        <h3>Breast Cancer Diagnosis</h3>
        <p>97% accuracy ~ Linear Logistic Regression</p>
        <button class="button button5" onClick={goToBreastCancerML}>Go</button>
      </div>
      <div class="service">
        <i class="ri-macbook-line"></i>
        <h3>Thyroid Disease Detection</h3>
        <p>96% accuracy ~ Random Forest Model</p>
        <button class="button button5" onClick={goToThyroid_Disease_ML}>Go</button>
      </div>
    </div>
  </section>




            </>
        )
    }

    export default Searchresult;