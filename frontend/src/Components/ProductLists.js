import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import LeftSidbar from './LeftSidbar';
import RightSidebar from './RightSidebar';
import UpdateProduct from './UpdateProduct';
import crossImage from './cross.png';

function ProductLists() {
    const [productDetailss, setProductDetails] = useState([])
    const [shortData, setShortData] = useState('')
    const [update, setUpdate] = useState(false)
    const [itemName, setItemName] = useState('')
    const shortEvent = (e) => {
        setShortData(e.target.value)

    }
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
    const handleOnClickUpdate = (itemName) => {
        setUpdate(true)
        setItemName(itemName)

    }
    const handleOnclickBody = () => {
        setUpdate(false)
        loadProducts()
    }
    return (
<div className='grid grid-cols-4 pt-10'>      
<div className='pt-10'><LeftSidbar/></div>
      <div className='flex justify-center flex-col col-span-2'>
            <div className="short w-full  h-10 text-right">
                    <span className='mr-4 font-semibold text-md'>Search By Name</span>
                    <input type='text' className='border border-gray-600 rounded-md m-1 mr-6 p-1' placeholder='Enter Product Name' value={shortData} onChange={(e) => shortEvent(e)}></input>
                </div>
           

                {update ? <div className='w-full flex justify-center '>
                    <div className='fixed h-80 p-10 bg-gray-50 rounded-lg mt-24  shadow-2xl' id='updateProduct'>
                        <div className='w-full h-10 text-right'> <button className='h-6 w-6 m-2 transition-all hover:h-8 hover:w-8 hover:m-1' onClick={handleOnclickBody}><img src={crossImage} alt="" /></button></div>
                        <UpdateProduct itemName={`${itemName}`} />
                    </div>
                </div> : ''}
                
                <div style={{ height: 516 }} id="toblur" className=' overflow-y-auto '>
                    <table className="text-sm ">
                        <thead className="text-xs text-gray-700 uppercase z-10 sticky top-0">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center w-3 text-white bg-gray-400 ">
                                    Sn. No.
                                </th>
                                <th scope="col" className="px-6  py-3 text-center  text-white bg-gray-400">
                                    Item Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-center text-white bg-gray-400">
                                    Purchase Price
                                </th>
                                <th scope="col" className="px-6 py-3 text-center  text-white bg-gray-400">
                                    Category
                                </th>

                                <th scope="col" className="px-6 py-3 text-center  text-white bg-gray-400 ">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        {productDetailss.reverse().map((productDetails, index) => (
                            shortData ? !productDetails.itemName.toLowerCase().includes(shortData.toLowerCase()) ? '' : <tbody key={index + 1} className='border border-x-2 my-10'>
                                <tr className="border border-gray-200 align-middle">
                                    <td scope="row" className="border w-3 text-center border-x-2 px-6 py-2 font-medium text-green-600 bg-white ">
                                        {index + 1}
                                    </td>
                                    <td scope="row" className="border w-80 text-center text-wrap border-x-2 px-6 py-2 font-medium text-green-600 bg-white ">
                                        {productDetails.itemName.length > 30 ? productDetails.itemName.slice(0, 27) + "..." : productDetails.itemName}
                                    </td>
                                    <td className="border border-x-2 px-6 py-2 text-center font-medium text-green-600 bg-white ">
                                        {productDetails.purchasePrice}
                                    </td>
                                    <td className="border border-x-2 px-6 py-2 text-center font-medium text-green-600 bg-white ">
                                        {productDetails.category}
                                    </td>

                                    <td className="border border-x-2 font-medium text-center text-green-600 bg-white  flex justify-center items-center ">
                                        <NavLink className='border border-x-2 py-2 px-2 rounded-xl bg-red-300 hover:bg-green-600 hover:text-white transition-all' onClick={() => handleOnClickUpdate(productDetails.itemName)} >Update Price</NavLink>
                                    </td>
                                </tr>

                            </tbody> : <tbody key={index + 1} className='border border-x-2 my-10'>
                                <tr className="border border-gray-200 align-middle">
                                    <td scope="row" className="border text-center  border-x-2 px-6 py-2 font-medium text-green-600 bg-white ">
                                        {index + 1}
                                    </td>
                                    <td scope="row" className="border w-80 text-center text-wrap border-x-2 px-6 py-2 font-medium text-green-600 bg-white ">
                                        {productDetails.itemName.length > 30 ? productDetails.itemName.slice(0, 27) + "..." : productDetails.itemName}
                                    </td>
                                    <td className="border border-x-2 px-6 py-2 text-center font-medium text-green-600 bg-white ">
                                        {productDetails.purchasePrice}
                                    </td>
                                    <td className="border border-x-2 px-6 py-2 text-center font-medium text-green-600 bg-white ">
                                        {productDetails.category}
                                    </td>

                                    <td className="border border-x-2 font-medium text-center text-green-600 bg-white  flex justify-center items-center ">
                                        <NavLink className='border border-x-2 py-2 px-2 rounded-xl bg-red-300 hover:bg-green-600 hover:text-white transition-all' onClick={() => handleOnClickUpdate(productDetails.itemName)} >Update Price</NavLink>
                                    </td>
                                </tr>

                            </tbody>
                        ))}
                    </table>
                </div>
            

        </div>
        <div className='pt-10'><RightSidebar/></div>
        </div>


    )
}

export default ProductLists
