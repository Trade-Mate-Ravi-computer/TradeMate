import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import LeftSidbar from './LeftSidbar';
import RightSidebar from './RightSidebar';

function ProductLists() {
    const [productDetailss, setProductDetails] = useState([])
    useEffect(() => {
        loadProducts();
    }, [])
    const loadProducts = async () => {
        const productDetails = await axios.get("http://localhost:8080/stock/all", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
            }
        });
        setProductDetails(productDetails.data.reverse())
    }

    return (
        <div className=' px-10 '>
            <h1 className='flex justify-center m-6 text-green-600 text-3xl font-semibold'>Added Products List</h1>
<div className='gridstyle grid grid-cols-5'>
<LeftSidbar />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg col-span-3">
                <table className="text-sm">
                    <thead className="text-xs text-gray-700 uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-white bg-gray-400 ">
                                Sn. No.
                            </th>
                            <th scope="col" className="px-6  py-3 text-white bg-gray-400">
                                Item Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-gray-400">
                                Purchase Price
                            </th>
                            <th scope="col" className="px-6 py-3  text-white bg-gray-400">
                                Category
                            </th>

                            <th scope="col" className="px-6 py-3  text-white bg-gray-400 ">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    {productDetailss.reverse().map((productDetails, index) => (
                        <tbody key={index + 1} className='border border-x-2 my-10'>
                            <tr className="border border-gray-200 align-middle">
                                <td scope="row" className="border border-x-2 px-6 py-2 font-medium text-green-600 bg-white ">
                                    {index + 1}
                                </td>
                                <td scope="row" className="border w-80 text-wrap border-x-2 px-6 py-2 font-medium text-green-600 bg-white ">
                                    {productDetails.itemName.length>30?productDetails.itemName.slice(0,27)+"...":productDetails.itemName}
                                </td>
                                <td className="border border-x-2 px-6 py-2 font-medium text-green-600 bg-white ">
                                    {productDetails.purchasePrice}
                                </td>
                                <td className="border border-x-2 px-6 py-2 font-medium text-green-600 bg-white ">
                                    {productDetails.category}
                                </td>

                                <td className="border border-x-2 font-medium text-green-600 bg-white  flex justify-center items-center ">
                                    <NavLink className='border border-x-2 py-2 px-2 rounded-xl bg-red-300 hover:bg-green-600 hover:text-white transition-all' to={`/updateproduct/${productDetails.itemName}`}>Update Price</NavLink>
                                </td>
                            </tr>

                        </tbody>
                    ))}
                </table>
            </div>
            <RightSidebar/>
            </div>
        </div>
    )
}

export default ProductLists
