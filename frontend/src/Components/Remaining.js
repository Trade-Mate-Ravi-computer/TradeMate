import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, json } from 'react-router-dom';
import RightSidebar from './RightSidebar';
import LeftSidbar from './LeftSidbar';

function Remaining() {
    const [saleDetails, setSaleDetails] = useState([])
    const [shortData, setShortData] = useState('')
    useEffect(() => {
        loadSaleDetails();
    }, [])
    const loadSaleDetails = async () => {
        const saleDetail = await axios.get("http://localhost:8080/sales/allsaledetails", {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
            }
        });
        setSaleDetails(saleDetail.data.reverse())

        // console.log(saleDetail.data.reverse())
    }
    const deleteOnClick = async (id, e) => {
        e.preventDefault()
        const confirm = window.confirm("Are you Sure to Delete")
        console.log(confirm)
        if (confirm) {
            await axios.delete(`http://localhost:8080/sales/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
                }
            })
        }
        loadSaleDetails()
    }
    const viewSale = (id) => {
        console.log("clicked on :-", id)
    }
    const shortEvent = (e) => {
        setShortData(e.target.value)
    }
    return (
        <div>
            <div className='w-full font-bold text-3xl text-green-600 underline text-center'>Remaing Details</div>
            <div className="short w-full  h-10 flex justify-end pr-10">
                <div>
                    <span className='mr-4 font-semibold text-md'>Search By Name</span>
                    <input type='text' className='border border-gray-600 rounded-md m-1 p-1' placeholder='Enter Customer Name' value={shortData} onChange={(e) => shortEvent(e)}></input>
                </div>
                {/* <div>
                            <span className='mr-4 font-semibold text-md'>Search By Date</span>
                            <input type='text' className='border border-gray-600 rounded-md m-1 p-1' placeholder='Enter Customer Name' value={shortData} onChange={(e) => shortEvent(e)}></input>
                        </div> */}
            </div>

            <div style={{height:521}} className="col-span-3 overflow-y-auto">

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">

                    <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 sticky z-10 top-0">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-white bg-gray-400 text-center">
                                Customer Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-gray-400 text-center">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-gray-400 text-center">
                                Total Ammount
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-gray-400 text-center">
                                Received Ammount                </th>
                            <th scope="col" className="px-6 py-3 text-white bg-gray-400 text-center">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-gray-400 text-center">
                                Remaining
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-gray-400  text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className='border border-x-2 my-10 cursor-pointer '>
                        {(() => {
                            const items = []
                            for (let i = saleDetails.length - 1; i >= 0; i--) {
                                items.push(saleDetails[i].remaining > 0 ? shortData ? !saleDetails[i].customerName.toLowerCase().includes(shortData.toLowerCase()) ? '' :
                                    <tr className="border-b border-gray-200 dark:border-gray-700">

                                        <th scope="row" className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                            {saleDetails[i].customerName.length > 25 ? saleDetails[i].customerName.slice(0, 22) + "..." : saleDetails[i].customerName}
                                        </th>
                                        <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                            {saleDetails[i].itemName.length > 19 ? saleDetails[i].itemName.slice(0, 16) + "..." : saleDetails[i].itemName}
                                        </td>

                                        <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center `}>
                                            {saleDetails[i].totalAmmount}
                                        </td>
                                        <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                            {saleDetails[i].receivedAmmount}
                                        </td>
                                        <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                            {saleDetails[i].date.split('-')[2] + "/" + saleDetails[i].date.split('-')[1] + '/' + saleDetails[i].date.split('-')[0]}
                                        </td>
                                        <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                            {saleDetails[i].remaining}
                                        </td>

                                        <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                            <NavLink className='border border-x-2 py-2 px-4 rounded-xl bg-red-300 hover:bg-green-600 hover:text-white transition-all' to={`/updatesale/${saleDetails[i].id}`}>Received</NavLink>
                                            {/* <NavLink onClick={(e) => deleteOnClick(saleDetails[i].id, e)} className='border border-x-2 py-2 px-4 rounded-xl m-1 bg-red-300 hover:bg-green-600 hover:text-white transition-all'>Delete</NavLink> */}
                                            {/* <NavLink className='border border-x-2 py-2 px-4 rounded-xl  bg-red-300 hover:bg-green-600 hover:text-white transition-all' to={`/invoice/${saleDetails[i].id}`}>Invoice</NavLink> */}
                                        </td>
                                    </tr>


                                    :
                                    <tr className="border-b border-gray-200 dark:border-gray-700">

                                        <th scope="row" className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                            {saleDetails[i].customerName.length > 25 ? saleDetails[i].customerName.slice(0, 22) + "..." : saleDetails[i].customerName}
                                        </th>
                                        <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                            {saleDetails[i].itemName.length > 19 ? saleDetails[i].itemName.slice(0, 16) + "..." : saleDetails[i].itemName}
                                        </td>

                                        <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center `}>
                                            {saleDetails[i].totalAmmount}
                                        </td>
                                        <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                            {saleDetails[i].receivedAmmount}
                                        </td>
                                        <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                            {saleDetails[i].date.split('-')[2] + "/" + saleDetails[i].date.split('-')[1] + '/' + saleDetails[i].date.split('-')[0]}
                                        </td>
                                        <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                            {saleDetails[i].remaining}
                                        </td>

                                        <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                            <NavLink className='border border-x-2 py-2 px-4 rounded-xl bg-red-300 hover:bg-green-600 hover:text-white transition-all' to={`/updatesale/${saleDetails[i].id}`}>Received</NavLink>
                                            {/* <NavLink onClick={(e) => deleteOnClick(saleDetails[i].id, e)} className='border border-x-2 py-2 px-4 rounded-xl m-1 bg-red-300 hover:bg-green-600 hover:text-white transition-all'>Delete</NavLink>
                                        <NavLink className='border border-x-2 py-2 px-4 rounded-xl  bg-red-300 hover:bg-green-600 hover:text-white transition-all' to={`/invoice/${saleDetails[i].id}`}>Invoice</NavLink> */}
                                        </td>
                                    </tr>


                                    : ''
                                );



                            }
                            return items;
                        })()}
                    </tbody>
                </table>
            </div>


        </div>

    )
}

export default Remaining
