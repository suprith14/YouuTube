import React, { useEffect, useState } from 'react'
import { VEDIOCATEGORIES_API, YOUTUBE_API_URL } from '../utils/constants';
import VedioCard from './VedioCard';
import { useDispatch, useSelector } from 'react-redux';
import { addPopularMovies } from '../store/movieSlice';
import { languageCon } from '../utils/languageConstents';
import { Link } from 'react-router-dom';
import { watchPage } from '../store/userSlice';

const Body = () => {
    const [movieData, setMovieData] = useState([])

    const dispatch = useDispatch();

    const language11 = useSelector((state) => state.language?.selectedLanguage);

    dispatch(watchPage(false));

    const getPopularVedios = async () => {
        const data = await fetch(YOUTUBE_API_URL);
        const json = await data.json();
        dispatch(addPopularMovies(json.items));
        setMovieData(json.items);
    }
    useEffect(() => {
        getPopularVedios()
    }, [])
    const toptab = [languageCon[language11]?.All,
    languageCon[language11]?.Music,
    languageCon[language11]?.Movies,
    languageCon[language11]?.News,
    languageCon[language11]?.Gaming,
    languageCon[language11]?.Live,
    languageCon[language11]?.Trending,
    ]

    const getVedioCategory = async () => {
        const data = await fetch(VEDIOCATEGORIES_API);
        const json = await data.json();
        console.log("VEDIO CATEGORIES : ", json)
    }

    // if (movieData?.length === 0) {
    //     return (
    //         <div className='flex flex-col justify-center items-center'>
    //             <div className='text-2xl font-bold'>Quota as been completed.</div>
    //         </div>
    //     )

    // }

    useEffect(() => {
        getVedioCategory();
    }, [])
    return (<div className='flex flex-col justify-center'>
        <div className='flex flex-row lg:ml-10 overflow-auto  lg:scrollbar-hide'>
            {toptab?.map((tab) => { return (<div key={tab} className='text-center text-[0.5rem] lg:text-sm font-bold mx-1 lg:mx-2 lg:px-10 lg:py-2 px-3 py-2 shadow-md hover:bg-gray-200 cursor-pointer'>{tab}</div>) })}
        </div>
        {!movieData ? <div className='flex justify-center items-center '><div>Youtube Quota has been completed ,change the API key</div></div> :
            <div className='mt-5'>
                <div className='flex flex-wrap w-full lg:flex-row lg:justify-between bg-gray-50 lg:px-3'>
                    {movieData?.map((movie) => {
                        return (
                            <Link to={`watch?id=${movie.id.videoId}`} key={movie.etag}>
                                <VedioCard key={movie.etag} movie={movie} />
                            </Link>
                        )
                    })}
                </div>
            </div>
        }
    </div>
    )
}
export default Body
