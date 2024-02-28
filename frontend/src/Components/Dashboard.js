import React, { useEffect } from 'react';
import Navigationbuttons from './Navigationbuttons';
import LeftSidbar from './LeftSidbar';
import RightSidebar from './RightSidebar';
import Home from './Home';
import LoginSuggetion from './LoginSuggetion';
import axios from 'axios'

function Dashboard() {
    let store = JSON.parse(localStorage.getItem('login'));
    useEffect(() => {
        loadProducts()
    }, [])
    const loadProducts = async () => {
        const productDetails = await axios.post("https://tradematebackend-production.up.railway.app/stock/all",
            { companyName: JSON.parse(localStorage.getItem('companyName')).companyName },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
                }
            });
        localStorage.setItem('saleDetails', JSON.stringify(productDetails.data))
    }

    return (
        <div style={{ minHeight: 596 }} className="bg-white">
            {store && store.login ? (
                <div>
                    <div className="mb-4 flex justify-center items-center bg-gradient-to-r from-sky-400 to-violet-500 text-white font-semibold rounded-lg p-4 shadow-md">
                        <h1 className="text-3xl">Welcome to</h1>
                        <div className="text-white bg-blue-900 px-3 py-1 ml-4 rounded-md">
                            <span className="text-lg">{`${JSON.parse(localStorage.getItem('companyName')).companyName}`}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-4">
                        <LeftSidbar opendash="bold" />
                        <div className="col-span-2 border border-blue-100 sticky">
                            <Navigationbuttons />
                            <div className='flex justify-center w-full flex-col'> 
         <div className='ml-28'>  <div className='text-lg font-bold text-green-600' >Know about new Update wath this video</div>
           <iframe width="560" height="315" src="https://www.youtube.com/embed/RH7vP32MosM?si=BevX36tvAumxX2YC" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> </div>
         </div>
                        </div>
                        <div className="border border-blue-100">
                            <RightSidebar />
                        </div>
                    </div>
                </div>
            ) : (
                <LoginSuggetion />
            )}

          
        </div>
    );
}

export default Dashboard;
