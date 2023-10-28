import React from 'react';
import './LogIn.css';
import 'tachyons'

class LogIn extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      logInEmail : '',
      logInPassword: '',
      selectedOption: null,
      wrongCredentials:false,
    }
  }
  onEmailChange = (event) =>{
    this.setState({logInEmail: event.target.value})
  }
  onPasswordChange = (event) =>{
    this.setState({logInPassword: event.target.value})
  }
  onOptionChange = (option) => {
    this.setState({ selectedOption: option });
  }

  onSubmitLogIn = () =>{
    this.setState({ wrongCredentials: false });
    fetch('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/api/users/login',{
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      email:this.state.logInEmail,
      password:this.state.logInPassword,
      selectedOption: this.state.selectedOption
    })
    }).then(response => {
      if(response.status === 400){throw new Error('Wrong credentials')}
      return response.json();
      }
    )
    .then(user => {
      if(user.id){
        this.props.loadUser(user);
        window.location.href = '/services';
      }
    })
    .catch(error => {
      if (error.message === 'Wrong credentials') {
        this.setState({ wrongCredentials: true });
      } else {
        console.error('There was an error during the fetch:', error);
      }
    });
  }
  render(){
    return (
      <div className="main-container login-page">
        <div className="login-section b--transparent">
          <div className="login-container shadow-5 b--dark-gray br3 b--black-10 ba b--transparent">
            <h1 className='login'>Login</h1>
            Don't have an account? <a class="noHoverEffect" href='./signUp'>SignUp</a>
            <form>
              <div className="input-group">
                <label>Select an option</label>
                <div className="optionsContainer">
                  <button
                    type="button"
                    className={`optionButton ${this.state.selectedOption === 'Hospital' ? 'selected' : ''}`}
                    onClick={() => this.onOptionChange('Hospital')}
                  >
                    Hospital
                  </button>
                  <button
                    type="button"
                    className={`optionButton ${this.state.selectedOption === 'Patient' ? 'selected' : ''}`}
                    onClick={() => this.onOptionChange('Patient')}
                  >
                    Patient
                  </button>
                  <button
                    type="button"
                    className={`optionButton ${this.state.selectedOption === 'Doctor' ? 'selected' : ''}`}
                    onClick={() => this.onOptionChange('Doctor')}
                  >
                    Doctor
                  </button>
                </div>
                <label>Email Address</label>
                <input className=' input-reset  bg-transparent' placeholder="Email address..." type="email" required onChange={this.onEmailChange} />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input className='bg-transparent' placeholder="********" type="password"   onChange={this.onPasswordChange}/>
              </div>
              <div className="remember-me">
                <input type="checkbox" id="remember" class="larger-checkbox " />
                <label htmlFor="remember">Remember Me</label>
              </div>
              {this.state.wrongCredentials && <div className="error-message"> ⚠️ Incorrect Email or Password</div>}
              <button className='grow login-button' type='button'  onClick={() => this.onSubmitLogIn()}>Log In</button>
            </form>
            <br></br>
            {/* <a className='test noHoverEffect' href="#">Forgot Your Password?</a> */}
          </div>
        </div>

        <div className="image-section">
        </div>
  
      </div>
    ); 
  }

}


export default LogIn;
