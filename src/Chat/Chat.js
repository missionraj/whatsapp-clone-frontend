import React, { useState, useEffect, useRef } from 'react'
import './Chat.css'
import { IconButton ,Avatar } from '@material-ui/core'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MicIcon from '@material-ui/icons/Mic';

import axios from '../axios';
import { useDataLayerValue } from '../stateProvider';

const Chat = ({messages}) => {
    const [ input, setInput] = useState("");
    const [{ user, activeRoom }] = useDataLayerValue();
    const chatRef = useRef(null);

    const sendMessage = (e)=>{
        e.preventDefault();
        axios.post('/api/messages/new',{
                "message":input,
                "user":user.id,
                "name":user.name,
                "room":activeRoom,
                "timestamp":new Date().toDateString()
            }
        ).then(res=> { 
            if(res.data.success){
                scrollToBottom();
            }
        })
        setInput("");
    }

    const scrollToBottom = () => {  
        chatRef.current.scrollTo({
            top: chatRef.current.scrollHeight,
            left: 0,
            behavior: 'smooth'
          }); 
    };

    console.log('this is the active room ...', activeRoom);
    useEffect(() => {
        scrollToBottom();
    },[]);    
    return (
        <>
        <div className="chat">
            <div className="chat__header">
                <Avatar src={activeRoom?.groupImage} />
                <div className="chat__headerInfo"> 
                    <h3> {activeRoom?.name}  </h3>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            
            </div> 
            <div className="chat__body" ref={chatRef} style={{ overflowY: "scroll" }} >
                {
                    messages.map(message=>(
                        <p className={`chat__message ${message.user === user.id ? 'chat__reciever' : '' }`} key={message._id}>
                            <span className="chat__name"> {message.name} </span>
                                { message.message }
                            <span className="chat__timeStamp"> 
                                { message.timestamp }
                            </span>
                        </p>
                    ))
                }

            </div> 
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <AttachFileIcon />
                <form>
                    <input value={input} onChange={e=>setInput(e.target.value)} type="text" placeholder="send a message"/>
                    <button onClick={sendMessage} type="submit"> </button>
                </form>
                <MicIcon />
            </div>
            
        </div>
        </>
    )
}

export default Chat
