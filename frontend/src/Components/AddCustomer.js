import React from 'react'
import LeftSidbar from './LeftSidbar'
import RightSidebar from './RightSidebar'
import { NavLink } from 'react-router-dom'
function AddCustomer() {
    return (
        <div>
             <div className='m-3 pl-28 '><NavLink to={`/dashboard/${JSON.parse(localStorage.getItem('companyName')).companyName}`} className=" hover:bg-gray-400 hover:text-black rounded-md px-3 py-2 text-sm font-medium bg-black text-white border border-gray-200 w-10">{localStorage.getItem('login')?"⇐ Company Dashboard":"Home"}</NavLink></div>
            <div><h1 className='flex justify-center text-3xl font-bold  text-green-600'>Add New Customer</h1></div>
            <div className='gridstyle grid grid-cols-4'>
                <LeftSidbar openaddcustomer="bold" />
                <div className='border border-gray-100 justify-center col-span-2'>
                    <form className="space-y-6 px-40 py-2" action="/" method="POST">
                        <div>
                            <label for="Item Name" className="block text-sm font-medium leading-6 text-gray-900">Enter Customer's name</label>
                            <input id="itemName"  name="itemName" type="text" required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        
                    
                        <div>
                            <div className="flex items-center justify-between">
                                <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Address of Customer</label>
                            </div>
                            <div className="mt-2">
                                <input id="address" name="address" type="text" min='0' required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Customer</button>
                        </div>
                    </form>

                </div>
                <div className='border border-gray-100 justify-center'>
                    <RightSidebar />
                </div>
            </div>
        </div>
    )
}

export default AddCustomer
