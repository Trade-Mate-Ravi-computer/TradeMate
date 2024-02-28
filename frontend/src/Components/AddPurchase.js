import React, { useState } from 'react'
import LeftSidbar from './LeftSidbar'
import RightSidebar from './RightSidebar'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
function AddPurchase() {
    const [sale, setSale] = useState();
    const [isOpen, steIsOpen] = useState(false)
    const itemNames = JSON.parse(localStorage.getItem('saleDetails'))
    const [uploadStatus,setUploadStatus]=useState("")
    const upStatus = () => {
        setUploadStatus("Purchase Added")
        setTimeout(() => {
            setUploadStatus("")
        }, 3000);
    }
    const failStatus = () => {
        setUploadStatus("Something went wrong")
        setTimeout(() => {
            setUploadStatus("")
        }, 3000);
    }
    const [purchaseDetails, setPurchaseDetails] = useState({
        sellerName: '',
        quantity: 0,
        date: '',
        price: 0,
        paidAmmount: 0,
        itemName: '',
        companyName: '',
        company: {
            id: 0
        },
        item: {
            itemName: 'rc'
        }
    })
    const handlOnClickItemName = (name) => {
        setSale(name)
        steIsOpen(false)
    }
    const handleOnClicks = () => {
        if (isOpen) {
            steIsOpen(false)
        }
    }
    const handleOnClick = () => {
        isOpen ? steIsOpen(false) : steIsOpen(true)
    }
    const handleEventChange = (e) => {
        // const { name, value } = e.target;
        setSale(e.target.value)
        setPurchaseDetails({
            quantity: 0,
            date: '',
            price: 0,
            paidAmmount: 0,
            sellerName: '',
            company: {
                id: 0
            },
            item: {
                itemName: 'item'
            }
        })

    };
    const handleOnChangeevent = (e) => {
        setPurchaseDetails({
            ...purchaseDetails,
            [e.target.name]: e.target.value,
            companyName: JSON.parse(localStorage.getItem('companyName')).companyName,
            itemName: sale,
            company: {
                id: 0
            },
            item: {
                itemName: ''
            }
        });
    };
    const handleOnSubmit = async (e) => {
        e.preventDefault();
       try{
        await axios.post('https://tradematebackend-production.up.railway.app/purchase/add',
        purchaseDetails,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
            }
        }).then((resp) => {
            console.log(resp)
            upStatus();
        })
       }catch(e){
        console.log("Some Error Occurs");
        failStatus();
       }
    }
    return (
        <div> <div className='m-3 pl-28 '><NavLink to={`/dashboard/${JSON.parse(localStorage.getItem('companyName')).companyName}`} className=" hover:bg-gray-400 hover:text-black rounded-md px-3 py-2 text-sm font-medium bg-black text-white border border-gray-200 w-10">{localStorage.getItem('login') ? "⇐ Company Dashboard" : "Home"}</NavLink></div>
            <div><h1 className='flex justify-center text-3xl font-bold  text-green-600'>Add New Purchase</h1></div>
            <div className='gridstyle grid grid-cols-4'>
                <LeftSidbar openpurchase="bold" />
                <div className='border border-gray-100 justify-center col-span-2' onClick={handleOnClicks}>
                    <form className="space-y-6 px-40 py-2" onSubmit={(e) => handleOnSubmit(e)}>
                        <div>
                            <label htmlFor="Item Name" className="block text-sm font-medium leading-6 text-gray-900">Enter Product name</label>
                            <input id="itemName" name="itemName" onChange={handleEventChange} value={sale} onClick={handleOnClick} type="text" required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <div className="dropdown absolute bg-gray-100" style={{ width: 438 }}>

                                <ul style={isOpen ? { maxHeight: 300 } : null} className='overflow-y-auto'>
                                    {isOpen && itemNames.map((item, index) => (
                                        item.itemName.toLowerCase().includes(sale ? sale.toLowerCase() : '') ? <button key={index} className='list-none border border-x-2 w-full flex justify-center hover:bg-blue-200' onClick={() => handlOnClickItemName(item.itemName)}>
                                            {item.itemName}
                                        </button> : ''
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="Quantity" className="block text-sm font-medium leading-6 text-gray-900">Quantity</label>
                            </div>
                            <div className="mt-2">
                                <input id="quantity" onChange={(e) => handleOnChangeevent(e)} value={purchaseDetails.quantity} name="quantity" type="number" min='0' required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">Date</label>
                            </div>
                            <div className="mt-2">
                                <input id="date" name="date" value={purchaseDetails.date} onChange={(e) => handleOnChangeevent(e)} type="date" className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div className='fixed flex items-center ml-40 font-bold text-5xl text-green-600'>{uploadStatus}</div>
                        <div>
                            <label htmlFor="Item Name" className="block text-sm font-medium leading-6 text-gray-900">Distributer Name</label>
                            <input id="itemName" name="sellerName" type="text" value={purchaseDetails.sellerName} required onChange={(e) => handleOnChangeevent(e)} className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="ammount" className="block text-sm font-medium leading-6 text-gray-900">Rate</label>
                            </div>
                            <div className="mt-2">
                                <input id="amount" name="price" type="number" min='0' value={purchaseDetails.price} onChange={(e) => handleOnChangeevent(e)} required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Paid Ammount</label>
                            </div>
                            <div className="mt-2">
                                <input id="amount" name="paidAmmount" type="number" min='0' value={purchaseDetails.paidAmmount} required onChange={(e) => handleOnChangeevent(e)} className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >Add Purchase</button>
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

export default AddPurchase
