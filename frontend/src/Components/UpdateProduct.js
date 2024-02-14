import React, { useState } from 'react'
import LeftSidbar from './LeftSidbar'
import RightSidebar from './RightSidebar'
import { useNavigate, useParams } from 'react-router-dom'

function UpdateProduct() {
    const navigate = useNavigate()
    const [newPrice, setNewPrice] = useState({
        purchasePrice: 0,
        itemName:''
    })
    const onEventChange = (e) => {
        setNewPrice({
            ...newPrice,
            [e.target.name]: e.target.value,
            itemName:id
        })
       
    }
    const {id} = useParams()
    // console.log(id)
    const handleOnSubmit = (e)=>{
        e.preventDefault()
    fetch(`http://localhost:8080/stock/updateStock`,{
        method:"PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${localStorage.getItem('login')?JSON.parse(localStorage.getItem('login')).token:""}`
          },
          body:JSON.stringify(newPrice)
    }).then((resp)=>{
        if(resp.ok){
navigate('/stocks')
        }
    })
    }
    return (
        <div>
            <div><h1 className='flex justify-center text-3xl font-bold  text-green-600'>New purchase Price of :-<span className='text-green-600'> {id}</span></h1></div>
            <div className='gridstyle grid grid-cols-4'>
                <LeftSidbar addSale="bold" />
                <div className='border border-gray-100 justify-center col-span-2'>
                    <form className="space-y-6 px-40 py-2" onSubmit={(e)=>handleOnSubmit(e)}>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Enter New Purchase Price  of :-<span className='text-blue-600'> {id}</span> </label>
                            </div>
                            <div className="mt-2">
                                <input value={newPrice.purchasePrice} onChange={(e) => onEventChange(e)} id="amount" name="purchasePrice" type="number" required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add New Price</button>
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

export default UpdateProduct
