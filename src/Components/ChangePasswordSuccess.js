import React, {Component} from 'react'; 
import { Link, withRouter } from "react-router-dom"; 

class ChangePasswordSuccess extends Component {    
    state = {
        code: "",
        password:"",
        loggedIn: this.props.auth.user ? true : false
    }
    onInputChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        })
      }
    
    render(){  
    return (
        <div className="login-form Login"> 
          <h2 className="green">Success</h2>
          <h5 >Password updated successfully!!</h5>         
          {!this.state.loggedIn &&
          <div className="form-group">
            <Link   to="/login">Login</Link>
          </div>
        }
      </div>
        );
    }
}

export default withRouter(ChangePasswordSuccess);
