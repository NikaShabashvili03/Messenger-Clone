import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/auth';
import useCurrentUser from '../../hooks/useCurrentUser';
import axios from '../../libs/axios';
import Chat from './Chat';
import { pusher } from '../../libs/pusher';
import useCreateGroup from '../../hooks/useCreateGroup';
import ChatSkeleton from './Skeleton/ChatSkeleton';



export default function ChatList() {
  const currentUser = useCurrentUser();
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState([]);

  useEffect(() => {
    if(currentUser){
        axios.patch('/conversation', {
            id: currentUser?._id
        }).then((res) => {
            setChat(res.data);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        })
    }
  }, [])

  useEffect(() => {
    pusher.subscribe(currentUser?._id);

    const messageHandler = (body) => {
        setChat((prev) => [...prev, body]);
    };

    pusher.bind('conversation:new', messageHandler);
    return () => {
        pusher.unbind('conversation:new', messageHandler);
    }
  }, [])


  if(loading){
    return <ChatSkeleton/>
  }
  
  return (
    <div>
        <h2 className='text-center py-2 font-bold text-3xl'>Chat</h2>
        <div className="p-4 bg-white rounded-lg h-full sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {chat?.map((chat, i) => <Chat key={i} currentUser={currentUser} chat={chat}/>).reverse()}
                  </ul>
        </div>
    </div>
  )
}
