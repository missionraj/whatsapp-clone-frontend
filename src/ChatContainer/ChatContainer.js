import React, { useState, useEffect }  from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Chat from '../Chat/Chat';
import Pusher from "pusher-js";
import axios from '../axios';

import './ChatContainer.css';

const ChatContainer = props => {
    const [ messages,setMessages ] = useState([]);
    
    useEffect(()=>{
        axios.get('/api/message/sync').then(response => {
            if (response.data.success) {
                setMessages(response.data.messages);
            } 
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
    }, [messages]);

    return (
        <div className="container__body" >
            <Sidebar /> 
            <Chat messages={messages} />
        </div>
    )
}


export default ChatContainer;

