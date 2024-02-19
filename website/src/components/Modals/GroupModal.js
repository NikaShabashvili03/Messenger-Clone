import React from 'react'
import useCreateGroup from '../../hooks/useCreateGroup'
import { IoExitOutline } from "react-icons/io5";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchPeople } from '../../redux/slices/people';
import useCurrentUser from '../../hooks/useCurrentUser';
import { useEffect } from 'react';
import axios from '../../libs/axios';
import { useNavigate } from 'react-router-dom';

export default function GroupModal() {
  const { isOpen, onOpen, onClose} = useCreateGroup();

  const dispatch = useDispatch();
    const { people } = useSelector(state => state.people);
    const currentUser = useCurrentUser();
    const [users, setUsers] = useState([currentUser?._id]);
    const [name, setName] = useState('');
    const isPeopleLoading = people.status === 'loading';
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchPeople({id: currentUser?._id}));
    },[])

  const onSubmit = () => {
    if(users.length < 3 || !name){
        alert('Please set 3 more or Please set name');
        return;
    }

    axios.post('/conversation', {
        userId: users,
        name: name,
        isGroup: true,
    }).then((res) => {
        onClose();
        setUsers([currentUser?._id]);
        navigate(`/conversation/${res.data._id}`)
    }).catch((err) => {
        console.warn(err);
    })
  }

  if(isPeopleLoading){
    return (
        <div className={`${isOpen ? 'flex' : 'hidden'} w-full top-0 justify-center items-center h-full absolute bg-gray-600/70 z-[100]`}>
            <div className='w-[90%] sm:w-[70%] shadow-2xl rounded-2xl xl:w-[50%] 2xl:w-[40%] h-[50%] bg-white'>
                Loading
            </div>
        </div>
    )
  }

  return (
    <div className={`${isOpen ? 'flex' : 'hidden'} w-full top-0 justify-center items-center h-full absolute bg-gray-600/70 z-[100]`}>
        <div className='w-[90%] sm:w-[70%] shadow-2xl rounded-2xl xl:w-[50%] 2xl:w-[40%] h-[50%] bg-white'>
            <div className='w-full relative flex justify-center border-b items-center h-[15%]'>
                <h2 className='text-xl'>Create Group</h2>
                <button className='absolute right-2' onClick={() => onClose()}><IoExitOutline size={25}/></button>
            </div>
            <div className='h-[8%] border-b border-t border-gray-400 w-full'>
                <input className='w-full h-full px-2' placeholder='Group Name' value={name} onChange={(e) => {setName(e.target.value)}}/>
            </div>
            <div className='h-[70%] max-h-[70%] flex flex-col gap-1 w-full overflow-y-auto'>
                {people.items.map((user, i) => 
                    <label key={i} className='flex gap-5 px-5 py-5 bg-gray-100 hover:bg-gray-200 cursor-pointer justify-between items-center'>
                        <h2>{user.fullName}</h2>
                        <input key={i} type="checkbox" value={user._id} onChange={(e) => {
                            if(!e.target.checked){
                                setUsers((prev) => prev.filter((id) => id != e.target.value))
                            }else{
                                setUsers((prev) => [...prev, e.target.value])
                            }
                        }}/>
                    </label>
                )}
            </div>
            <button onClick={() => {onSubmit()}} className='h-[10%] w-full flex justify-center hover:bg-blue-600 cursor-pointer items-center bg-blue-500 disabled:bg-blue-400 rounded-b-xl'>
                <h2 className='text-base text-white'>Submit</h2>
            </button>
        </div>
    </div>
  )
}
