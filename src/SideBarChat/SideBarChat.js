import React from 'react'

import './sideBarChat.css';
import { Avatar } from '@material-ui/core';
const SideBarChat = (props) => {
    const { room } = props;
    return (
        <div className="sideBarChat">
            <Avatar src={room.groupImage}/> 
            <div className="sideBarChat__info"> 
                <h2> { room.name } </h2>
                <p> this is the last message</p>
            </div>
        </div>
    )
}

export default SideBarChat
