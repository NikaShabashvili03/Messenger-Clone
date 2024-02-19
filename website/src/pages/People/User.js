import React from 'react'
import Avatar from '../../components/Avatar'

export default function User({email, fullName, onClick, avatarUrl}) {
  return (
    <li onClick={onClick} className="py-3 cursor-pointer px-5 hover:bg-gray-200 sm:py-4">
        <div className="flex items-center space-x-4">
            <Avatar image={`${process.env.REACT_APP_API_URL+avatarUrl}`} email={email}/>
            <div className="flex-1 min-w-0">
                <p className={`text-sm text-gray-900 truncate dark:text-white`}>
                  {fullName}
                </p>
            </div>
        </div>
    </li>
  )
}
