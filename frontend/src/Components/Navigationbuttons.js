import React from 'react'
import { NavLink } from 'react-router-dom'
function Navigationbuttons() {
  return (
    <div>
      <div className='grid grid-cols-3'>
        <div>
          <NavLink className='m-2 p-2 border border-gray-100 flex justify-center hover:border-gray-300 hover:font-semibold hover:bg-gray-100' to="/profits">Profit/loss</NavLink>
          <NavLink className='m-2 p-2 border border-gray-100 flex justify-center hover:border-gray-300 hover:font-semibold hover:bg-gray-100'>GST</NavLink>
          <NavLink className='m-2 p-2 border border-gray-100 flex justify-center hover:border-gray-300 hover:font-semibold hover:bg-gray-100'>Remainings</NavLink>
          <NavLink className='m-2 p-2 border border-gray-100 flex justify-center hover:border-gray-300 hover:font-semibold hover:bg-gray-100'>Profit/loss</NavLink>
        </div>
        <div>

          <NavLink className='m-2 p-2 border border-gray-100 flex justify-center hover:border-gray-300 hover:font-semibold hover:bg-gray-100' to="/saledetails">Sales Details</NavLink>
          <NavLink className='m-2 p-2 border border-gray-100 flex justify-center hover:border-gray-300 hover:font-semibold hover:bg-gray-100'>Purchage Details</NavLink>
          <NavLink className='m-2 p-2 border border-gray-100 flex justify-center hover:border-gray-300 hover:font-semibold hover:bg-gray-100'>Expences</NavLink>
          <NavLink className='m-2 p-2 border border-gray-100 flex justify-center hover:border-gray-300 hover:font-semibold hover:bg-gray-100'>Profit/loss</NavLink>
        </div>
        <div>
          <NavLink className='m-2 p-2 border border-gray-100 flex justify-center hover:border-gray-300 hover:font-semibold hover:bg-gray-100' to="/stocks">Stock Items</NavLink>

          <NavLink className='m-2 p-2 border border-gray-100 flex justify-center hover:border-gray-300 hover:font-semibold hover:bg-gray-100'>Profit/loss</NavLink>
          <NavLink className='m-2 p-2 border border-gray-100 flex justify-center hover:border-gray-300 hover:font-semibold hover:bg-gray-100'>Profit/loss</NavLink>
          <NavLink className='m-2 p-2 border border-gray-100 flex justify-center hover:border-gray-300 hover:font-semibold hover:bg-gray-100'>Profit/loss</NavLink>
        </div>

      </div>


    </div>
  )
}

export default Navigationbuttons
