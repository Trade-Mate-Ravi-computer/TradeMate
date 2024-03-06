import React, { useState } from 'react'
import LeftSidbar from './LeftSidbar'
import RightSidebar from './RightSidebar'
import { NavLink } from 'react-router-dom'
function AddSeller() {
    const [uploadStatus, setUplaodStatus] = useState("")
    const [sellerDetails, setSellerDetails] = useState({
        sellerName: '',
        address: '',
        companyName: JSON.parse(localStorage.getItem('companyName')).companyName,
        state: '',
        country: '',
        pinCode: '',
        gstIn: '',
        gstType: '',
        mobile: '',
        email:JSON.parse(localStorage.getItem('login')).user,
        company: {
            companyId: 0
        }

    })
    const handleOnChange = (e) => {
        setSellerDetails({
            ...sellerDetails,
            [e.target.name]: e.target.value
        })
    }
    const handleRadioButton = (e) => {
        setSellerDetails({
            ...sellerDetails,
            gstType: e.target.value
        })
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://tradematebackend-production.up.railway.app/seller/add', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
                },
                body: JSON.stringify(sellerDetails)
            });

            if (response.ok) {
               
                document.getElementById('info').classList.remove('text-red-800')
                document.getElementById('info').classList.add('text-green-800')
                setUplaodStatus("seller Added");
                setSellerDetails({
                    sellerName: '',
                    address: '',
                    companyName: JSON.parse(localStorage.getItem('companyName')).companyName,
                    state: '',
                    country: '',
                    pinCode: '',
                    gstIn: '',
                    gstType: '',
                    mobile: '',
                    email:JSON.parse(localStorage.getItem('login')).user,
                    company: {
                        companyId: 0
                    }
                })
                setTimeout(() => {
                    setUplaodStatus("");
                }, 2000);

            } else {
                console.log(response.data)
                document.getElementById('info').classList.remove('text-green-800')
                document.getElementById('info').classList.add('text-red-800')
                setUplaodStatus("Something went wrong");
                setTimeout(() => {
                    setUplaodStatus("");
                }, 2000);
            }
        } catch (error) {
            document.getElementById('info').classList.remove('text-green-800')
            document.getElementById('info').classList.add('text-red-800')
            setUplaodStatus("Server not responding try again later");
            setTimeout(() => {
                setUplaodStatus("");
            }, 2000);
        }
    };

    return (
        <div className='my-6 sm:h-[32.7rem] '>
            <div className='m-3 '><NavLink to={`/dashboard/${JSON.parse(localStorage.getItem('companyName')).companyName}`} className=" hover:bg-blue-400 hover:text-black rounded-md px-3 py-2 text-sm font-medium bg-blue-800 text-white border border-gray-200 w-10">{localStorage.getItem('login') ? "⇐ Company Dashboard" : "Home"}</NavLink></div>

            <div className=' grid grid-cols-1 sm:grid-cols-4'>

                <div className="border border-gray-100 hidden sm:flex flex-col">
                    <LeftSidbar openaddseller="bold" />
                    <RightSidebar />
                </div>
                <div className='border border-gray-100 justify-center col-span-3 w-full '>
                    <div><h1 className='flex justify-center text-3xl font-bold  text-green-600'>Add New seller</h1></div>
                    <form className="space-y-6 m-2 py-2 sm:pl-48" >
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div className='flex flex-wrap'>
                                <div className='w-full sm:w-1/2 m-1'>
                                    <label htmlFor="itemName1" className="block text-sm font-medium leading-6 text-gray-900">Enter seller's name</label>
                                    <input id="sellerName" name="sellerName" onChange={(e) => handleOnChange(e)} type="text" value={sellerDetails.sellerName} required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                                <div className='w-full sm:w-1/2 m-1'>
                                    <label htmlFor="itemName2" className="block text-sm font-medium leading-6 text-gray-900">Enter seller's Address</label>
                                    <input id="address" name="address" type="text" onChange={(e) => handleOnChange(e)} value={sellerDetails.address} required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className='flex flex-wrap'>
                                <div className='w-full sm:w-1/2 m-1'>
                                    <label htmlFor="itemName3" className="block text-sm font-medium leading-6 text-gray-900">State</label>
                                    <input id="state" name="state" type="text" onChange={(e) => handleOnChange(e)} value={sellerDetails.state} required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                                <div className='w-full sm:w-1/2 m-1'>
                                    <label htmlFor="itemName4" className="block text-sm font-medium leading-6 text-gray-900">Country</label>
                                    <input id="country" name="country" type="text" onChange={(e) => handleOnChange(e)} value={sellerDetails.country} required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className='flex flex-wrap'>
                                <div className='w-full sm:w-1/2 m-1'>
                                    <label htmlFor="itemName3" className="block text-sm font-medium leading-6 text-gray-900">GST In(Optional)</label>
                                    <input id="gstIn" name="gstIn" type="text" onChange={(e) => handleOnChange(e)} value={sellerDetails.gstIn} required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                                <div className='w-full sm:w-1/2 m-1'>
                                    <label className="block">
                                        <input type="radio" onChange={(e) => handleRadioButton(e)} name="option" value="Regular" className="mr-1" />
                                        Regular(Optional)
                                    </label>
                                    <label className="block">
                                        <input type="radio" onChange={(e) => handleRadioButton(e)} name="option" value="Composition" className="mr-1" />
                                        Composition(Optional)
                                    </label>
                                </div>
                            </div>
                            <div className='flex flex-wrap'>
                                <div className='w-full sm:w-1/2 m-1'>
                                    <label htmlFor="itemName3" className="block text-sm font-medium leading-6 text-gray-900">Mobile</label>
                                    <input
                                        id="mobile"
                                        name="mobile"
                                        type="tel"
                                        pattern="[0-9]{10}"  // Set the pattern attribute to allow only 10 digits
                                        maxLength="10"       // Set the maxLength attribute to limit input to 10 characters
                                        value={sellerDetails.mobile
                                        }
                                        onChange={(e) => handleOnChange(e)}
                                        className="mt-1 p-2 w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block border border-black"
                                        placeholder="Enter 10-digit mobile number"  // Add a placeholder for user guidance
                                        required  // Add the required attribute to make the input field mandatory
                                    />    </div>
                                <div className='w-full sm:w-1/2 m-1'>
                                    <label htmlFor="itemName4" className="block text-sm font-medium leading-6 text-gray-900">Pin Code</label>
                                    <input id="pincode" name="pinCode" type="number" onChange={(e) => handleOnChange(e)} value={sellerDetails.pinCode} required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                        </div>

                    </form>

                    <div className='flex justify-center  mt-6'>
                        <button type="submit" onClick={(e) => handleOnSubmit(e)} className="w-full sm:w-auto flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add seller</button>
                    </div>
                    <div id='info' className='w-full text-center text-xl font-bold text-green-800 mt-2'>{uploadStatus}</div>

                </div>

            </div>
        </div>
    )
}

export default AddSeller
