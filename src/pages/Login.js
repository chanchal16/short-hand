import React from 'react'
import firebase from 'firebase'
import 'firebase/auth'
import {firebaseApp} from '../config'
import './Login.css'




 function Login({email,setEmail,password,setPassword,handleLogin,handleSignUp,hasAccount,setHasAccount,
emailError,passwordError}) {
   

    return (
        <div className='login'>
            <div className='loginContainer'>
                <div className='testcred'>
                    <small>Test credentials:</small>
                    <small>email:test@test.com</small>
                    <small>password:test123</small>
                </div>
                <label>Email</label>
                <input type='email' required autoFocus value={email} placeholder='john@gmail.com'
                onChange={(e) => setEmail(e.target.value)} />
                <p className='errorMsg'>{emailError}</p>


                <label>Password</label>
                <input type='password' required value={password} onChange={(e)=>setPassword(e.target.value)} />
                <p className='errorMsg'>{passwordError}</p>

                <div className='btnContainer'>
                    {hasAccount?(
                        <>
                            <button className='lbtn' onClick={handleLogin}><b>Sign In</b></button>
                            <p>Don't have an account? 
                            <span onClick={()=>setHasAccount(!hasAccount)}>Sign Up</span></p> {/*switch bet login& signup*/}
                        </>

                    ): (
                        <>
                            <button className='lbtn' onClick={handleSignUp}><b>Sign Up</b></button>
                            <p>Already have an account? <span onClick={()=>setHasAccount(!hasAccount)}>Sign In</span></p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export {Login};
