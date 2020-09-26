import React from 'react';
import './Login.css'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { auth, provider  } from '../firebase'

import { useDataLayerValue } from '../stateProvider';

import { actionTypes } from '../reducer';

import axios from '../axios';

const Login = () => {
    const [{}, dispatch ] = useDataLayerValue();
    


    const setUser = ( user ) => { 
        const { username, email, profilePic, _id } = user;
        const userData = { 
            name:username,
            email:email,
            profilePic:profilePic,
            id:_id
        }
        sessionStorage.setItem("user",JSON.stringify(userData))
        dispatch({
            type:actionTypes.SET_USER,
            user:userData
        })
    }
    const registerNewUser = (name, email, profileImage) => {
        const data = { 
            username:name,
            email:email,
            profilePic: profileImage
        } 
        axios.post('/api/registerUser',data).then(res=>{
            if (res.data.user) {
                setUser(res.data.user);
            } else {
                alert('! oops please try again ....');
            }

        })
    }

    const signIn = () => { 
        auth.signInWithPopup(provider).then(res=>{
            let name = res.user.displayName;
            let email = res.user.email;
            let profileImage = res.user.photoURL;
            axios.post('/api/checkuser',{name:name,email:email}).then(res=> {
                if (res.data.success) {
                    if(res.data.user) {
                        setUser(res.data.user); 
                    } else {
                        registerNewUser(name, email, profileImage);
                    }
                } else {
                    alert("Oops something went wrong ...")
                }
            })
        }).catch(err=>{
            console.log('error ===> ', err);    
        })
    }

    return (
        <div className="login">
            <div className="login__container"> 
                <div className="login__header"> 
                    <img src="http://pngimg.com/uploads/whatsapp/whatsapp_PNG20.png" />
                    <div >  WhatsApp Web </div>   
                </div>
                <div className="login__card"> 
                    <AccountCircleIcon />
                    <button onClick={signIn}>
                        <img src="https://image.flaticon.com/icons/png/128/281/281764.png" /> 
                        Sign Up With Google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login;
