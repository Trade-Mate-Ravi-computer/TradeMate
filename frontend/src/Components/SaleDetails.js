import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, json } from 'react-router-dom';

function SaleDetails() {
    const [saleDetails, setSaleDetails] = useState([])
    const [shortData, setShortData] = useState('')
    function changeNumberToMonth(currentMonth) {
        let month = ""
        switch (currentMonth) {
            case 1:
                month = "Jan"
                break;
            case 2:
                month = "Feb"
                break;
            case 3:
                month = "Mar"
                break;
            case 4:
                month = "Apr"
                break;
            case 5:
                month = "May"
                break;
            case 6:
                month = "June"
                break;
            case 7:
                month = "July"
                break;
            case 8:
                month = "Aug"
                break;
            case 9:
                month = "Sep"
                break;
            case 10:
                month = "Oct"
                break;
            case 11:
                month = "Nov"
                break;
            case 12:
                month = "Dec"
                break;
            default:
                month = null
        }
        return month;
    }
    useEffect(() => {
        loadSaleDetails();
    }, [])
    const loadSaleDetails = async () => {
        const saleDetail = await axios.get("http://localhost:8080/sales/allsaledetails", {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
            }
        });
        setSaleDetails(saleDetail.data)

        // console.log(saleDetails[i].data.reverse())
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
        <div className=' px-10'>


            <div className="">
                <div className="short w-full  h-10 text-right">
                    <span className='mr-4 font-semibold text-md'>Search By Name</span>
                    <input type='text' className='border border-gray-600 rounded-md m-1 p-1' placeholder='Enter Customer Name' value={shortData} onChange={(e) => shortEvent(e)}></input>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                    <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-white bg-gray-400 text-center">
                                Sr.no
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-gray-400 text-center">
                                Customer Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-gray-400 text-center">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3  text-white bg-gray-400 text-center">
                                Quantity
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
                    {(() => {
                        const items = []
                        let j = 0
                        for (let i = saleDetails.length - 1; i >= 0; i--) {
                            items.push(shortData ? !saleDetails[i].customerName.toLowerCase().includes(shortData.toLowerCase()) ? '' : <tbody key={saleDetails[i].id} className='border border-x-2 my-10 cursor-pointer'>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th scope="row" className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                        {j + 1}
                                    </th>
                                    <th scope="row" className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                        {saleDetails[i].customerName.length > 25 ? saleDetails[i].customerName.slice(0, 22) + "..." : saleDetails[i].customerName}
                                    </th>
                                    <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                        {saleDetails[i].itemName.length > 19 ? saleDetails[i].itemName.slice(0, 16) + "..." : saleDetails[i].itemName}
                                    </td>
                                    <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                        {saleDetails[i].quantity}
                                    </td>
                                    <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center `}>
                                        {saleDetails[i].totalAmmount}
                                    </td>
                                    <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                        {saleDetails[i].receivedAmmount}
                                    </td>
                                    <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                        {saleDetails[i].date.split('-')[2] + "/" + changeNumberToMonth(parseInt( saleDetails[i].date.split('-')[1])) + '/' + saleDetails[i].date.split('-')[0]}
                                    </td>
                                    <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                        {saleDetails[i].remaining}
                                    </td>

                                    <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                        <NavLink className='border border-x-2 py-2 px-4 rounded-xl bg-red-300 hover:bg-green-600 hover:text-white transition-all' to={`/updatesale/${saleDetails[i].id}`}>Received</NavLink>
                                        <NavLink onClick={(e) => deleteOnClick(saleDetails[i].id, e)} className='border border-x-2 py-2 px-4 rounded-xl m-1 bg-red-300 hover:bg-green-600 hover:text-white transition-all'>Delete</NavLink>
                                        <NavLink className='border border-x-2 py-2 px-4 rounded-xl  bg-red-300 hover:bg-green-600 hover:text-white transition-all' to={`/invoice/${saleDetails[i].id}`}>Invoice</NavLink>
                                    </td>
                                </tr>


                            </tbody> : <tbody key={saleDetails[i].id} className='border border-x-2 my-10 cursor-pointer'>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th scope="row" className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                        {j + 1}
                                    </th>
                                    <th scope="row" className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                        {saleDetails[i].customerName.length > 25 ? saleDetails[i].customerName.slice(0, 22) + "..." : saleDetails[i].customerName}
                                    </th>
                                    <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                        {saleDetails[i].itemName.length > 19 ? saleDetails[i].itemName.slice(0, 16) + "..." : saleDetails[i].itemName}
                                    </td>
                                    <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                        {saleDetails[i].quantity}
                                    </td>
                                    <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center `}>
                                        {saleDetails[i].totalAmmount}
                                    </td>
                                    <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                        {saleDetails[i].receivedAmmount}
                                    </td>
                                    <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                        {saleDetails[i].date.split('-')[2] + "/" +changeNumberToMonth(parseInt( saleDetails[i].date.split('-')[1])) + '/' + saleDetails[i].date.split('-')[0]}
                                    </td>
                                    <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                        {saleDetails[i].remaining}
                                    </td>

                                    <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                        <NavLink className='border border-x-2 py-2 px-4 rounded-xl bg-red-300 hover:bg-green-600 hover:text-white transition-all' to={`/updatesale/${saleDetails[i].id}`}>Received</NavLink>
                                        <NavLink onClick={(e) => deleteOnClick(saleDetails[i].id, e)} className='border border-x-2 py-2 px-4 rounded-xl m-1 bg-red-300 hover:bg-green-600 hover:text-white transition-all'>Delete</NavLink>
                                        <NavLink className='border border-x-2 py-2 px-4 rounded-xl  bg-red-300 hover:bg-green-600 hover:text-white transition-all' to={`/invoice/${saleDetails[i].id}`}>Invoice</NavLink>
                                    </td>
                                </tr>


                            </tbody>
                            );

                            j++

                        }
                        return items;
                    })()}

                </table>
            </div>

        </div>
    )
}

export default SaleDetails
