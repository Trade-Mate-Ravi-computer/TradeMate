import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import html2pdf from 'html2pdf.js';


function Invoice() {
    const [invoiceDetails, setInvoiceDetails] = useState([])
    const [address, setAddress] = useState('')
    const [custName, setCustName] = useState('')
    const [subTotal, setSubTotal] = useState(0)
    const [date, setDate] = useState(null)
    const { id } = useParams()
    useEffect(() => {
        loadInvoiceDetails()
    }, [])
    const loadInvoiceDetails = async () => {
        const invoiceDetail = await axios.post(`http://localhost:8080/sales/byid/${id}`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
                }
            }
        )
        setInvoiceDetails(invoiceDetail.data);
        setDate(invoiceDetail.data[0].date)
        setCustName(invoiceDetail.data[0].customerName)
        let sum = 0
        invoiceDetail.data.map((item, index) => {
            sum += item.totalAmmount
        })
        //    console.log(sum)
        setSubTotal(sum)
    }
    const handleOnChange = (e) => {
        setAddress(e.target.value)
    }
    const handleGeneratePDF = () => {
        const element = document.getElementById('invoice');

        // Specify custom options for PDF generation
        const options = {
            margin: 10,
            filename: `${custName + date}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a5', orientation: 'portrait' }
        };

        // Generate PDF with custom options
        html2pdf()
            .from(element)
            .set(options)
            .save();
    };




    return (
        <div className='grid grid-cols-4'>
            <div className="saleList pl-2">
                this is list of sales {id}
            </div>
            <div className="col-span-3 px-3">
                <div className="text-center w-full">Invoice of <span className='text-green-600 font-semibold'>{` ${custName}`} </span>on Date <span className='text-green-600 font-semibold'>{` ${date ? date.split('-')[2] + "/" + date.split('-')[1] + "/" + date.split('-')[0] : null}`}</span></div>
                <div id='invoice' className="container mx-auto px-4 py-8">

                    {/* <!-- Seller and Customer Details --> */}
                    <div className="flex justify-between mb-8">
                        <div>
                            <h1 className="text-xl font-bold">Seller:</h1>
                            <p className="text-gray-600">Ravi Computer</p>
                            <p className="text-gray-600">Varanasi Road, Chandwak, Jaunpur,uttar pradesh, 222-129</p>
                            <p className="text-gray-600">Mob: 7007826508</p>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold ">Customer:</h1>
                            <div>{custName}</div>
                            <p className="text-xl font-bold mb-1">Address:</p>
                            <textarea value={address} onChange={(e) => handleOnChange(e)} className="w-full h-12 flex-wrap flex bg-white border border-gray-200 p-2 rounded-md resize-none focus:outline-none"
                                placeholder="Enter address..."></textarea>

                        </div>
                    </div>

                    {/* <!-- Invoice Header --> */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-xl font-bold">Invoice</h1>
                            <p className="text-gray-600">Varanasi Road, Chandwak, Jaunpur,uttar pradesh, 222-129</p>
                            <p className="text-gray-600">Mob: 7007826508</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Invoice: RC-{id} </p>
                            <p className="text-gray-600">{date ? date.split('-')[2] + "/" + date.split('-')[1] + "/" + date.split('-')[0] : null}</p>
                        </div>
                    </div>

                    {/* <!-- Table Section --> */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="py-2 px-4 border border-gray-300 text-center">Item</th>
                                    <th className="py-2 px-4 border border-gray-300 text-center">Description</th>
                                    <th className="py-2 px-4 border border-gray-300 text-center">Quantity</th>
                                    <th className="py-2 px-4 border border-gray-300 text-center">Price</th>
                                    <th className="py-2 px-4 border border-gray-300 text-center">Total</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {invoiceDetails.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className="py-2 px-4 border border-gray-300 text-center">{index + 1}</td>
                                        <td className="py-2 px-4 border border-gray-300 text-center">{item.item.itemName}</td>
                                        <td className="py-2 px-4 border border-gray-300 text-center">{item.quantity}</td>
                                        <td className="py-2 px-4 border border-gray-300 text-center">{item.rate}</td>
                                        <td className="py-2 px-4 border border-gray-300 text-center">{item.quantity * item.rate}</td>
                                    </tr>
                                ))
                                }
                            </tbody>


                        </table>
                    </div>

                    {/* <!-- Invoice Footer --> */}
                    <div className="mt-8">
                        {/* <p className="text-gray-600">Subtotal: Rs. {subTotal}</p> */}
                        <p className="text-gray-900 font-bold text-xl">Total:Rs. {subTotal}</p>
                    </div>
                    <div className='flex justify-between'>
                        <div className='ml-6'>
                            <div className='mt-10 ml-2'>Stump :-</div>
                            <div className="box h-16 w-40 border border-gray-300 mt-1 rounded-lg"></div>
                        </div>
                        <div className='mr-6'>
                            <div className='mt-10 ml-2'>Signature :-</div>
                            <div className="box h-16 w-40 border border-gray-300 mt-1 rounded-lg"></div>
                        </div>
                    </div>
                    <div className="msg w-full font-semibold tetx-gray-400 text-center">Thank For Shopping With Ravi Computer</div>
                </div>
                <div className="text-center w-full ">  <button className='border border-x-2 bg-green-300 rounded-lg p-2 font-semibold hover:bg-green-600 hover:shadow-lg hover:text-white transition-all ' onClick={(e) => handleGeneratePDF(e)}>Download Invoice in PDF</button></div>
            </div>

        </div>
    )
}

export default Invoice
