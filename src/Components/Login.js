import React, { Component } from 'react';
import Auth from "@aws-amplify/auth";
import { Link, withRouter } from "react-router-dom";


class Login extends Component {
  state = {
    email: "",
    password: "",
    changePassword: false,
    error:null
  }

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = async event =>{
    event.preventDefault();
    try {
      const user = await Auth.signIn(this.state.email,this.state.password)  
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED')
      {
        this.setState({changePassword: true})    
        // const password = Auth.completeNewPassword(user, this.state.password, user.ChallengeParameters);    
        // console.log(password)
        this.props.auth.setAuthStatus(true);
        this.props.auth.setUser(user); 
      }
      else{
        const jwtToken = (await Auth.currentSession()).getIdToken().getJwtToken()
        this.props.auth.setAuthStatus(true);
        this.props.auth.setUser(user);             
        this.props.auth.setJWTtoken(jwtToken);        
        console.log(jwtToken);
        

        this.props.history.push("/dashboard");
      }
 
    }catch(error){
      this.setState({error:error})
      console.log(error)
    };    

  }
  handleChangePassword = async event => {
    try{
      event.preventDefault()
      Auth.completeNewPassword(this.props.auth.user, this.state.password, this.props.auth.user.ChallengeParameters);    
      Auth.signOut();
      this.props.auth.setAuthStatus(false);                             	
      this.props.auth.setUser(null);           
      this.props.auth.setJWTtoken(null); 
      this.props.history.push("/");

    }catch(error){
      this.setState({error:error})
      console.log(error)
    }
  }

  render(){
    return (
      !this.state.changePassword ?  
      <div className="login-form Login">
          <h2>Login</h2>
          <div className="form-group">
            <input className="form-control" type="text" id="email" onChange={this.onInputChange} placeholder="Email" value={this.state.email} /><br/>
          </div>
          <div className="form-group">
            <input className="form-control" type="password" id="password" onChange={this.onInputChange} placeholder="Password" value={this.state.password} /><br/>
          </div>
          <div className="form-group text-right">
          <Link to="/forgotPassword">Forgot Password</Link>
          </div>
          <h5 className="orange">{this.state.error && this.state.error.message}</h5>
          <div className="form-group">
            <input className="form-control primary" type="button" value="Login" onClick={this.handleSubmit} />
          </div>
      </div>
      : 
      <div className="login-form Login">
          <h2>Set new password</h2>
          <div className="form-group">
            <input className="form-control" type="password" id="password" onChange={this.onInputChange} placeholder="Enter new password" /><br/>
          </div>
          <div className="form-group">
            <input className="form-control primary" type="button" value="Change Password" onClick={this.handleChangePassword} />
          </div>
      </div>
    );
  }
}

export default withRouter(Login);
