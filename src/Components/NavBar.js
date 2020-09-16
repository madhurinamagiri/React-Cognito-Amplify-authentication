import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';

class NavBar extends React.Component {
    handleLogout = async event =>{
        event.preventDefault()
        try {
            Auth.signOut({ global: true });
            this.props.auth.setAuthStatus(false);
            this.props.auth.setJWTtoken(null)
            this.props.auth.setUser(null);
            this.props.history.push("/");
        }catch(error){
            console.log(error.message)
        }
    }
    render(){
        const NavStyle={ 
            width: 130
        }
        return (
            <div className="topnav">
                {this.props.auth.isAuthenticated && this.props.auth.user &&             
                    (
                        <div>
                            <a href="/dashboard"> Welcome {this.props.auth.user.username}!! </a>
                            <Link to="/" style={NavStyle} >
                                Home
                            </Link>
                            <Link to="/dashboard" style={NavStyle} > 
                                Dashboard
                            </Link>
                            <Link to="/changePassword" style={NavStyle}>
                                Change Pswd 
                            </Link>
                            <Link to="/" onClick={this.handleLogout} style={NavStyle} > 
                                Logout
                            </Link>
                        </div>
                    )
                }
                {!this.props.auth.isAuthenticated && 
                <div>
                <Link to="/" style={NavStyle} >
                    Home
                </Link>    
                <Link to="/login" style={NavStyle} > 
                    Login
                </Link>
                </div>
                }
                 
            </div>
        );
    }
}

export default withRouter(NavBar);
