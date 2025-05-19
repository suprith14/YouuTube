import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { hideMenu, watchPage } from '../store/userSlice';

const Watch = () => {
    const [id] = useSearchParams();
    const idd = id.get("id")
    const dispatch = useDispatch();
    dispatch(watchPage(true));
    if (!idd) {
        return <div>Invalid ID</div>
    }
    useEffect(() => {
        dispatch(hideMenu(false));
    }, [])
    return (
        <div className='lg:grid lg:grid-flow-col '>
            <div className='lg:grid-rows-8 lg:mr-4 flex justify-center'>
                <iframe
                    className='w-[22rem] h-[14rem] lg:w-[50rem] lg:h-[30rem]'
                    // src="https://www.youtube.com/embed/QmfyWw3Cth8?si=vEfkFRdJXOarpRcd"
                    src={`https://www.youtube.com/embed/${idd}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen>
                </iframe>
            </div>
            <div className='grid-rows-2 w-[20rem]'>

                km

            </div>
        </div>
    )
}
export default Watch
