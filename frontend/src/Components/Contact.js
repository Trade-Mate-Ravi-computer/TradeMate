import React, { useState } from 'react'
import emailjs from "@emailjs/browser";
function Contact() {
    const [contactInfo,setContactInfo]=useState({
        name:'',
        email:'',
        message:''
    })
    const handleOnChange=(e)=>{
setContactInfo({...contactInfo,
    [e.target.name]:e.target.value
})

    }
    const emailContent = {
        message: contactInfo.message,
        email:'tradematebusinessapp@gmail.com',
        name: contactInfo.name,
        custEmail:contactInfo.email
    }
    const sendMail = (e) => {
        e.preventDefault()
        // console.log("Submited Form")
        emailjs.send(
            'service_nssug1z',
            'template_h1253mb',
            emailContent,
            'gRnAhI6GS0Gzlw9Ec'
        ).then((result) => {
            if( result.text==="OK"){
document.getElementById('submitInfo').innerHTML=('Thank you For Asking we will connect to you quick')
setContactInfo({
    name:'',
    email:'',
    message:''
})
            }
        })
    }
    return (
        <div>
            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-20 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contact Us</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Ask your querry here we will reply you As soon as possible</p>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                                    <input type="text" value={contactInfo.name} onChange={(e)=>handleOnChange(e)} id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                    <input type="email" value={contactInfo.email} onChange={(e)=>handleOnChange(e)}  id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                                    <textarea id="message" value={contactInfo.message} onChange={(e)=>handleOnChange(e)}  name="message" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <button onClick={(e)=>sendMail(e)} className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>
                            </div>
                            <div id="submitInfo" className='w-full text-center text-xl font-bold text-green-600 m-4 '></div>
                        </div>
                    </div>
                </div>
            </section>
            
        </div>
    )
}

export default Contact
