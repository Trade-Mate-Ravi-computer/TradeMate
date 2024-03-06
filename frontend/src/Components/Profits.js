import React, { useEffect, useState } from 'react';
import LeftSidbar from './LeftSidbar';
import RightSidebar from './RightSidebar';
import axios from 'axios';
import ProfitCard from './ProfitCard';
import { NavLink } from 'react-router-dom';

function Profits() {
    const [profitData, setProfitData] = useState({});
    const [yearlyData, setYearlyData] = useState({});
    const [allReport, setAllReport] = useState({});
    const todayDate = new Date();
    const currentMonth = todayDate.getMonth() + 1;
    const currentYear = todayDate.getFullYear();
    const currentDate = todayDate.getDate();
    const [dateState, setDateState] = useState({
        year: currentYear,
        month: currentMonth,
        day: currentDate,
        companyName: JSON.parse(localStorage.getItem('companyName')).companyName,
        email:JSON.parse(localStorage.getItem('login')).user
    });

    const monthInLetter = changeNumberToMonth(currentMonth);
    function changeNumberToMonth(currentMonth) {
        let month = "";
        switch (currentMonth) {
            case 0:
                month = "January";
                break;
            case 1:
                month = "February";
                break;
            case 2:
                month = "January";
                break;
            case 3:
                month = "March";
                break;
            case 4:
                month = "April";
                break;
            case 5:
                month = "May";
                break;
            case 6:
                month = "June";
                break;
            case 7:
                month = "July";
                break;
            case 8:
                month = "August";
                break;
            case 9:
                month = "September";
                break;
            case 10:
                month = "October";
                break;
            case 11:
                month = "November";
                break;
            case 12:
                month = "December";
                break;
            default:
                month = null;
        }
        return month;
    }

    useEffect(() => {
        loadData();
        loadYearData();
        loadAllReport();
    }, []);

    const loadData = async () => {
        try {
            const profits = await axios.post(
                `https://tradematebackend-production.up.railway.app/sales/profit`,
                dateState,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
                    }
                }
            );
            setProfitData(profits.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const loadYearData = async () => {
        try {
            const response = await axios.post(
                `https://tradematebackend-production.up.railway.app/sales/byyear`,
                dateState,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
                    }
                }
            );
            setYearlyData(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const loadAllReport = async () => {
        try {
            const response = await axios.post(
                'https://tradematebackend-production.up.railway.app/sales/totalsum',
                dateState,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
                    }
                }
            );
            setAllReport(response.data);
        } catch (error) {
            console.log("Something went wrong");
        }
    }

    return (
        <div>
            <div className='m-3 '><NavLink to={`/dashboard/${JSON.parse(localStorage.getItem('companyName')).companyName}`} className=" hover:bg-blue-400 hover:text-black rounded-md sm:hidden flex px-3 py-2 text-sm font-medium bg-blue-800 text-white border border-gray-200 w-44  sm:w-10">{localStorage.getItem('login') ? "⇐ Company Dashboard" : "Home"}</NavLink></div>
        <div>
            <h1 className='flex justify-center text-3xl font-bold text-indigo-700'>Profits</h1>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-4 gap-4'>
        <div className="border border-gray-100 hidden sm:flex flex-col">
                    <LeftSidbar openaddcustomer="bold" />
                    <RightSidebar />
                </div>
            <div className='border border-indigo-900 rounded-lg p-4 col-span-3'>
                <div className='bg-indigo-700 text-white rounded-md text-center py-2'>{`${monthInLetter}, ${currentYear} Report`}</div>
                <div className='flex flex-wrap justify-center'>
                    <ProfitCard title={`Profit in ${monthInLetter}`} amount={profitData.sumOfProfit} />
                    <ProfitCard title={`Revenue in ${monthInLetter}`} amount={profitData.sumOfTotalAmmount} />
                    <ProfitCard title={`Remaining in ${monthInLetter}`} amount={profitData.sumOfRemaining} />
                </div>
                <div className='bg-indigo-700 text-white rounded-md text-center py-2 mt-4'>{`${currentYear} Report`}</div>
                <div className='flex flex-wrap justify-center'>
                    <ProfitCard title={`Profit in ${currentYear}`} amount={yearlyData.sumOfProfit} />
                    <ProfitCard title={`Revenue in ${currentYear}`} amount={yearlyData.sumOfTotalAmmount} />
                    <ProfitCard title={`Remaining in ${currentYear}`} amount={yearlyData.sumOfRemaining} />
                </div>
                <div className='bg-indigo-700 text-white rounded-md text-center py-2 mt-4'>All Time Report</div>
                <div className='flex flex-wrap justify-center'>
                    <ProfitCard title="Total Profit" amount={allReport.sumOfProfit} />
                    <ProfitCard title="Total Revenue" amount={allReport.sumOfTotalAmmount} />
                    <ProfitCard title="Total Remaining" amount={allReport.sumOfRemaining} />
                </div>
            </div>
        </div>
    </div>
    
    )
}

export default Profits;
