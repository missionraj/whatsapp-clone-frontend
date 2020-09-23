import React , { useEffect } from 'react';
import './App.css';
import Login from './Login/Login';
import ChatContainer from './ChatContainer/ChatContainer'

import { useDataLayerValue } from './stateProvider';
import { actionTypes } from './reducer'

function App() {
  
  const [ { user } , dispatch ] = useDataLayerValue();
  
  useEffect(() => {
    let user = sessionStorage.getItem("user");
    dispatch({
      type:actionTypes.SET_USER,
      user:JSON.parse(user)
    })  
  },[])
  return (
        <div className="app">
          {
            user ? (
              <ChatContainer />
            ) : (
              <Login /> 
            )
          }
        </div>
  );
}

export default App;
