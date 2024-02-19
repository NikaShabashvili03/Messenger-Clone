import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/slices/auth';

export default function useCurrentUser() {
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.auth.data);

  if(!isAuth){
    return null
  }

  return userData
}
