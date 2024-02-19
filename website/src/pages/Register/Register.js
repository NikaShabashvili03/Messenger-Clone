import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '../../libs/axios'
import { useRef } from 'react';

export default function Register() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const [avatarUrl, setAvatarUrl] = useState('');
  const inputFileRef = useRef(null)
  const { 
    handleSubmit, 
    register, 
    formState: { 
      errors, 
      isValid
    } 
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: ''
    },
  });

  const onSubmit = async (val) => {
    // if(!avatarUrl){
    //   alert('Please set avatar');
    //   return null;
    // }
    const data = await dispatch(fetchRegister({
      fullName: val.fullName,
      email: val.email,
      password: val.password,
      avatarUrl: avatarUrl
    }));

    if(!data.payload){
      alert('Something went wrong!')
    }else{
      if('token' in data.payload){
        window.localStorage.setItem('token', data.payload.token);
      }
    }
  }

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0]
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setAvatarUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert('You cant upload img')
    }
  } 

  const onClickRemoveImage = () => {
    setAvatarUrl('')
  }

  if(isAuth){
    return <Navigate to={'/'}/>
  }

  return (
    <div className='h-[100dvh] flex flex-col justify-center items-center'>
      <h2 className="text-center text-4xl mb-10">Messenger Clone</h2>
      <div className='w-[50%] flex flex-col justify-center items-center sm:flex-row gap-5 p-5 shadow-2xl'>
        {avatarUrl ? (
          <div className='relative w-[50%] rounded-full aspect-square'>
            <button className='absolute right-2 top-2 w-[30px] h-[30px] rounded-full bg-white' onClick={onClickRemoveImage}>
              X
            </button>
            <img className='w-full h-full left-0 top-0 rounded-full' src={process.env.REACT_APP_API_URL+avatarUrl} alt='image'/>
          </div>
        ) : (
          <div onClick={() => inputFileRef.current.click()} class="flex rounded-full cursor-pointer animate-pulse items-center justify-center w-[50%] aspect-square bg-gray-300 dark:bg-gray-700">
              <input ref={inputFileRef} hidden onChange={handleChangeFile} type='file'/>
              <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
              </svg>
          </div>
        )}
        <form className='w-full h-full' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col'>
            <label>{errors.fullName?.message}</label>
            <input placeholder='Full Name' className='border-2 p-2 m-2 bg-gray-300/30' type='text' {...register('fullName', {required: true})}></input>
            <label>{errors.email?.message}</label>
            <input placeholder='Email' className='border-2 p-2 m-2 bg-gray-300/30' type='email' {...register('email', {required: true})}></input>
            <label>{errors.password?.message}</label>
            <input placeholder='Password' className='border-2 p-2 m-2 bg-gray-300/30' type='password' {...register('password', {required: true})}></input>
          </div>
          <input className='w-full bg-blue-300 cursor-pointer hover:bg-blue-500 text-white py-2 rounded-2xl' disabled={!isValid} type='submit'/>
        </form>
      </div>
      <Link to={'/'} className='mt-2'>Login</Link>
    </div>
  )
}
