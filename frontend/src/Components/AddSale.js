import React, { useEffect, useState } from 'react'
import LeftSidbar from './LeftSidbar'
import RightSidebar from './RightSidebar'
import { NavLink } from 'react-router-dom';


function AddSale() {
    const [sale, setSale] = useState();
    const [customerName,setCustomerName]= useState()
    const [isOpen, steIsOpen] = useState(false)
    const [isOpenCust,setIsOpenCust]=useState(false)
    const itemNames = JSON.parse(localStorage.getItem('saleDetails'))
    const customers = JSON.parse(localStorage.getItem('customers'))
    const handleEventChange = (e) => {
        // const { name, value } = e.target;
        setSale(e.target.value)

    };
    const handleOnClick = () => {
        isOpen ? steIsOpen(false) : steIsOpen(true)
    }
    const handleOnClicks = () => {
        if (isOpen) {
            steIsOpen(false)

        }
        if(isOpenCust){
            setIsOpenCust(false)
        }
    }


    const handlOnClickItemName = (name) => {
        setSale(name)
        steIsOpen(false)
    }
    const handleOnClicksCustomerInput = () => {
       isOpenCust?setIsOpenCust(false):setIsOpenCust(true)
    }
    const handlOnClickCustomerName = (name) => {
        setCustomerName(name)
        setIsOpenCust(false)
    }
    const handleEcustomerNameChange = (e) => {
        // const { name, value } = e.target;
        setCustomerName(e.target.value)

    };
    const [id, setId] = useState(0)
    const [email, setEmail] = useState({
        email: JSON.parse(localStorage.getItem('login')).user
    })
    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = () => {
        try {
            fetch('https://tradematebackend-production.up.railway.app/user/byemail', {
                "method": "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
                },
                body: JSON.stringify(email)

            }).then((resp) => {

                resp.json().then((result) => {
                    // console.log("result :-", result.id)
                    setId(result.id)
                })
            })
        } catch (e) {
            console.log("Some Error Occurs")
        }
    }
    // console.log("Id set to :-", id)
    const [uploadStatus, setUploadStatus] = useState("")
    const upStatus = () => {
        setUploadStatus("Sale Added")
        setTimeout(() => {
            setUploadStatus("")
        }, 3000);
    }
    const failStatus = () => {
        setUploadStatus("Something went wrong")
        setTimeout(() => {
            setUploadStatus("")
        }, 1000);
    }
    const [saleDetail, setSaleDetail] = useState({
        item: {
            itemName: ''
        },
        itemName: '',
        quantity: 0,
        date: null,
        customerName: "",
        rate: 0,
        receivedAmmount: 0,
        companyName: '',
        email:JSON.parse(localStorage.getItem('login')).user,
        company: {
            compannyName: ''
        },
        customer: {
            id: 0
        },
        gstInRupee:0

    })
    const onEventChange = (e) => {
        const { name, value } = e.target
        setSaleDetail(prevSale => ({
            ...prevSale,
            [name]: value,
            companyName: JSON.parse(localStorage.getItem('companyName')).companyName,
            itemName: sale,
            customerName:customerName
        }));

    }
    const handleOnSubmit = (e) => {
        e.preventDefault()
        try {
            fetch('https://tradematebackend-production.up.railway.app/sales/addSale', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
                },
                body: JSON.stringify(saleDetail)
            }).then((resp) => {
                if (resp.ok) {
                    setSaleDetail({
                        item: {
                            itemName: ""
                        },
                        itemName: '',
                        quantity: 0,
                        date: 0,
                        customerName: "",
                        rate: 0,
                        receivedAmmount: 0,
                        company: {
                            compannyName: ''
                        },
                        email:JSON.parse(localStorage.getItem('login')).user,
                        customer: {
                            id: 0
                        }
                    })
                    upStatus();
                    // document.getElementById('uploadstatus').classList.remove('text-red-600')
                    // document.getElementById('uploadstatus').classList.add('text-green-600')
                    // window.location.reload()
                } else {
                    failStatus();
                    // document.getElementById('uploadstatus').classList.remove('text-green-600')
                    // document.getElementById('uploadstatus').classList.add('text-red-600')

                }
            })
        } catch (e) {
            failStatus();
        }
    }
    const handleUpdateStatus = () => {
        setUploadStatus('')
    }
    return (
        <div className='h-[46rem] sm:h-screen'>
            <div className='m-3'><NavLink to={`/dashboard/${JSON.parse(localStorage.getItem('companyName')).companyName}`} className=" hover:bg-blue-400 hover:text-black rounded-md px-3 py-2 text-sm font-medium bg-blue-800 text-white border border-gray-200 sm:w-10 w-44 sm:hidden flex">{localStorage.getItem('login') ? "⇐ Company Dashboard" : "Home"}</NavLink></div>
            <div className=' grid grid-cols-1 sm:grid-cols-4 '>

            <div className="border border-gray-100 hidden sm:flex flex-col">
                    <LeftSidbar openaddSale="bold" />
                    <RightSidebar />
                </div>
                <div className='border border-gray-100 justify-center col-span-3' onClick={handleOnClicks} >
                    <div><h1 className='flex justify-center text-3xl font-bold  text-green-600'>Sale Entry</h1></div>
                    <form className="space-y-6 px-4 sm:px-60 py-2" onSubmit={(e) => handleOnSubmit(e)}>
                        <div>
                            <label htmlFor="Item Name" className="block text-sm font-medium leading-6 text-gray-900">Enter Customer's name</label>
                            <input value={customerName} onChange={(e) => handleEcustomerNameChange(e)} id="itemName" name="customerName" type="text" onClick={handleOnClicksCustomerInput} required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <div className="dropdown absolute bg-gray-100 w-[21.8rem] sm:w-[41.1rem]">

                                <ul style={isOpenCust ? { maxHeight: 300 } : null} className='overflow-y-auto'>
                                    {isOpenCust && customers.map((customer, index) => (
                                      (customer.companyName===JSON.parse(localStorage.getItem('companyName')).companyName)?  customer.customerName.toLowerCase().includes(customerName ? customerName.toLowerCase() : '') ? <button key={index} className='list-none border border-x-2 w-full flex justify-center hover:bg-blue-200' onClick={() => handlOnClickCustomerName(customer.customerName)}>
                                      {customer.customerName}
                                  </button> : '':''
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">Date</label>
                            </div>
                            <div className="mt-2">
                                <input value={saleDetail.date} onChange={(e) => onEventChange(e)} id="date" name="date" type="date" className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="Quantity" className="block text-sm font-medium leading-6 text-gray-900">Select Item</label>
                        </div>
                        <div className='w-full'>

                            <input name="user" onClick={handleOnClick} value={sale} onChange={handleEventChange} className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" />
                            <div className="dropdown absolute bg-gray-100 w-[21.8rem] sm:w-[41.1rem]">

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
                                <input value={saleDetail.quantity} onChange={(e) => onEventChange(e)} id="quantity" name="quantity" type="number" min='1' required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="ammount" className="block text-sm font-medium leading-6 text-gray-900">Rate</label>
                            </div>
                            <div className="mt-2">
                                <input value={saleDetail.rate} onChange={(e) => onEventChange(e)} id="amount" name="rate" type="number" min='0' required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Received Ammount</label>
                            </div>
                            <div className="mt-2">
                                <input value={saleDetail.receivedAmmount} onChange={(e) => onEventChange(e)} id="amount" name="receivedAmmount" type="number" min='0' required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Sale</button>
                        </div>
                        <div className='w-full text-center text-xl font-bold text-green-800'>{uploadStatus}</div>
                    </form>

                </div>

            </div>
           
        </div>
    )
}

export default AddSale
