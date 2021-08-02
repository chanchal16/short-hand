import React,{useState,useEffect} from 'react'
import {Login} from './Login'
import { Redirect as RedirectComp } from "react-router-dom";
import { firebaseApp,_auth } from '../config';



export default function Auth({user,setUser}) {
    
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [emailError,setEmailError] = useState('');
    const [passwordError,setPasswordError] = useState('');
    const[hasAccount,setHasAccount] = useState(false);

    const clearInputs = ()=>{
        setEmail('');
        setPassword('');
    }

    const clearErrors=() =>{
        setEmailError('');
        setPasswordError('');
    }


    const handleLogin = ()=>{
        clearErrors();
        firebaseApp
        .auth()
        .signInWithEmailAndPassword(email,password)
        .catch((err)=>{
            switch(err.code){
                case "auth/invalid-email":
                case "auth/user-disabled":
                case "auth/user-not-found":
                    setEmailError(err.message);
                    break;
                case "auth/wrong-password":
                    setPasswordError(err.message);
                    break;
            }
        })
    }

    const handleSignUp = ()=>{
        clearErrors();
        firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email,password)
        .catch((err)=>{
            switch(err.code){
                case "auth/invalid-email":
                case "auth/email-already-in-use":
                    setEmailError(err.message);
                    break;
                case "auth/weak-password":
                    setPasswordError(err.message);
                    break;
            }
        })
    }

   

   
    //listener to check if user exists
   const authListener = ()=>{
        firebaseApp.auth().onAuthStateChanged((user)=>{
            if(user){
                clearInputs();
                setUser(user);
            }else{
                setUser('');
            }
        })
    }

    useEffect(() => {
        authListener();
    }, [])

    
    return (
        <div>
            {user && <RedirectComp to="/dashboard" />}  
            <Login 
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            handleSignUp={handleSignUp}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            emailError={emailError}
            passwordError={passwordError}
            />
            
        </div>
    )
}
