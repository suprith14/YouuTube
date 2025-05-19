import React, { useEffect, useState } from 'react'
import menu from '../assets/menu.png'
import logo from '../assets/youtube_logo1.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { menuToggle, userInfo } from '../store/userSlice'
import { languageSelect } from '../utils/languageConstents'
import { addSelectedLanguage } from '../store/languageSlice'
import { YOUTUBE_API_KEY } from '../utils/constants'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import userPhoto from '../assets/user11.svg'
import menu11 from '../assets/menu11.svg'
import search11 from '../assets/search11.svg'
import logout11 from '../assets/logout11.svg'
import { languageCon } from '../utils/languageConstents'
import LoginPopup from './LoginPopup'
const Header = () => {
    const [searchSugestion, setSearchSuggestion] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [searchSuggestionData, setSearchSuggestionData] = useState([])
    const [loginPopup, setLoginPopup] = useState(false)

    const handleLoginPopup = () => {
        console.log("handleLoginPopup Toggles")
        setLoginPopup(!loginPopup)
    }


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector((state) => state.user.userInfo)
    const language11 = useSelector((state) => state.language?.selectedLanguage);
    useEffect(() => {
        if (!user) {
            navigate("/login")
        }


    }, [])



    const handleToggle = () => {
        dispatch(menuToggle())
    }
    const handelLanguageChange = (e) => {
        dispatch((addSelectedLanguage(e.target.value)))
    }
    const handleInputChange = (e) => {
        setInputValue(e.target.value)
        if (e.target.value.length > 0) {
            setSearchSuggestion(true)
        } else {
            setSearchSuggestion(false)
        }
    }
    const getsuggestion = async () => {
        const data = await fetch(`https://suggestqueries.google.com/complete/search?client=chrome&q=${inputValue}`)
        // const data = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${inputValue}&key=${YOUTUBE_API_KEY}`)
        const json = await data.json();
        setSearchSuggestionData(json[1])
    }
    useEffect(() => {
        try {
            if (inputValue) {
                getsuggestion()
            }
        }
        catch (error) {
        }
    }, [inputValue])

    const handlesearchInput = (item) => {
        setInputValue(item)
    }

    const Signout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("signout successfull")
            dispatch(userInfo(null))
            localStorage.removeItem("userLocal")
            alert("Signout Successfull");
            navigate("/login")
        }).catch((error) => {
            // An error happened.
        });

    }
    // var userProfile = "https://lh3.googleusercontent.com/a/ACg8ocJYiNevB_-86oHLtsr-eV_fNTh2QsMnTTQeh1T9PJkWSM8_GSc3=s96-c"
    // setTimeout(() => {
    //     var userProfile = user?.photoURL || "https://via.placeholder.com/150"

    // }, 3000)

    return (
        <div className=' mx-2 pt-2 md:mr-6 lg:mx-2 lg:mr-4 flex items-center justify-between'>
            <div className='flex items-center justify-between'>
                <div onClick={handleToggle} className='pr-1 lg:px-3 lg:py-2 cursor-pointer hover:bg-slate-100'>
                    <img src={menu11} alt="menu" className='lg:w-16 lg:h-12' />

                </div>
                <div className='w-20 lg:w-52 lg:pl-3 lg:py-2 cursor-pointer hover:bg-slate-100'>
                    <img src={logo} alt="logo" className='w-64 h-18' />
                </div>
            </div>
            <div className='w-full lg:ml-10'>
                <div className='w-full flex flex-row justify-center'>
                    <input type='text' placeholder={languageCon[language11]?.Search} onChange={handleInputChange} value={inputValue} className=' w-[80%] shadow px-3 py-2 lg:px-6 lg:py-3 rounded-l-full' />
                    <button className='rounded-r-full shadow px-1 lg:py-3 lg:px-6 hover:bg-gray-300'><img src={search11} alt='seacrh ' /> </button>
                </div>
                {searchSugestion &&
                    <div className='absolute bg-white px-3 py-2 rounded-lg  w-[54%] '>
                        {searchSuggestionData?.map((item) =>
                            <div key={item} className='hover:bg-gray-100 mb-1 px-1 cursor-pointer' onClick={() => handlesearchInput(item)}>{item}
                            </div>
                        )}

                    </div>}
            </div>
            <div>
                {user &&
                    <select className='text-[0.5rem] lg:text-lg lg:w-24 h-10 rounded lg:rounded-full shadow lg:px-2 lg:py-2 hover:bg-slate-200 cursor-pointer' onClick={handelLanguageChange}>
                        {languageSelect.map((item) => {
                            return (<option key={item.id} value={item.id}>{item.name}</option>)
                        }
                        )}
                    </select>
                }

            </div>
            <div className='lg:ml-3'>
                {user &&
                    <div className=' flex text-sm lg:text-lg lg:flex-wrap lg:w-40 py-2 items-center'>
                        <div>
                            <img src={userPhoto} alt="user" className='w-0 lg:w-10 h-10 rounded-full hover:bg-slate-300 lg:m-1 lg:p-1' />
                        </div>
                        <div className='text-[0.5rem] lg:text-lg px-1 lg:px-2'>{user?.displayName}</div>
                    </div>}
            </div>
            {user ?
                <div onClick={Signout} className='flex shadow text-[0.5rem] lg:text-lg p-1 lg:pl-3 lg:pr-9 lg:py-2 hover:bg-slate-300 cursor-pointer'>{user ? <div className='flex'>{languageCon[language11]?.Logout} <img src={logout11} className='w-0 lg:w-10' /></div> : "login1"}</div>
                :
                <div onClick={() => handleLoginPopup()} className='flex shadow p-1 lg:pl-3 lg:pr-9 lg:py-2 hover:bg-slate-300 cursor-pointer'>{user ? <div className='flex'>{languageCon[language11]?.Logout} <img src={logout11} /></div> : "login"}</div>
            }
            {loginPopup && <LoginPopup click={() => { handleLoginPopup() }} />}



        </div>

    )
}

export default Header
