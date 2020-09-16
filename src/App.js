import React from 'react';  
import Login from './Components/Login'; 
import NavBar from './Components/NavBar';
import Dashboard from './Components/Dashboard';
import ForgotPassword  from './Components/ForgotPassword';
import ForgotPasswordVerify from './Components/ForgotPasswordVerify';
import ChangePasswordSuccess from './Components/ChangePasswordSuccess';
import ChangePassword from './Components/ChangePassword';
import './App.css';
import { Auth } from 'aws-amplify';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends React.Component {
  state = {
    isAuthenticated : false,
    user : null,
    isAuthenticating: true,
    jwtToken:null,
    codeDelivery: null,
    email: "",
    error : null
  }

  setAuthStatus = authenticated =>{
    this.setState({isAuthenticated : authenticated});

  }

  setUser = user => {
    this.setState({user:user});
  }

  setJWTtoken = token => {
    this.setState({jwtToken:token});
  }

  setCodeDelivery = user =>{
    this.setState({codeDelivery:user})
  }

  setEmail = email => {
    this.setState({email:email})
  }

  setError = error => {
    this.setState ({error : error })
  }

  async componentDidMount(){
    try{
      const userSession = await Auth.currentSession();  
      if (userSession){
        this.setAuthStatus(true)
      }
      const userDetails = await Auth.currentAuthenticatedUser();
      this.setUser(userDetails) 
      const jwtToken = await Auth.currentSession().getIdToken().getJwtToken()
      this.setJWTtoken(jwtToken) 
      console.log(jwtToken)
    }catch(error){
      console.log(error)
    }
    this.setState({isAuthenticating: false})
  }

  render(){
    const authProps = {
      isAuthenticated : this.state.isAuthenticated,
      user: this.state.user,
      jwtToken: this.state.jwtToken,
      codeDelivery : this.state.codeDelivery,
      email:this.state.email,
      error: this.state.error,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser,
      setJWTtoken: this.setJWTtoken,
      setCodeDelivery : this.setCodeDelivery,
      setEmail: this.setEmail,
      setError: this.setError
    }
    console.log('authprops : ', authProps)
    return (
     !this.state.isAuthenticating &&
        <div className="App"> 
         <Router>
            <div>
              <NavBar auth={authProps} />               
              <Switch>
                <Route exact path="/" render={(props) => <Home {...props} auth={authProps} />} />
                <Route exact path="/login" render = {(props) => <Login  {...props} auth={authProps} />}  /> 
                <Route exact path="/dashboard" render = {(props) => <Dashboard {...props} auth={authProps} /> } />
                <Route exact path="/forgotPassword" render = {(props) => <ForgotPassword {...props} auth={authProps} /> } />
                <Route exact path="/forgotPasswordVerification"  render = {(props) => <ForgotPasswordVerify {...props} auth={authProps} /> } />
                <Route exact path="/changepasswordsuccess"  render = {(props) => <ChangePasswordSuccess {...props} auth={authProps} /> } />
                <Route exact path="/changePassword"  render = {(props) => <ChangePassword {...props} auth={authProps} /> } />
                
                
              </Switch> 
            </div>
          </Router>
        </div> 
    );
  }
}

const Home = () => (
  <div>
    Home Page
  </div>
);

export default App;
