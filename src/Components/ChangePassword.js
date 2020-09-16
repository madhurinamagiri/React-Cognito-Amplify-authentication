import React, {Component} from 'react';
//import { Link } from 'react-router-dom';
import Auth from "@aws-amplify/auth";
import { withRouter } from "react-router-dom";

class ChangePassword extends Component {    
    state = { 
        oldPassword : "",
        newPassword : ""
    }
    async componentDidMount(){
        try{
            await Auth.currentSession()  
        }catch(error){     
            console.log(error)    
            this.props.history.push('/')
        }
    }
    onInputChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        })
      }
    
      handleChangePassword = async event =>{
        event.preventDefault();
        try {
          const user =  await Auth.currentAuthenticatedUser() 
          await Auth.changePassword(user, this.state.oldPassword,this.state.newPassword); 
          this.props.history.push("/changepasswordsuccess")
        }catch(error){
          this.setState({error:error})
          console.log(error)
        };   
      }
    
      render(){
        return (
          <div className="Change password login-form Login"  >
              <h2>Change Password</h2>
              <h5>{this.state.error && this.state.error.message}</h5>
              <div className="form-group"> 
                <input className="form-control" type="password" id="oldPassword" placeholder ="Old Password" onChange={this.onInputChange} />
              </div>
              <div className="form-group"> 
                <input className="form-control" type="password" id="newPassword" placeholder ="New Password" onChange={this.onInputChange} />
              </div>
              <div className="form-group">
                <input className="form-control primary" type="submit" onClick={this.handleChangePassword} />
              </div>
               
          </div>
        );
      }
}

export default withRouter(ChangePassword);
