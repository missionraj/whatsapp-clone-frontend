import React, { useRef, useState, useEffect } from 'react'
import './SideBar.css'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton, Avatar } from '@material-ui/core';
import SideBarChat from '../SideBarChat/SideBarChat';

import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

import Popover from '@material-ui/core/Popover';
import { withStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import TextField from '@material-ui/core/TextField';
import firebaseApp from '../firebase';

import { useDataLayerValue } from '../stateProvider';
import { actionTypes } from '../reducer';
import axios from '../axios';

// The `withStyles()` higher-order component is injecting a `classes`
// prop that is used by the `Button` component.
const StyledPopover = withStyles({
    paper: {
        boxShadow:'0px 5px 5px -3px rgba(170, 170, 170, 0.2),0px 5px 5px 1px rgba(198, 197, 197, 0.14),0px 3px 14px 2px rgba(189, 189, 189, 0.12)',
        padding:'10px 0' 
    }
})(Popover);

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'black',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#00bfa5',
      },
    },
  })(TextField);

const Sidebar = () => {
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const creatGroupNav = useRef();
    const fileUpload = useRef(null);
    const [groupImage,setGroupImage] = useState({
            backgroundImage: 'url(https://www.iconfinder.com/data/icons/user-outline-icons-set/144/User_Group-512.png)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover'
    });
    const [ groupImageUrl, setGroupImageUrl ] = useState('');
    const [ groupName, setGroupName ] = useState('');
    const [ { user }, dispatch] = useDataLayerValue();
    const [ chatRooms, setChatRooms ] = useState([]);
    const [ openSnackBar, setOpenSnackBar ] = useState(false);
    

    const handleClickSnackBar = () => {
        setOpenSnackBar(true);
    };

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpenSnackBar(false);
    };


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const navigationGroupCreator = () => {
        creatGroupNav.current.style.marginLeft = 0;
        handleClose();
    }

    const closeNavigationGroupCreator = () => {
        creatGroupNav.current.style.marginLeft = '-100%';
    }
    
    const openFileUploader = () => {
        fileUpload.current.click();
    }

    const handleFileUpload = (e) => {
        // handle if the user closes down the window without selecting file 

        // get the file
        let file = e.target.files[0];

        // create the storage ref 
        let storageRef = firebaseApp.storage().ref('whatsapp_group_icon/'+file.name);

        // upload file
        let task  = storageRef.put(file)
        
        // upload progress
        task.on('state_changed',
                function (params) {
                    
                },
                function (error) {
                    
                },
                function (){
                    task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        // console.log('File available at', downloadURL);
                        setGroupImageUrl(downloadURL);
                        setGroupImage({
                            ...groupImage,
                            backgroundImage: `url(${downloadURL})`
                        })
                    });
                }
        )
    }
    const setRoomId = (room) => {
        dispatch({
            type:actionTypes.SET_ACTIVE_ROOM,
            roomId:room._id
        })
    }
    const getRooms = () => { 
        axios.get('/api/getRooms').then(res=> { 
            if (res.data.success) {
                setChatRooms(res.data.rooms);
                setRoomId(res.data.rooms[0]);
            }
        })
    }
    const handleGroupName = (e)=> { 
        // console.log('this is called when event target ....',e.target.value);
        setGroupName(e.target.value);
    }

    const createGroup = () => { 
        const data = { 
            "name":groupName,
            "groupImage": groupImageUrl,
            "created_by": user.id
        }
        axios.post('/api/newgroup',data).then(res => {
            console.log('response of the new group', res);
            if (res.data.success) {
                closeNavigationGroupCreator();
                getRooms();
            } else { 
                handleClickSnackBar();
            }
        })

    }

    useEffect(()=>{
        getRooms();
    },[])
    return (
        <div className="sidebar">
            <div className="sidebar__header"> 
                <Avatar src={user.profilePic} />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton onClick={e=>handleClick(e)}>
                        <MoreVertIcon />
                    </IconButton>
                    <StyledPopover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                       <div className="sidebar__headerRightOptions" onClick={navigationGroupCreator} > create a group </div>
                       <div className="sidebar__headerRightOptions"> Logout </div>
                    </StyledPopover>
                </div>
            </div>
            <div className="sidebar__search"> 
                <div className="sidebar__searchContainer"> 
                    <SearchIcon />
                    <input type="text" placeholder="search or start chat" />   
                </div>
            </div>
            <div className="sidebar__chats">
                {
                    chatRooms.map(el => (<SideBarChat key={el._id} room={el} />))
                }
            </div>
            <div className="sidebar__navigation" ref={creatGroupNav} >
                <div className="sidebar__navigationHeader"> 
                    <div className="sidebar__navigationHeaderTitle"> 
                        <ArrowBackIcon  onClick={closeNavigationGroupCreator} />
                        <p> Add new group </p>
                    </div> 
                </div>
                <div className="sidebar__navigationHeaderIconWrapper">
                    <div className="sidebar__navigationHeaderImageWrapper" style={groupImage} onClick={openFileUploader} >
                        <AddAPhotoIcon />
                        <div> 
                            ADD GROUP ICON
                        </div>
                    </div>
                    <input type="file"  style={{display:'none'}} ref={fileUpload}  onChange={(e)=> handleFileUpload(e)}/>
                </div> 
                <div className="sidebar__navigationInputWrapper" >
                    <CssTextField  label="Group Subject" fullWidth={true}  onChange={(e)=>{handleGroupName(e)}} />
                </div>
                <div className="sidebar__navigationCreateGroupWrapper">
                    {
                        groupName.length > 0 ? (
                            <img src="https://freeiconshop.com/wp-content/uploads/edd/checkmark-flat.png" height="50" width="50" onClick={createGroup}/>
                        ) : null
                    }
                </div> 
            </div>
            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                open={openSnackBar}
                autoHideDuration={6000}
                onClose={handleCloseSnackBar}
                message="Oops something went wrong !!!"
                action={
                <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackBar}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
                }
            />
        </div>
    )
}

export default Sidebar
