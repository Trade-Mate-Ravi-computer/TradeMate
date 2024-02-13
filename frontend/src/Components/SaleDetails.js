import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

function SaleDetails() {
    const [saleDetails,setSaleDetails] = useState([])
    useEffect(()=>{
     loadUser();
    },[])
  const loadUser =async ()=>{
    const saleDetail= await axios.get("http://localhost:8080/sales/allsaledetails",{
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
          }
    });
    setSaleDetails(saleDetail.data.reverse())
    // console.log(saleDetail.data.reverse())
  } 
  const deleteOnClick=async (id,e)=>{
    e.preventDefault()
    const confirm = window.confirm("Are you Sure to Delete")
    console.log(confirm)
    if(confirm){
        await axios.delete(`http://localhost:8080/sales/delete/${id}`,{
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
              }
        })
    }
    loadUser()
  }
  const viewSale=(id)=>{
console.log("clicked on :-",id)
  }
  return (
    <div className=' px-10'>
     

<div className="">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
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
        {saleDetails.reverse().map((saleDetail,index)=>(
            <tbody key = {saleDetail.id} className='border border-x-2 my-10 cursor-pointer'>
            <tr className="border-b border-gray-200 dark:border-gray-700">

                <th scope="row" className={` px-6 py-4 font-medium ${saleDetail.remaining>0?'text-white':'text-green-600'} ${saleDetail.remaining>0?'bg-red-600':'bg-white'} text-center`}>
                   {saleDetail.customerName.length>25?saleDetail.customerName.slice(0,22)+"...":saleDetail.customerName}
                </th>
                <td className={` px-6 py-4 font-medium ${saleDetail.remaining>0?'text-white':'text-green-600'} ${saleDetail.remaining>0?'bg-red-600':'bg-white'} text-center`}>
                    {saleDetail.item.itemName.length>19?saleDetail.item.itemName.slice(0,16)+"...":saleDetail.item.itemName}
                </td>
                <td className={` px-6 py-4 font-medium ${saleDetail.remaining>0?'text-white':'text-green-600'} ${saleDetail.remaining>0?'bg-red-600':'bg-white'} text-center`}>
                    {saleDetail.quantity}
                </td>
                <td className={` px-6 py-4 font-medium ${saleDetail.remaining>0?'text-white':'text-green-600'} ${saleDetail.remaining>0?'bg-red-600':'bg-white'} text-center `}>
                    {saleDetail.totalAmmount}
                </td>
                <td className={` px-6 py-4 font-medium ${saleDetail.remaining>0?'text-white':'text-green-600'} ${saleDetail.remaining>0?'bg-red-600':'bg-white'} text-center`}>
                   {saleDetail.receivedAmmount}
                </td>
                <td className={` px-6 py-4 font-medium ${saleDetail.remaining>0?'text-white':'text-green-600'} ${saleDetail.remaining>0?'bg-red-600':'bg-white'} text-center`}>
                    {saleDetail.date}
                </td>
                <td className={` px-6 py-4 font-medium ${saleDetail.remaining>0?'text-white':'text-green-600'} ${saleDetail.remaining>0?'bg-red-600':'bg-white'} text-center`}>
                    {saleDetail.remaining}
                </td>
              
                <td className={` px-6 py-4 font-medium ${saleDetail.remaining>0?'text-white':'text-green-600'} ${saleDetail.remaining>0?'bg-red-600':'bg-white'} text-center`}>
                    <NavLink className='border border-x-2 py-2 px-4 rounded-xl bg-red-300 hover:bg-green-600 hover:text-white transition-all' to={`/updatesale/${saleDetail.id}`}>Received</NavLink>
                    <NavLink onClick={(e)=>deleteOnClick(saleDetail.id,e)} className='border border-x-2 py-2 px-4 rounded-xl m-1 bg-red-300 hover:bg-green-600 hover:text-white transition-all'>Delete</NavLink>
                    <NavLink  className='border border-x-2 py-2 px-4 rounded-xl  bg-red-300 hover:bg-green-600 hover:text-white transition-all' to={`/invoice/${saleDetail.id}`}>Invoice</NavLink>
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
