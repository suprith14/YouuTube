import React from 'react'

const VedioCard = ({ movie }) => {
    const { id, snippet } = movie;
    const url = snippet?.thumbnails?.medium?.url
    const channelTitle = snippet?.channelTitle
    const description = snippet?.description
    const publishTime = snippet?.publishTime
    const title = snippet?.title
    return (
        <div className='w-[22rem] h-[20rem] flex flex-col mt-3 hover:w-[23rem] px-4 lg:px-0 hover: '>
            <img src={url} alt="vedio" className='rounded-lg shadow-2xl' />
            <div className='flex flex-wrap flex-col'>
                <div className='font-bold text-xs pt-1'>{title}</div>
                <div className='font-normal text-sm text-gray-600'>{channelTitle}</div>
                <div className='font-normal text-[0.65rem] leading-none'>{description}</div>
                <div className='font-normal text-[0.6rem] text-gray-900 pt-1'>{publishTime}</div>
            </div>
        </div>
    )
}
export default VedioCard
