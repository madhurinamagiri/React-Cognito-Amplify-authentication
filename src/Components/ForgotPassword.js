import React, { Component } from 'react';
import Auth from "@aws-amplify/auth";
import { Link, withRouter } from "react-router-dom";


class ForgotPassword extends Component {
  state = {
    email: "",
    error : ""
  }

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleForgotPassword = async event =>{
    event.preventDefault();
    try {
      const CodeDeliveryDetails = await Auth.forgotPassword(this.state.email); 
      console.log(CodeDeliveryDetails)
      this.props.auth.setCodeDelivery(CodeDeliveryDetails);
      this.props.auth.setEmail(this.state.email)
      this.props.history.push("/forgotPasswordVerification")
    }catch(error){
      this.setState({error:error})
      console.log(error)
    };   
  }

  render(){
    return (
      <div className="ForgotPassword login-form Login"  >
          <h2>Forgot Password</h2>
          <h5>{this.state.error && this.state.error.message}</h5>
          <div className="form-group"> 
            <input className="form-control" type="text" id="email" placeholder ="Enter registered email" onChange={this.onInputChange} />
          </div>
          <div className="form-group">
            <input className="form-control primary" type="submit" onClick={this.handleForgotPassword} />
          </div>
          <div className="form-group">
            <Link   to="/login">Login</Link>
          </div>
      </div>
    );
  }
}

export default withRouter(ForgotPassword);
