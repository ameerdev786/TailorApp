// Import FirebaseAuth and firebase.
import React, { useContext, useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import {useHistory}  from "react-router"
import { AppContext } from '../context/app-context';

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false,
    },
};




function Login() {
    const { auth } = useContext(AppContext);
    const history=useHistory();
    // console.log(firebase.auth().currentUser?.providerData[0]?.uid===auth.user.uid)
    // console.log(auth,'///////////////////////')
    const signOut=()=>{
        auth.signOut()
        history.push('/membership')
    }

    if (!auth.isAuth()) {
        return (
            <div className='h-screen flex flex-col justify-center'>
                <div>
                    <div className="text-center w-full space-x-2 -mt-24  h-64">
                        <img src="assets/machine.png" alt="" className="h-16 m-auto" />
                        <div className="text-2xl font-bold text-skin-accent">DarzyApp</div>
                    </div>
                </div>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </div>
        );
    }
    // console.log(firebase.auth().currentUser?.displayName,'////')
    return (
        <div className="flex flex-col h-screen w-full  items-center justify-center">
            <h1 className="text-xl">Welcome! <span className="text-yellow-500  font-bold"> {firebase.auth().currentUser?.displayName} </span></h1>
            <button className="bg-yellow-600 mb-32 mt-2 text-xl text-white w-11/12" onClick={() =>{ signOut()}}>Sign-out</button>
        </div>
    );
}

export default Login;
