import React, { useEffect, useState } from 'react'
import LeftSidbar from './LeftSidbar'
import RightSidebar from './RightSidebar'

function AddSale() {
    const [sale, setSale] = useState();
    const [isOpen, steIsOpen] = useState(false)
    const itemNames =JSON.parse(localStorage.getItem('saleDetails'))
    const handleEventChange = (e) => {
        // const { name, value } = e.target;
        setSale(e.target.value)

    };
    const handleOnClick = () => {
        isOpen ? steIsOpen(false) : steIsOpen(true)
    }
    const handleOnClicks=()=>{
        if(isOpen){
            steIsOpen(false)
        }
    }
    const handlOnClickItemName = (name) => {
        setSale(name)
        steIsOpen(false)
    }
    const [id, setId] = useState(0)
    const [email, setEmail] = useState({
        email: JSON.parse(localStorage.getItem('login')).user
    })
    useEffect(() => {
        loadUser()
    }, [])
    const loadUser = () => {
        fetch('http://localhost:8080/user/byemail', {
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
        }, 3000);
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
        saleUserId: 0,
        user: {
            id: 0
        }

    })
    const onEventChange = (e) => {
        const { name, value } = e.target
        setSaleDetail(prevSale => ({
            ...prevSale,
            [name]: value,
            saleUserId: id,
            itemName:sale
        }));

    }
    const handleOnSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:8080/sales/addSale', {
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
                    user: {
                        id: 0
                    }
                })
                upStatus();
                // window.location.reload()
            } else {
                failStatus();
            }
        })
    }

    return (
        <div>
            <div><h1 className='flex justify-center text-3xl font-bold  text-green-600'>Sale Entry</h1></div>
            <div className='gridstyle grid grid-cols-4'>
                <LeftSidbar addSale="bold" />
                <div className='border border-gray-100 justify-center col-span-2' onClick={handleOnClicks}>
                    <form className="space-y-6 px-40 py-2" onSubmit={(e) => handleOnSubmit(e)}>
                        <div>
                            <label htmlFor="Item Name" className="block text-sm font-medium leading-6 text-gray-900">Enter Customer's name</label>
                            <input value={saleDetail.customerName} onChange={(e) => onEventChange(e)} id="itemName" name="customerName" type="text" required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

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
                                <div className="dropdown absolute bg-gray-100" style={{ width: 438 }}>

                                <ul>
                                    {isOpen && itemNames.map((item, index) => (
                                        item.itemName.toLowerCase().includes(sale ? sale.toLowerCase() : '') ? <li key={index} className='list-none border border-x-2  flex justify-center hover:bg-blue-200' onClick={() => handlOnClickItemName(item.itemName)}>
                                            {item.itemName}
                                        </li> : ''
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
                        <div className='fixed flex items-center ml-40 font-bold text-5xl text-green-600'>{uploadStatus}</div>
                        <datalist name="itemList" id="customerList" >
                            <option name="customer1" id="item1">customer1</option>
                            <option name="customer2" id="item2">customer2</option>
                            <option name="customer3" id="item3">customer3</option>
                        </datalist>
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
                    </form>

                </div>
                <div className='border border-gray-100 justify-center'>
                    <RightSidebar />
                </div>
            </div>
        </div>
    )
}

export default AddSale
