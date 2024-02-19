import React from 'react'
import { NavLink } from 'react-router-dom'
function Navigationbuttons(props) {
  return (
    <div>
      <div className='grid grid-cols-3'>
        <div>
          <NavLink className='m-2 p-2 border border-gray-100 flex justify-center hover:border-gray-300 hover:font-semibold hover:bg-gray-100' to={`/profits/${JSON.parse(localStorage.getItem('companyName')).companyName}`}>Profit and Remaining</NavLink>
          <NavLink className='m-2 p-2 border border-gray-100 flex justify-center hover:border-gray-300 hover:font-semibold hover:bg-gray-100' to={`/remaining/${JSON.parse(localStorage.getItem('companyName')).companyName}`}>Remainings</NavLink>
          <NavLink className='m-2 p-2 border border-gray-100 flex justify-center hover:border-gray-300 hover:font-semibold hover:bg-gray-100'>GST</NavLink>
          <NavLink className='m-2 p-2 border border-gray-100 flex justify-center hover:border-gray-300 hover:font-semibold hover:bg-gray-100'>Profit/loss</NavLink>
        </div>
        <div>

          <NavLink className='m-2 p-2 border border-gray-100 flex justify-center hover:border-gray-300 hover:font-semibold hover:bg-gray-100' to={`/saledetails/${JSON.parse(localStorage.getItem('companyName')).companyName}`}>Sales Details</NavLink>
          <NavLink className='m-2 p-2 border border-gray-100 flex justify-center hover:border-gray-300 hover:font-semibold hover:bg-gray-100'>Purchage Details</NavLink>
          <NavLink className='m-2 p-2 border border-gray-100 flex justify-center hover:border-gray-300 hover:font-semibold hover:bg-gray-100'>Expences</NavLink>
          <NavLink className='m-2 p-2 border border-gray-100 flex justify-center hover:border-gray-300 hover:font-semibold hover:bg-gray-100'>Profit/loss</NavLink>
        </div>
        <div>
          <NavLink className='m-2 p-2 border border-gray-100 flex justify-center hover:border-gray-300 hover:font-semibold hover:bg-gray-100' to={`/stocks/${JSON.parse(localStorage.getItem('companyName')).companyName}`}>Stock Items</NavLink>

          <NavLink className='m-2 p-2 border border-gray-100 flex justify-center hover:border-gray-300 hover:font-semibold hover:bg-gray-100'>Profit/loss</NavLink>
          <NavLink className='m-2 p-2 border border-gray-100 flex justify-center hover:border-gray-300 hover:font-semibold hover:bg-gray-100'>Profit/loss</NavLink>
          <NavLink className='m-2 p-2 border border-gray-100 flex justify-center hover:border-gray-300 hover:font-semibold hover:bg-gray-100'>Profit/loss</NavLink>
        </div>

      </div>


    </div>
  )
}

export default Navigationbuttons
