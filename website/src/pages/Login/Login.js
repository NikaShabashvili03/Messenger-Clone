import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';
import { Link, Navigate } from 'react-router-dom';

export default function Login() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const { 
    handleSubmit, 
    register, 
    formState: { 
      errors, 
      isValid
    } 
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const onSubmit = async (val) => {
    const data = await dispatch(fetchAuth(val));
    if(!data.payload){
      alert('you cant login')
    }else{
      if('token' in data.payload){
        window.localStorage.setItem('token', data.payload.token);
      }
    }
  }

  if(isAuth){
    return <Navigate to={'/'}/>
  }

  return (
    <div className='h-[100dvh] flex flex-col justify-center items-center'>
      <h2 className="text-center text-4xl mb-10">Messenger Clone</h2>
        <div className='w-[50%] flex flex-col justify-center items-center sm:flex-row gap-5 p-5 shadow-2xl'>
          <form className='w-full h-full flex flex-col' onSubmit={handleSubmit(onSubmit)}>
            <label>{errors.email?.message}</label>
            <input placeholder='Email' className='border-2 p-2 m-2 bg-gray-300/30' type='email' {...register('email', {required: true})}></input>
            <label>{errors.password?.message}</label>
            <input placeholder='Password' className='border-2 p-2 m-2 bg-gray-300/30' type='password' {...register('password', {required: true})}></input>
            <input className='w-full bg-blue-300 cursor-pointer hover:bg-blue-500 text-white py-2 rounded-2xl' disabled={!isValid} type='submit'/>
          </form>
      </div>
      <Link to={'/register'} className='mt-2'>Register</Link>
    </div>
  )
}
