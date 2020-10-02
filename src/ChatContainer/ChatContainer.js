import React, { useState, useEffect }  from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Chat from '../Chat/Chat';
import Pusher from "pusher-js";
import axios from '../axios';

import './ChatContainer.css';
import { useDataLayerValue } from '../stateProvider'

const ChatContainer = props => {
    const [ messages, setMessages ] = useState([]);
    const [{ activeRoom } ] = useDataLayerValue();
    
    useEffect(()=>{
        if (activeRoom) { 
            axios.get(`/api/message/sync/${activeRoom._id}`).then(response => {
                if (response.data.success) {
                    setMessages(response.data.messages);
                } 
            })   
        }
    },[activeRoom]);

    useEffect(() => {        
        let pusher = new Pusher('cfd9cf9c2d260e7a8a9d', {
        cluster: 'ap2'
        });
        let channel = pusher.subscribe('messages');
        channel.bind('inserted', function(data) {
            setMessages([...messages,data]);
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

