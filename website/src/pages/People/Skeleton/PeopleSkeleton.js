import React from 'react'

export default function PeopleSkeleton() {
  return (
      <div>
        <h2 className='text-center py-2 font-bold text-3xl'>Chat</h2>
              <div className="p-4 bg-white rounded-lg h-full sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    <li className="py-3 px-5 hover:bg-gray-300 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-gray-500 animate-pulse rounded-full"/>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="bg-gray-500 rounded-2xl w-[150px] h-[5px] animate-pulse"></div>
                            </div>
                        </div>
                    </li>
                    <li className="py-3 px-5 hover:bg-gray-300 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-gray-500 animate-pulse rounded-full"/>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="bg-gray-500 rounded-2xl w-[150px] h-[5px] animate-pulse"></div>
                            </div>
                        </div>
                    </li>
                    <li className="py-3 px-5 hover:bg-gray-300 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-gray-500 animate-pulse rounded-full"/>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="bg-gray-500 rounded-2xl w-[150px] h-[5px] animate-pulse"></div>
                            </div>
                        </div>
                    </li>
                    <li className="py-3 px-5 hover:bg-gray-300 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-gray-500 animate-pulse rounded-full"/>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="bg-gray-500 rounded-2xl w-[150px] h-[5px] animate-pulse"></div>
                            </div>
                        </div>
                    </li>
                    <li className="py-3 px-5 hover:bg-gray-300 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-gray-500 animate-pulse rounded-full"/>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="bg-gray-500 rounded-2xl w-[150px] h-[5px] animate-pulse"></div>
                            </div>
                        </div>
                    </li>
                </ul>
        </div>
    </div>
  )
}
