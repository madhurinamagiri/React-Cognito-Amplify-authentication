import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Amplify from 'aws-amplify';

//{process.env.REACT_APP_BASE_URL}
Amplify.configure({
  Auth: {
    mandatorySignId : true,
    region: process.env.REACT_APP_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_APP_CLIENT_ID,
    
  }
})

// const awsconfig  = {
//   mandatorySignId : true,
//   region: process.env.REACT_APP_COGNITO_REGION,
//   uerPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
//   userPoolCleintID: process.env.REACT_APP_COGNITO_APP_CLIENT_ID
// } 

// console.log(awsconfig)  

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
