import React from 'react'
import './SideBar.css'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton, Avatar } from '@material-ui/core';
import SideBarChat from '../SideBarChat/SideBarChat';
const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar__header"> 
                <Avatar src="https://celebhungry.com/wp-content/uploads/2019/12/Screenshot_2019-12-25-MOMOLAND-NANCY-on-Instagram-%E2%80%9C%F0%9F%92%AB-HQ-180713-%EB%AE%A4%EC%A7%81%EB%B1%85%ED%81%AC-%ED%87%B4%EA%B7%BC-_%C2%A9-AtMoonRiver-%EB%82%B8%EC%8B%9C-NANCY-MOMOLAND-%EB%AA%A8%EB%AA%A8%EB%9E%9C%EB%93%9C%E2%80%9D1.png" />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search"> 
                <div className="sidebar__searchContainer"> 
                    <SearchIcon />
                    <input type="text" placeholder="search or start chat" />   
                </div>
            </div>
            <div className="sidebar__chats">
                <SideBarChat />
                <SideBarChat />
                <SideBarChat />
            </div>
        </div>
    )
}

export default Sidebar
