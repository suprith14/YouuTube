import React, { useEffect } from 'react'
import Header from '../components/Header'
import MenuDrawer from '../components/MenuDrawer'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

const HomePage = () => {
    const isToggle = useSelector((state) => state.user?.ismenuToggle)
    const iswatchPage = useSelector((state) => state.user?.iswatchPage);

    const isMobile = window.innerWidth <= 768;
    console.log(isMobile ? 'Mobile mode' : 'Desktop mode');
    const navigate = useNavigate()
    const user = useSelector((state) => state.user?.userInfo)
    console.log("HomePage component : user :", user)

    useEffect(() => {

        if (user) {
            navigate("/", { replace: true });
        }
    }
        , [user, navigate])



    return (
        <div className='relative'>
            <Header />
            <div className='flex justify-center'>
                {isToggle &&
                    <div className={` ${iswatchPage || isMobile ? "absolute top-30 left-0 z-10 bg-white" : ""} `}>
                        <MenuDrawer />
                    </div>}
                <div className='w-full lg:w-[95%] lg:ml-10'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default HomePage
