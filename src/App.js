import React from 'react';
import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './screens/LandingPage';
import DBConnection from './screens/DBConnection';
import Contact from './screens/Contact';
import AboutUs from './screens/AboutUs';
import Searchpatient from './screens/searchpatient';
import Searchresult from './screens/searchresult';
import Skincancerml from './screens/skincancerml';
import Header from './components/Header-new';
import Footer from './components/footer-new';
import Kidney_stone_ml from './screens/eir_kidney_stone_checker';
import Ckdml from './screens/eir_kidney_cdk_checker';
import LogIn from './screens/LogIn/LogIn';
import SignUp from './screens/SignUp/SignUp';
import PatientRegistration from './screens/SignUp/PatientRegistration';
import DoctorRegistration from './screens/SignUp/DoctorRegistration';
import HospitalAdminRegistration from './screens/SignUp/HospitalAdminRegistration'
import LabAdminRegistration from './screens/SignUp/LabAdminRegistration'
import LabApp from './screens/SignUp/LabApp'
import 'tachyons';
import BreastCancerML from './screens/eir_breast_cancer_checker'


const initialState = {
  user: {
    id: '',
    name: '',
    email: ''
  }
}


class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
      }
    })
  }
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/LogIn" element={<LogIn loadUser={this.loadUser} />} />
          <Route path="/SignUp" element={<SignUp loadUser={this.loadUser} />} />
          <Route path="/searchpatient" element={<Searchpatient />} />
          <Route path="/skincancerml" element={<Skincancerml />} />
          <Route path="/Searchresult" element={<Searchresult />} />
          <Route path="/DBConnection" element={<DBConnection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/kidneystoneml" element={<Kidney_stone_ml />} />
          <Route path="/chronickidneyml" element={<Ckdml />} />
          <Route path="/breastcancerml" element={<BreastCancerML />} />
          <Route path="/PatientRegistration" element={<PatientRegistration loadUser={this.loadUser} />} />
          <Route path="/DoctorRegistration" element={<DoctorRegistration loadUser={this.loadUser} />} />
          <Route path="/HospitalAdminRegistration" element={<HospitalAdminRegistration loadUser={this.loadUser} />} />
          <Route path="/LabAdminRegistration" element={<LabAdminRegistration loadUser={this.loadUser} />} />
          <Route path="/LabApp" element={<LabApp />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;


