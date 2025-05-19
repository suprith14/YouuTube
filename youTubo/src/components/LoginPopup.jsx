import React, { useEffect } from 'react';
import { languageCon } from '../utils/languageConstents';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { userInfo } from '../store/userSlice';

const LoginPopup = ({ click }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log("LoginPopup Component")
    const SignIn = () => {
        console.log("LoginPopup Component -> Clicked SignIn")

        const provider = new GoogleAuthProvider();
        // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        // provider.setCustomParameters({ 'login_hint': '
        console.log("clicked SignIn")
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                //setUser(user);
                dispatch(userInfo(user))
                localStorage.setItem("userLocal", JSON.stringify(user))
                console.log("user ", user)
                alert("Login Successfull")
                // navigate("/")
                navigate("/", { replace: true })
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log("error login", errorCode, errorMessage, email, credential)
                // ...
            });
    }

    const handlewithEmail = () => {
        console.log("LoginPopup Component -> Clicked SignIn with Email")
        navigate("/loginwithEmail")
        click()
    }


    return (
        <div className="absolute top-[100%] left-[50%] w-[50%] lg:top-[80%] lg:left-[79%] lg:w-[20%] pb-5 bg-black/10 flex flex-col items-center justify-center z-10">
            <div className="w-full flex justify-end cursor-pointer ">
                <div onClick={click} className='w-9 bg-white text-center'>X</div>
            </div>
            <div className=' flex flex-col gap-2'>
                <div onClick={SignIn} className="bg-white w-full px-2 lg:px-9 h-[20%] rounded-lg shadow-lg flex flex-col items-center justify-center hover:bg-gray-100">
                    Sign with Google
                </div>
                <div onClick={handlewithEmail} className="bg-white w-full px-2 lg:px-9 h-[20%] rounded-lg shadow-lg flex flex-col items-center justify-center">
                    Sign with Email
                </div>

            </div>
        </div>
    );
};

export default LoginPopup;
