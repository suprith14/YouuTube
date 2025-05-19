import React, { useState } from 'react'
import bg from '../assets/loginBackgroungImg.jpg'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userInfo } from '../store/userSlice';
import { auth } from '../utils/firebase';
import Header from '../components/Header';

const Login = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const SignIn = () => {
        console.log("1")
        // const auth = getAuth();

        console.log("2", auth)
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
                setUser(user);
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
    return (
        <div className='relative flex flex-col items-center justify-center w-full h-screen'>
            <div className='absolute top-0 w-full'>
                <Header />
            </div>

            <img src={bg} alt="login" className=' w-full h-full object-cover' />

            {/* <div className='absolute z-10 w-[40%] bg-white rounded-lg shadow-lg flex flex-col items-center p-6'>
                <button onClick={SignIn} className='text-3xl font-bold mb-4'>Sign with Goolge</button>
                <div className='flex flex-col gap-4'>
                    <input type="text" placeholder='Username' className='w-80 h-10 px-2 py-2 rounded-lg shadow-lg' />
                    <input type="password" placeholder='Password' className='w-80 h-10 px-2 py-2 rounded-lg shadow-lg' />
                </div>
            </div> */}
        </div>
    )
}

export default Login
