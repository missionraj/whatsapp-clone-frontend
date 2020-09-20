import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import Chat from './Chat/Chat';
import Pusher from "pusher-js";
import axios from './axios';
import Login from './Login/Login';

import { useDataLayerValue } from './stateProvider'
function App() {
  
  const [ messages,setMessages ] = useState([]);
  const [ { user },dispatch] = useDataLayerValue();
  useEffect(()=>{
    axios.get('/api/message/sync').then(response => {
      setMessages(response.data);
    })
  },[]);

  useEffect(() => {
    
    let pusher = new Pusher('cfd9cf9c2d260e7a8a9d', {
      cluster: 'ap2'
    });

    let channel = pusher.subscribe('messages');
    channel.bind('inserted', function(data) {
      setMessages([...messages,data])
    })
    return () => { 
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages])

  return (
        <div className="app">
          <div className="app__body"> 
            <Sidebar />
            <Chat messages={messages} />
          </div>
        </div>
        // <Login /> 
  );
}

export default App;
