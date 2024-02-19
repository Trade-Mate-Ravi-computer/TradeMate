import React, { useState } from 'react';
import axios from 'axios'
function CreateCOmpany(props) {
    const [formData, setFormData] = useState({
        companyName: '',
        companyAddress: '',
        gstIn: '',
        gstType: '',
        pinCode: '',
        mobile: '',
        email: '',
        user: {
            id: 0
        }
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            email: JSON.parse(localStorage.getItem('login')).user
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/company/add',
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
                }
            }).then((resp)=>{
                if(resp){
                    props.setUpdate(false)
                    props.myfunction();
                }
            })
      
    };

    return (
        <div className=" mx-auto  p-4 rounded-md ">
            <div className='w-full text-green-600 text-center text-xl font-bold'> Create Company</div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
             
                    <div>
                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
                        <input id="companyName" name="companyName" type="text" value={formData.companyName} onChange={handleChange} required className="mt-1 p-2 w-full  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block border border-black">
                        </input>
                    </div>
                    <div>
                        <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700">Company Address</label>
                        <input id="companyAddress" name="companyAddress" type="text" value={formData.companyAddress} onChange={handleChange} required className="mt-1 p-2 w-full  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block border border-black">
                        </input>
                    </div>
                

                <div>
                    <label htmlFor="gstIn" className="block text-sm font-medium text-gray-700">GSTIN</label>
                    <input id="gstIn" name="gstIn" type="text" value={formData.gstIn} onChange={handleChange} className="mt-1 p-2 w-full  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block border border-black">
                    </input>
                </div>
                <div>
                    <label htmlFor="gstType" className="block text-sm font-medium text-gray-700">GST Type</label>
                    <input id="gstType" name="gstType" type="text" value={formData.gstType} onChange={handleChange} className="mt-1 p-2 w-full  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block border border-black">
                    </input>
                </div>
                <div className='flex justify-around'>
                <div>
                    <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700">Pin Code</label>
                    <input id="pinCode" name="pinCode" type="number" value={formData.pinCode} onChange={handleChange} className="mt-1 p-2 w-full  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block border border-black">
                    </input>
                </div>
                <div className='ml-2'>
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
                    <input id="mobile" name="mobile" type="tel" value={formData.mobile} onChange={handleChange} className="mt-1 p-2 w-full  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block border border-black">
                    </input>
                </div>
                </div>
                <div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateCOmpany;
