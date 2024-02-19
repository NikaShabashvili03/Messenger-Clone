import React from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../libs/axios';
import { useState } from 'react';
import useCurrentUser from '../../hooks/useCurrentUser';
import { useSelector } from 'react-redux';
import useOtherUser from '../../hooks/useOtherUser';
import Messages from './Messages';
import { useForm } from 'react-hook-form';
import { pusher } from '../../libs/pusher';
import { FaArrowLeft } from "react-icons/fa6";
import { useRef } from 'react';
import useActive from '../../hooks/useAcive';
import useActiveList from '../../hooks/useActiveList';
import GroupAvatar from '../../components/GroupAvatar';
import ConversationSkeleton from './Skeleton/ConversationSkeleton';
import { FaFileImage } from "react-icons/fa";
import { IoIosRemoveCircle } from "react-icons/io";
import Avatar from '../../components/Avatar';


export default function Conversation() {
  const { id } = useParams();
  const { register, reset, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            text: '',
        }
  });
  const ref = useRef(null);
  const [formLoading, setFormLoading] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState([]);
  const [conversation, setConversation] = useState();
  const [messages, setMessages] = useState(null);
  const [lastMessage, setLastMessage] = useState();
  const inputFileRef = useRef(null);
  const [showImage, setShowImage] = useState({
    status: false,
    image: ''
  });
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const otherUser = useOtherUser({
    conversation: conversation
  })


  useEffect(() => {
    axios.get(`/conversation/${id}`)
        .then((res) => {
            setConversation(res.data);
            setMessages(res.data.message);
            setLastMessage(res.data.message.slice(-1)[0]);
            setLoading(false);
        }).catch((err) => {
            navigate('/');
        })
  }, [])

  useEffect(() => {
    messages && (
        axios.patch('/message/update', {
            message: messages,
            userId: currentUser?._id,
        }).catch((err) => {
            console.log(err);
        })
    )
  }, [messages])


  useEffect(() => {
    ref.current && ref.current.scrollIntoView();
  }, [])

  const handleChangeFile = async (event) => {
    try {
      console.log(event)
      const formData = new FormData();
      const file = event.target.files[0]
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl((prev) => [...prev, data.url]);
    } catch (err) {
      console.warn(err);
      alert('You cant upload img')
    }
  } 

  useEffect(() => {
    pusher.subscribe(id);

    const messageHandler = (body) => {
        if(body.conversation === id){
            setMessages((prev) => [...prev, body]);
        }
    };

    const lastMessageHandler = (body) => {
        if(body){
            if(body.conversation === id){
                setLastMessage(body);
            }
        }
    }

    pusher.bind('message:new', messageHandler);
    pusher.bind('message:update', lastMessageHandler);
    return () => {
        pusher.unbind('message:new', messageHandler);
        pusher.unbind('message:update', lastMessageHandler);
    }
  }, [])

  const onSubmit = (data) => {
    setFormLoading(true);
    reset();
    axios.post(`/conversation/${conversation._id}/message`, {
        userId: currentUser?._id,
        text: data.text,
        imageUrl: imageUrl
    }).then((res) => {
        setFormLoading(false);
        setImageUrl([])
    }).catch((err) => {
        console.warn(err);
        setFormLoading(false);
    })
  }

  const isActive = useActive({
    email: otherUser && otherUser[0]?.email
  })


  const clickOnImage = (image) => {
    setShowImage({
        status: true,
        image: image
    })
  }

  if(isLoading && !conversation){
    return <ConversationSkeleton/>
  }

  return (
    <div className='h-[85dvh] md:h-[95dvh] relative'>
        {showImage.status && (
            <div className={`absolute z-50 w-full h-full flex justify-center items-center`}>
                <div onClick={() => {
                        setShowImage({
                            status: false,
                            image: ''
                        })
                }} className='w-full h-full absolute z-40 bg-gray-500/50'></div>
                <div className='w-[85%] flex z-50 justify-center items-center bg-white h-[85%]'>
                    <img src={showImage.image} alt='' className='w-[90%] z-50 h-[90%] object-cover'/>
                </div>
            </div>
        )}

        {/* Header */}
        <div className='w-full h-[5%] flex px-2 justify-start items-center'>
            <FaArrowLeft className='cursor-pointer' onClick={() => {
                navigate('/')
            }}/>
            {conversation?.isGroup 
            ? <div className='flex justify-center ml-1 gap-2 items-center'>
                    <GroupAvatar small users={otherUser}/>
                    <h2>{conversation.name}</h2>
              </div> 
            : <>
                    <div className='ml-2 w-[36px] relative h-[36px]'>
                        <Avatar image={`${process.env.REACT_APP_API_URL+otherUser[0]?.avatarUrl}`} email={otherUser[0]?.email}/>
                    </div>
                    <h2 className='ml-1'>{otherUser && otherUser[0]?.fullName}</h2>
                </>
            }
        </div>
        <div className='w-full gap-1 overflow-y-scroll py-5 px-8 flex flex-col max-h-[90%] h-[90%] bg-gray-200'>
            {messages?.map((message, i) => <Messages clickOnImage={clickOnImage} image={message?.imageUrl} seen={lastMessage?._id === message._id && lastMessage.seen} _id={message._id} text={message.text} user={message.user} me={message.user._id === currentUser._id} key={i}/>)}
            <div ref={ref}></div>
        </div>
        {imageUrl.length > 0 && (
            <div className='absolute border-t border-black p-2 bottom-[5%] gap-5 bg-gray-300 z-50 flex flex-col w-full h-[25%]'>
                <IoIosRemoveCircle onClick={() => {setImageUrl([])}} size={35}/>
                <div className='w-full relative flex gap-5 overflow-x-auto  max-w-full h-full'>
                    {imageUrl.map((img, i) => <img key={i} src={process.env.REACT_APP_API_URL+img} className='h-full aspect-square' alt=''/>)}
                </div>
            </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className='w-full flex justify-between px-4 items-center h-[5%]'>
            <div onClick={() => inputFileRef.current.click()} className="flex cursor-pointer mr-2 h-[90%] items-center justify-center">
                <input ref={inputFileRef} hidden onChange={handleChangeFile} type='file'/>
                <FaFileImage size={25}/>
            </div>
            <input disabled={formLoading} {...register('text', {required: false})} type='text' className='h-[90%] border-2 border-r-0 px-5 border-blue-700 rounded-l-full w-full'/>
            <input disabled={formLoading} type='submit' className='px-5 cursor-pointer border-2 font-normal hover:font-bold border-l-0 border-blue-700 rounded-r-full h-[90%]'/>
        </form>
    </div>
  )
}
