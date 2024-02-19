import React, { useEffect } from 'react'
import Navigationbuttons from './Navigationbuttons'
import LeftSidbar from './LeftSidbar'
import RightSidebar from './RightSidebar'
import Home from './Home'
import LoginSuggetion from './LoginSuggetion'
import { useParams } from 'react-router-dom'


function Dashboard() {
    let store = JSON.parse(localStorage.getItem('login'))
  
    return (
        <>
           {
            store && store.login? <div>
            <div className='my-4'><h1 className='flex justify-center text-3xl text-gray-800 font-semibold'>Welcome to <span className='text-blue-400 ml-1'>{`${JSON.parse(localStorage.getItem('companyName')).companyName}`}</span> </h1></div>
            <div className='gridstyle grid grid-cols-4'>

                <LeftSidbar opendash="bold" />
                <div className='border border-gray -100 justify-center col-span-2'>
                    <Navigationbuttons  />

                </div>
                <div className='border border-gray-100 justify-center'>
                    <RightSidebar  />
                </div>
            </div>
        </div>:<LoginSuggetion/>
           }
        </>
    )
}

export default Dashboard
