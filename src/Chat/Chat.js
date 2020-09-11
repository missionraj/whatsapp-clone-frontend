import React from 'react'
import './Chat.css'
import { IconButton ,Avatar } from '@material-ui/core'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MicIcon from '@material-ui/icons/Mic';
const Chat = () => {
    return (
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
                <p className="chat__message">
                    <span className="chat__name"> Raj </span>
                    this is message
                    <span className="chat__timeStamp"> 
                        { new Date().toUTCString() }
                    </span>
                </p>
                <p className="chat__message chat__reciever">
                    <span className="chat__name"> Raj </span>
                    this is message
                    <span className="chat__timeStamp"> 
                        { new Date().toUTCString() }
                    </span>
                </p>
                <p className="chat__message">
                    <span className="chat__name"> Raj </span>
                    this is message
                    <span className="chat__timeStamp"> 
                        { new Date().toUTCString() }
                    </span>
                </p> 
                <p className="chat__message">
                    <span className="chat__name"> Raj </span>
                    this is message
                    <span className="chat__timeStamp"> 
                        { new Date().toUTCString() }
                    </span>
                </p> 
                <p className="chat__message">
                    <span className="chat__name"> Raj </span>
                    this is message
                    <span className="chat__timeStamp"> 
                        { new Date().toUTCString() }
                    </span>
                </p> 
                <p className="chat__message">
                    <span className="chat__name"> Raj </span>
                    this is message
                    <span className="chat__timeStamp"> 
                        { new Date().toUTCString() }
                    </span>
                </p> 
                <p className="chat__message">
                    <span className="chat__name"> Raj </span>
                    this is message
                    <span className="chat__timeStamp"> 
                        { new Date().toUTCString() }
                    </span>
                </p> 
                <p className="chat__message">
                    <span className="chat__name"> Raj </span>
                    this is message
                    <span className="chat__timeStamp"> 
                        { new Date().toUTCString() }
                    </span>
                </p> 
                <p className="chat__message">
                    <span className="chat__name"> Raj </span>
                    this is message
                    <span className="chat__timeStamp"> 
                        { new Date().toUTCString() }
                    </span>
                </p> 
                <p className="chat__message">
                    <span className="chat__name"> Raj </span>
                    this is message
                    <span className="chat__timeStamp"> 
                        { new Date().toUTCString() }
                    </span>
                </p> 
                <p className="chat__message">
                    <span className="chat__name"> Raj </span>
                    this is message
                    <span className="chat__timeStamp"> 
                        { new Date().toUTCString() }
                    </span>
                </p> 
                <p className="chat__message">
                    <span className="chat__name"> Raj </span>
                    this is message
                    <span className="chat__timeStamp"> 
                        { new Date().toUTCString() }
                    </span>
                </p> 
                <p className="chat__message">
                    <span className="chat__name"> Raj </span>
                    this is message
                    <span className="chat__timeStamp"> 
                        { new Date().toUTCString() }
                    </span>
                </p> 
                <p className="chat__message">
                    <span className="chat__name"> Raj </span>
                    this is message
                    <span className="chat__timeStamp"> 
                        { new Date().toUTCString() }
                    </span>
                </p> 
                <p className="chat__message">
                    <span className="chat__name"> Raj </span>
                    this is message
                    <span className="chat__timeStamp"> 
                        { new Date().toUTCString() }
                    </span>
                </p> 
                
            </div> 
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <AttachFileIcon />
                <form>
                    <input type="text" placeholder="send a message"/>
                    <button type="submit"> </button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
