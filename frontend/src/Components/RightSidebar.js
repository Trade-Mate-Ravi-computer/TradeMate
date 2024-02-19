import React from 'react'
import { NavLink } from 'react-router-dom'

function RightSidebar() {
    return (
        <div>
            <div className=' border border-gray-100 w-full'>
                <NavLink className='border border-gray-100 justify-center flex hover:border-gray-300 hover:font-semibold hover:bg-gray-100' to={`/profits/${JSON.parse(localStorage.getItem('companyName')).companyName}`}>Profit</NavLink>
                <NavLink className='border border-gray-100 justify-center flex hover:border-gray-300 hover:font-semibold hover:bg-gray-100' to={`/saledetails/${JSON.parse(localStorage.getItem('companyName')).companyName}`}>Sales Details</NavLink>
                <NavLink className='border border-gray-100 justify-center flex hover:border-gray-300 hover:font-semibold hover:bg-gray-100' to={`/stocks/${JSON.parse(localStorage.getItem('companyName')).companyName}`}>Products List</NavLink>
                <NavLink className='border border-gray-100 justify-center flex hover:border-gray-300 hover:font-semibold hover:bg-gray-100' to={`/remaining/${JSON.parse(localStorage.getItem('companyName')).companyName}`}>Remaining List</NavLink>
                <NavLink className='border border-gray-100 justify-center flex hover:border-gray-300 hover:font-semibold hover:bg-gray-100' >Help</NavLink>
                <NavLink className='border border-gray-100 justify-center flex hover:border-gray-300 hover:font-semibold hover:bg-gray-100'>feedback</NavLink>
                
            </div>
        </div>
    )
}

export default RightSidebar
