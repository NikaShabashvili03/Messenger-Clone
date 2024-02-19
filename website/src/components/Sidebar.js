import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
import { logout } from '../redux/slices/auth';
import clsx from 'clsx';
import { IoChatbubbles, IoPeople, IoSettings } from "react-icons/io5";
import Avatar from './Avatar';

export default function Sidebar({ children, currentUser }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  return (
    <>
        <nav className="fixed top-0 z-50 flex items-center w-full justify-between bg-white border-b border-gray-200 dark:bg-gray-800 h-[5dvh] dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 w-full lg:pl-3">
                <div className="flex items-center w-full justify-between">
                    <div className="flex items-center justify-center">
                            <a href="/" className="flex md:me-24">
                            <img src={'/logo192.png'} className="h-8 me-3 rounded-full object-cover" alt="Messenger Clone" />
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Messenger Clone</span>
                            </a>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center ms-3">
                            <div>
                                <button onClick={() => {setOpen(!open)}} type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                    <Avatar image={`${process.env.REACT_APP_API_URL+currentUser?.avatarUrl}`} email={currentUser?.email}/>
                                </button>
                            </div>
                            <div className={`z-50 ${open ? 'block' : 'hidden'} my-4 text-base absolute right-[35px] top-[35px] list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}>
                            <div className="px-4 py-3" role="none">
                                <p className="text-sm text-gray-900 dark:text-white" role="none">
                                {currentUser?.fullName}
                                </p>
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                {currentUser?.email}
                                </p>
                            </div>
                            <ul className="py-1" role="none">
                                <button onClick={() => {
                                    dispatch(logout());
                                    window.localStorage.removeItem('token');
                                }} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">
                                    Sign out
                                </button>
                            </ul>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside className="fixed md:top-0 md:left-0 border-t md:border-t-0 z-40 bottom-0 md:w-64 h-[10dvh] w-full md:h-[100dvh] md:pt-20  border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <div className='flex w-full h-full gap-2 justify-center md:justify-start md:flex-col items-center'>
                        <Link to={'/'} className={
                            clsx(`flex md:justify-start h-full md:h-auto justify-center w-full items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`,
                                  (pathname === `/conversation/${pathname.replaceAll('/conversation/', '')}` || pathname === '/') && 'bg-gray-100'
                            )}> 
                            <IoChatbubbles size={25}/>
                            <span className="ms-3">Chat</span>
                        </Link>
                        <Link to={'/people'} className={
                            clsx(`flex md:justify-start h-full md:h-auto justify-center w-full items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`,
                                  pathname === '/people' && 'bg-gray-100'
                            )}> 
                            <IoPeople size={25}/>
                            <span className="ms-3">People</span>
                        </Link>
                    </div>
            </aside>

            <div className="p-0 h-[85dvh] md:h-[95dvh] md:ml-64">
                <div className="border-gray-200 rounded-lg dark:border-gray-700 mt-[5dvh]">
                    {children}
                </div>
            </div>
    </>
  )
}
