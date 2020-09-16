import React, {Component} from 'react';
//import { Link } from 'react-router-dom';
import Auth from "@aws-amplify/auth";
import { withRouter } from "react-router-dom";

class Dashboard extends Component {    
    state = {
        jwtToken : ""
    }
    async componentDidMount(){
        try{
            const currentUser = await Auth.currentAuthenticatedUser()
            console.log("Dashboard: ", currentUser)
            const jwtToken = (await Auth.currentSession()).getIdToken().getJwtToken()
            this.setState({jwtToken:jwtToken})
            try {
                var myheaders ={
                  authToken : jwtToken
                }
                const response = await fetch('http://localhost:3002/verifytoken',{
                  method: "GET", 
                headers: myheaders
                });
                const json = await response.json(); 
                console.log("fetch request");
                console.log(json)
              } catch (error) {
                console.log(error);
              }
        
        }catch(error){     
            console.log(error)    
            this.props.history.push('/')
        }
    }
    
    render(){  
    return (
        <div className="dashboard">
            <h2>Dashboard</h2>           
            <h4 className="orange">Welcome {this.props.auth.user && this.props.auth.user.username}</h4> 
            <h4 className="green">Signed in successfully!!</h4>    
            <a href={'http://localhost:3001/verify/'+this.state.jwtToken}  rel="noopener noreferrer" target="_blank">partner site</a>
        </div>
        );
    }
}

export default withRouter(Dashboard);
