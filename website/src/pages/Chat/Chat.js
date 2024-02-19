import React, { useEffect, useState } from 'react'
import useOtherUser from '../../hooks/useOtherUser';
import { useNavigate } from 'react-router-dom';
import useActive from '../../hooks/useAcive';
import { pusher } from '../../libs/pusher';
import GroupAvatar from '../../components/GroupAvatar';
import clsx from 'clsx';
import Avatar from '../../components/Avatar';

export default function Chat({chat, currentUser}) {
  const [lastMessage, setLastMessage] = useState(chat?.lastMessage);
  const navigate = useNavigate();
  const id = chat._id;
  const otherUser = useOtherUser({
    conversation: chat
  })
  const isActive = useActive({
    email: otherUser[0]?.email,
  })

  useEffect(() => {
    pusher.subscribe(id);

    const messageHandler = (body) => {
        if(body.conversation === id){
          setLastMessage(body);
        }
    };

    const messageUpdateHandler = (body) => {
        if(body){
          if(body.conversation === id){
            setLastMessage(body);
          }
        }
    }

    pusher.bind('message:update', messageUpdateHandler);
    pusher.bind('message:new', messageHandler);
    return () => {
        pusher.unbind('message:update', messageUpdateHandler);
        pusher.unbind('message:new', messageHandler);
    }
  }, [])

  const myMessage = lastMessage?.user?._id === currentUser?._id;
  const isSeened = !myMessage && !lastMessage?.seen?.some(id => id === currentUser?._id);

  return (
    <li onClick={() => {navigate(`/conversation/${chat?._id}`)}} className="py-3 cursor-pointer px-5 hover:bg-gray-200 sm:py-4">
        <div className="flex items-center space-x-4">
            {chat?.isGroup ? (
              <>
                <GroupAvatar users={otherUser}/>
                <div className="flex-1 min-w-0">
                <p className={`text-sm ${isSeened && 'font-bold'} text-gray-900 truncate dark:text-white`}>
                      {chat?.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {myMessage && 'You: '}{lastMessage?.text}
                    </p>
                </div>
              </>
            ) : (
              <>
                  <Avatar image={`${process.env.REACT_APP_API_URL+otherUser[0]?.avatarUrl}`} email={otherUser[0]?.email}/>
                  <div className="flex-1 min-w-0">
                      <p className={`text-sm ${isSeened && 'font-bold'} text-gray-900 truncate dark:text-white`}>
                        {otherUser[0]?.fullName}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {myMessage && 'You: '}{lastMessage?.text}
                        {(lastMessage?.text?.length === 0 && lastMessage?.imageUrl?.length > 0) && `send ${!myMessage ? 'you' : ''} a image`}
                      </p>
                  </div>
              </>
            )}
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            {myMessage && (
                <div className='flex gap-2 ml-5'>
                  {lastMessage?.seen?.map((user, i) => 
                    // <img key={i} className='w-[20px] h-[20px] rounded-full bg-black' src={user.imageUrl} alt=''/>
                    <Avatar active small image={`${process.env.REACT_APP_API_URL+user?.avatarUrl}`} email={user?.email}/>
                  )}
                </div>
              )}
            </div>
        </div>
    </li>
  )
}
