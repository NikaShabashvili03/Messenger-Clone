import React from 'react'
import useActive from '../hooks/useAcive';
import clsx from 'clsx'
export default function GroupAvatar({ users, small }) {
  const slicedUsers = users?.slice(0, 3);

  const isActive = useActive({
    isGroup: true,
    email: users
  })

  console.log(users)

  return (
    <div className={
            clsx('w-8 relative h-8 rounded-full bg-black', 
            small && 'w-[30px] h-[30px]'
        )}>
        <div className='relative w-full h-full'>
            <div className={
                clsx('w-3 bg-blue-300 rounded-full absolute left-[50%] translate-x-[-50%] translate-y-[-15%] top-[15%] h-3', 
                small && 'w-[11px] h-[11px]'
                )
            }>
                <img className='w-full object-cover h-full rounded-full' src={process.env.REACT_APP_API_URL+slicedUsers[0]?.avatarUrl} alt=''/>
            </div>
            <div className={
                clsx('w-3 bg-purple-300 rounded-full translate-y-[-15%] bottom-[12%] translate-x-[25%] right-[20%] absolute h-3', 
                    small && 'w-[11px] h-[11px]'
                )
            }>
                <img className='w-full object-cover h-full rounded-full' src={process.env.REACT_APP_API_URL+slicedUsers[1]?.avatarUrl} alt=''/>
            </div>
            <div className={
                clsx('w-3 bg-purple-300 rounded-full translate-y-[-15%] bottom-[12%] translate-x-[-25%] left-[20%] absolute h-3', 
                    small && 'w-[11px] h-[11px]'
                )
            }>
                <img className='w-full object-cover h-full rounded-full' src={process.env.REACT_APP_API_URL+slicedUsers[2]?.avatarUrl} alt=''/>
            </div>
        </div>
        {isActive && <span className={
            clsx('w-[10px] absolute bottom-0 right-0 rounded-full z-50 h-[10px] bg-green-500', 
                small && 'w-[10px] h-[10px]'
            )
        }/>}
    </div>
  )
}
