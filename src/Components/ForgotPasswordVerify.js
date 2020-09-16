import React, {Component} from 'react'; 
import { Link, withRouter } from "react-router-dom";
import { Auth } from 'aws-amplify';

class ForgotPasswordVerify extends Component {    
    state = {
        code: "",
        password:"",
        error:"",
        email: this.props.auth.email ? this.props.auth.email : ""
    }
    onInputChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        })
      }
    handleSubmit = async event =>{
        try{
            await Auth.forgotPasswordSubmit(this.state.email, this.state.code, this.state.password);
            this.props.history.push("/changepasswordsuccess")
        }catch(error){
            this.setState({error:error})
            console.log(error)
        }
    }
    render(){  
    return (
        <div className="login-form Login">           
          <h2>Set New Password</h2>
          
          <h5 className="orange">Verification code sent to registered email {this.props.auth.codeDelivery && this.props.auth.codeDelivery.CodeDeliveryDetails.Destination}  .</h5>

          <div className="form-group">
            <input className="form-control" type="text" id="code" onChange={this.onInputChange} placeholder="Verification code" value={this.state.code} /><br/>
          </div>
          <div className="form-group">
            <input className="form-control" type="password" id="password" onChange={this.onInputChange} placeholder="New password" value={this.state.password} /><br/>
          </div>          
          <div className="form-group">
            <input className="form-control primary" type="button" value="Change Password!!" onClick={this.handleSubmit} />
          </div>
          <h5>{this.state.error && this.state.error.message}</h5>
          <div className="form-group">
            <Link   to="/login">Login</Link>
          </div>
      </div>
        );
    }
}

export default withRouter(ForgotPasswordVerify);
