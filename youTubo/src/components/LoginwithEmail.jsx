import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userInfo } from '../store/userSlice';
import { toggleSignInnn } from '../store/userSlice';

const LoginwithEmail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleSignIn = useSelector((state) => state.user?.toggleloginIn)
    console.log("toggleSignIn", toggleSignIn)

    const [user, setUser] = useState({
        email: "",
        password: "",
        firstName: "", // Add firstName
        lastName: ""
    })

    const emailLogin = async (e) => {
        e.preventDefault()

        console.log("getuser called " + user.email, +" " + user.password)
        try {
            const queryParams = new URLSearchParams({
                email: user.email,
                password: user.password,
            }).toString(); // Convert user object to query string
            console.log("queryParams", queryParams)

            //const response = await fetch(`http://localhost:3000/login?${queryParams}`, {
            const response = await fetch(`http://backend-container:4444/login?${queryParams}`, {
                method: "GET",
            })
            const data = await response.json()
            console.log("data", data.user)
            if (data.status === 200) {
                dispatch(userInfo(user))
                localStorage.setItem("userLocal", JSON.stringify(user))
                alert("Login Successfull ", JSON.stringify(user))
                //localStorage.setItem("userLo  cal", JSON.stringify(data.user))
                navigate("/", { replace: true })
            } else {
                console.log("data....", data)
                alert("Login Failed 11sdfs1 " + data)
            }
        } catch (error) {
            console.log("error", error)
            alert("server not   running")
        }
    }

    const handleChange = (e) => {
        console.log("e.target", user)
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const handleToggle = () => {
        dispatch(toggleSignInnn())
    };


    const EmailSignUp = async (e) => {
        e.preventDefault()
        try {
            const queryParams = {
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName
            }; // Convert user object to query string
            console.log("queryParams", queryParams)

            //const response = await fetch("http://localhost:3000/signup", {
            const response = await fetch("http://backend-container:4444/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(queryParams),
            })
            const data = await response.json()
            console.log("data", data)
            if (data.status === 200) {
                dispatch(userInfo(user))
                localStorage.setItem("userLocal", JSON.stringify(user))
                alert("Signup Successfull")
                //localStorage.setItem("userLocal", JSON.stringify(data.user))
                navigate("/", { replace: true })
            } else {
                alert("Signup Failed 111")
            }
        } catch (error) {
            console.log("error", error)
            alert("Server not running")
        }


    }







    return (
        <div className='flex flex-col h-screen justify-center items-center'>
            <form className='w-[40%] gap-y-2 '>
                {toggleSignIn && <>

                    <input onChange={handleChange} name='firstName' type="text" placeholder='first Name' className='w-full mb-2 h-10 border-2 border-black rounded-md p-2' />
                    <input onChange={handleChange} name='lastName' type="text" placeholder='Last Name' className='w-full mb-2 h-10 border-2 border-black rounded-md p-2' />
                </>
                }

                <input onChange={handleChange} name='email' type="text" placeholder='Email' className='w-full mb-2 h-10 border-2 border-black rounded-md p-2' />
                <input onChange={handleChange} name='password' type="password" placeholder='password' className='w-full h-10 border-2 border-black rounded-md p-2' />

            </form>
            {
                toggleSignIn ? (<button onClick={EmailSignUp} className='w-[40%] font-bold h-10 bg-black text-white border rounded-md mt-2 hover:bg-yellow-100 hover:text-black'>Signup</button>)
                    : (<button onClick={emailLogin} className='w-[40%] font-bold h-10 bg-black text-white border rounded-md mt-2 hover:bg-yellow-100 hover:text-black'>Login</button>)
            }
            <button onClick={handleToggle} className='w-[40%] hover:text-blue-500 mt-5'>{toggleSignIn ? "alreadt user ? login here" : "Click here to SignUp"}</button>

        </div>)
}

export default LoginwithEmail
