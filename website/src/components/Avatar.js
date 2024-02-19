import React from 'react'
import useActive from '../hooks/useAcive'
import clsx from 'clsx'

export default function Avatar({email, image, active, small}) {
  const isActive = useActive({
    email: email,
  })
  return (
    <div className={clsx(`flex-shrink-0 relative w-8 h-8`, small && 'w-4 h-4 ')}>
        <img className="w-full h-full rounded-full bg-black" src={image} alt="Neil image"/>
        {!active && isActive && <span className='absolute w-[12px] h-[12px] bg-green-500 rounded-full right-0 bottom-0'></span>}
    </div>
  )
}
