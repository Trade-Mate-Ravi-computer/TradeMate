import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

function SaleDetails() {
    const [saleDetails, setSaleDetails] = useState([])
    useEffect(() => {
        loadUser();
    }, [])
    const loadUser = async () => {
        const saleDetail = await axios.get("http://localhost:8080/sales/allsaledetails", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
            }
        });
        setSaleDetails(saleDetail.data.reverse())
    }
    const deleteOnClick = async (id, e) => {
        e.preventDefault()
        const confirm = window.confirm("Are you Sure to Delete")

        if (confirm) {
            await axios.delete(`http://localhost:8080/sales/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
                }
            })
            loadUser()
        }
    }
    return (
        <div className=' px-10'>

<h1 className='flex justify-center m-6 text-green-600 text-3xl font-semibold'>Sale Detail List</h1>
            <div className="relative overflow-x-auto p-1">
                <table className="">
                    <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-white bg-gray-400 ">
                                Sn. No.
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-gray-400">
                                Customer Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-gray-400">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3  text-white bg-gray-400">
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-gray-400">
                                Total Ammount
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-gray-400">
                                Received Ammount                </th>
                            <th scope="col" className="px-6 py-3 text-white bg-gray-400">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-gray-400">
                                Remaining
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-gray-400 flex justify-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    {saleDetails.reverse().map((saleDetail, index) => (
                        <tbody key={saleDetail.id} className='border border-x-2 my-10'>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className={`border border-x-2 px-6 py-4 text-3xl ${saleDetail.remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetail.remaining > 0 ? 'bg-red-600' : 'bg-white'} align-center`}>
                                    {index + 1}
                                </th>
                                <th scope="row" className={` px-6 py-4 w-44 text-3xl ${saleDetail.remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetail.remaining > 0 ? 'bg-red-600' : 'bg-white'} align-center`}>
                                    {saleDetail.customerName.length>13?saleDetail.customerName.slice(0,10)+"...":saleDetail.customerName}
                                </th>
                                <td className={` px-6 py-4 w-64 text-3xl ${saleDetail.remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetail.remaining > 0 ? 'bg-red-600' : 'bg-white'} align-center`}>
                                    {saleDetail.item.itemName.length>17?saleDetail.item.itemName.slice(0,10)+"...":saleDetail.item.itemName}
                                </td>
                                <td className={` px-6 py-4 text-3xl ${saleDetail.remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetail.remaining > 0 ? 'bg-red-600' : 'bg-white'} align-center`}>
                                    {saleDetail.quantity}
                                </td>
                                <td className={` px-6 py-4 text-3xl ${saleDetail.remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetail.remaining > 0 ? 'bg-red-600' : 'bg-white'} align-center `}>
                                    {saleDetail.totalAmmount}
                                </td>
                                <td className={` px-6 py-4 text-3xl ${saleDetail.remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetail.remaining > 0 ? 'bg-red-600' : 'bg-white'} align-center`}>
                                    {saleDetail.receivedAmmount}
                                </td>
                                <td className={` px-6 py-4 w-36 text-3xl ${saleDetail.remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetail.remaining > 0 ? 'bg-red-600' : 'bg-white'} align-center`}>
                                    {saleDetail.date}
                                </td>
                                <td className={` px-6 py-4 text-3xl ${saleDetail.remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetail.remaining > 0 ? 'bg-red-600' : 'bg-white'} align-center`}>
                                    {saleDetail.remaining}
                                </td>
                                <td className={`  py-4 text-3xl border border-s-2 ${saleDetail.remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetail.remaining > 0 ? 'bg-red-600' : 'bg-white'} align-center`}>
                                    <NavLink className='border border-x-2 py-2 px-4 rounded-xl bg-red-300 hover:bg-green-600 hover:text-white transition-all' to={`/updatesale/${saleDetail.id}`}>Received</NavLink>
                                    <NavLink onClick={(e) => deleteOnClick(saleDetail.id, e)} className='border border-x-2 py-2 px-4 rounded-xl m-1 bg-red-300 hover:bg-green-600 hover:text-white transition-all'>Delete</NavLink>
                                </td>
                            </tr>

                        </tbody>
                    ))}
                </table>
            </div>

        </div>
    )
}

export default SaleDetails
