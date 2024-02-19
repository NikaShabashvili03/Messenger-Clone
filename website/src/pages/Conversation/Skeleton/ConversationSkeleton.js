import React from 'react'

export default function ConversationSkeleton() {
  return (
    <div className='h-[85dvh] md:h-[95dvh]'>
    {/* Header */}
        <div className='w-full h-[5%] flex px-2 justify-start items-center'>
            <img src='' alt='' className='ml-2 w-[36px] h-[36px] animate-pulse rounded-full bg-gray-400'/>
            <div className='flex flex-col gap-2 justify-center items-start'>
                <div className='w-[50px] animate-pulse h-[2px] ml-1 bg-gray-400'></div>
                <div className='w-[80px] animate-pulse h-[2px] ml-1 bg-gray-400'></div>
            </div>
        </div>
        {/* Messages */}
        <div className='w-full  px-4 max-h-[90%] min-h-[90%] h-[90%] bg-gray-200'></div>
        {/* Form */}
        <form className='w-full  flex justify-between px-4 items-center h-[5%]'>
            <input disabled={true} type='text' className='h-[90%] animate-pulse  border-gray-300 border-2 border-r-0 px-5 rounded-l-full w-full'/>
            <input disabled={true} type='submit' className='px-5 animate-pulse border-gray-300 cursor-pointer text-gray-400 border-2 font-normal hover:font-bold border-l-0 rounded-r-full h-[90%]'/>
        </form>
    </div>
  )
}
