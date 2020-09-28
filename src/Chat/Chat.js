import React, { useState } from 'react'
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

    const [{activeRoom}] = useDataLayerValue();
    const sendMessage = async (e)=>{
        e.preventDefault();
        await axios.post('/api/messages/new',{
                "message":input,
                "name":"raj",
                "timestamp":"9:30 am",
                "recieved" : "true"
            }
        )
        setInput("");
    }
    console.log('this is the active room ...', activeRoom);
    return (
        <>
        <div className="chat">
            <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo"> 
                    <h3> Room name  </h3>
                    <p> last seen at ..... </p>
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
            <div className="chat__body">
                {
                    messages.map(message=>(
                        <p className={`chat__message ${message.recieved ? 'chat__reciever' : '' }`} key={message._id}>
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
