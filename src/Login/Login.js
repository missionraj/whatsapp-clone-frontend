import React from 'react';
import './Login.css'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { auth, provider  } from '../firebase'

import { useDataLayerValue } from '../stateProvider';
import { actionTypes } from '../reducer';
const Login = () => {
    const [{}, dispatch ] = useDataLayerValue();
    const signIn = () => { 
        auth.signInWithPopup(provider).then(res=>{
            dispatch({
                type:actionTypes.SET_USER,
                user:res.user
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
