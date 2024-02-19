'use client'
import { useMemo, useState } from "react";
import useActiveList from "../hooks/useActiveList";


export default function useActive({ email, isGroup }) {
  const { members } = useActiveList();
  const isActive = members.indexOf(email) !== -1;
  let isGroupActive;
  
  if(isGroup){
    isGroupActive = email?.some(user => members.indexOf(user?.email) !== -1)
  }

  const status = useMemo(() => {
    return isActive ? true : false
  }, [isActive]);

  // For Group
  
  const statusGroup = useMemo(() => {
    return isGroupActive ? true : false
  }, [isGroupActive])

  if(isGroup){
    return statusGroup;
  }
  
  return status
}
