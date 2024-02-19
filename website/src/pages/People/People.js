import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { fetchPeople } from '../../redux/slices/people';
import axios from '../../libs/axios'
import useCurrentUser from '../../hooks/useCurrentUser';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import User from './User';
import useCreateGroup from '../../hooks/useCreateGroup';
import PeopleSkeleton from './Skeleton/PeopleSkeleton';
import { MdGroups } from "react-icons/md";

export default function People() {
  const dispatch = useDispatch();
  const { people } = useSelector(state => state.people);
  const currentUser = useCurrentUser();
  const isPeopleLoading = people.status === 'loading';
  const navigate = useNavigate();
  const groupModal = useCreateGroup();
  
  useEffect(() => {
    dispatch(fetchPeople({id: currentUser?._id}));
  },[])

  const onClick = (userId) => {
    axios.post('/conversation', {
        userId: [currentUser._id, userId],
        isGroup: false,
    }).then((res) => {
        navigate(`/conversation/${res.data._id}`)
    }).catch((err) => {
        console.warn(err);
    })
  }

  if(isPeopleLoading){
    return <PeopleSkeleton/>
  }

  return (
    <>
      <h2 className='text-center font-bold py-2 text-3xl'>People</h2>
      <div className='w-full self-end flex justify-end items-center'>
        <button className='mr-[20px]' onClick={() => {
            groupModal.onOpen();
          }}><MdGroups size={30}/></button>
      </div>
      <div className="px-4 bg-white rounded-lg h-full sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {people.items?.map((user, i) => (
                      <User avatarUrl={user?.avatarUrl} onClick={() => {onClick(user._id)}} fullName={user.fullName} email={user.email} key={i}/>
                    )).reverse()}
                </ul>
        </div>
    </>
  )
}
