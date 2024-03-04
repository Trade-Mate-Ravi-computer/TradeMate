import React, { useEffect } from 'react';
import Navigationbuttons from './Navigationbuttons';
import LeftSidbar from './LeftSidbar';
import RightSidebar from './RightSidebar';
import Home from './Home';
import LoginSuggetion from './LoginSuggetion';
import axios from 'axios';

function Dashboard() {
    let store = JSON.parse(localStorage.getItem('login'));
    useEffect(() => {
        loadProducts();
        loadCustomers();
        loadSeller();
    }, []);
    const loadProducts = async () => {
        const productDetails = await axios.post(
            "https://tradematebackend-production.up.railway.app/stock/all",
            { companyName: JSON.parse(localStorage.getItem('companyName')).companyName },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
                }
            }
        );
        localStorage.setItem('saleDetails', JSON.stringify(productDetails.data));
    };
    const loadCustomers = async () => {
        const customers = await axios.get(
            "https://tradematebackend-production.up.railway.app/customer/all",
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
                }
            }
        );
        localStorage.setItem('customers', JSON.stringify(customers.data));
    };
    const loadSeller = async () => {
        const sellers = await axios.get(
            "https://tradematebackend-production.up.railway.app/seller/all",
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
                }
            }
        );
        localStorage.setItem('sellers', JSON.stringify(sellers.data));
    };
    return (
        <div className="bg-white sm:h-[37.2rem] h-[70rem]">
            {store && store.login ? (
                <div>
                    <div className="mb-4 flex  justify-center items-center bg-gradient-to-r from-sky-400 to-violet-500 text-white font-semibold rounded-lg p-4 shadow-md">
                        <h1 className="text-3xl">Welcome to</h1>
                        <div className="text-white bg-blue-900 px-3 py-1 ml-4 rounded-md">
                            <span className="text-lg">{`${JSON.parse(localStorage.getItem('companyName')).companyName}`}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4">
                        <div className="sm:col-span-1 border border-blue-100 mb-2">
                        <LeftSidbar opendash="bold" />
                            <RightSidebar />
                         
                        </div>

                        <div className="sm:col-span-3 ml-6 sm:ml-0 sm:border border-blue-100 sticky pr-6">
                            <Navigationbuttons />
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
