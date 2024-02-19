import React from 'react'
import Avatar from '../../components/Avatar'

export default function Messages({clickOnImage, text, me, seen, image, user}) {
  if(me){
    return (
        <div className='flex flex-col self-end justify-center items-end'>
            <div className='self-end px-2 rounded-2xl py-2 bg-blue-300'>
              <h2>{text}</h2>
              <div className={`grid gap-2 grid-row-2 ${image.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                {image.length > 0 && (
                  image?.map((img) => <img onClick={() => clickOnImage(process.env.REACT_APP_API_URL+img)} className='max-w-[100px] aspect-square object-cover' src={`${process.env.REACT_APP_API_URL+img}`} alt=''/>)
                )}
              </div>
            </div>
            {/* <h2 key={i} className='text-gray-700 text-sm'>{user?.fullName}</h2> */}
           <div className='flex mt-1 gap-1'>
            {seen && seen?.map((user, i) => (
                <Avatar active small image={`${process.env.REACT_APP_API_URL+user?.avatarUrl}`} email={user?.email} key={i}/>
              )
            )}
           </div>
        </div>
    )
  }

  return (
    <div className='self-start flex gap-2 justify-center items-center'>
      <Avatar active image={`${process.env.REACT_APP_API_URL+user?.avatarUrl}`} email={user?.email}/>
      <div className='bg-white rounded-2xl p-2'>
        <h2>{text}</h2>
        <div className={`grid gap-2 grid-row-2 ${image.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {image.length > 0 && (
            image?.map((img) => <img onClick={() => clickOnImage(process.env.REACT_APP_API_URL+img)} className='max-w-[100px] aspect-square object-cover' src={`${process.env.REACT_APP_API_URL+img}`} alt=''/>)
          )}
        </div>
      </div>
    </div>
  )
}
