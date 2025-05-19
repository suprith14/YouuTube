import React from 'react'
import { Link } from 'react-router-dom'
import { languageCon } from '../utils/languageConstents'
import { useSelector } from 'react-redux'
import home11 from '../assets/home11.svg'
import shorts11 from '../assets/shorts11.svg'
import subscriptions11 from '../assets/subscriptions11.svg'
import library11 from '../assets/library11.svg'
import history11 from '../assets/history11.svg'
import playlist11 from '../assets/playlist11.svg'
import about11 from '../assets/about11.svg'
import form11 from '../assets/form11.svg'

const MenuDrawer = () => {
    const language11 = useSelector((state) => state.language?.selectedLanguage);
    const drawerobject = [
        { name: languageCon[language11]?.Home, icon: <img src={home11} alt="home" className="w-6 h-6" />, link: '' },
        { name: languageCon[language11]?.Shorts, icon: <img src={shorts11} alt="home" className="w-6 h-6" /> },
        { name: languageCon[language11]?.Subscriptions, icon: <img src={subscriptions11} alt="home" className="w-6 h-6" /> },
        { name: languageCon[language11]?.Library, icon: <img src={library11} alt="home" className="w-6 h-6" /> },
        { name: languageCon[language11]?.History, icon: <img src={history11} alt="home" className="w-6 h-6" /> },
        { name: languageCon[language11]?.YourVideos, icon: <img src={playlist11} alt="home" className="w-6 h-6" /> },
        { name: languageCon[language11]?.About, icon: <img src={about11} alt="home" className="w-6 h-6" />, link: "/about" },
        { name: languageCon[language11]?.form, icon: <img src={form11} alt="home" className="w-6 h-6" />, link: "/applicationform" },
        { name: languageCon[language11]?.viewForm, icon: <img src={form11} alt="home" className="w-6 h-6" />, link: "/viewapplicationform" },
    ]

    return (
        <div className='ml-[0.3rem] shadow-2xl w-52 h-[20%]'>
            {drawerobject.map((item) => {
                return (
                    <Link to={item.link} key={item.name}>
                        <div key={item.name} className='w-full flex items-center pl-2 pr-5 py-1 justify-start my-1 hover:bg-gray-200 cursor-pointer '>
                            <div className='text-2xl'>{item.icon}</div>
                            <div className='ml-4 text-lg '>{item.name}</div>
                        </div>
                    </Link>
                )
            }
            )}
        </div>
    )
}
export default MenuDrawer
