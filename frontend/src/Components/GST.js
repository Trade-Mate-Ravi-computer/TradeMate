import React, { useEffect, useState } from 'react'
import axios from 'axios'

function GST() {
    const currentDate = new Date();
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1)
    const currentYear = currentDate.getFullYear()
    const [year, setYear] = useState(currentYear)
    const [quartSum, setQuartSum] = useState(0)
    const [mmonthSum, setMonthSum] = useState(0)
    const [companyDetails, setCompanyDetails] = useState({});
    const [month, setMonth] = useState(currentMonth)
    const [regMonth, setRegMonth] = useState(currentMonth)
    const [minYear, setMinYear] = useState(0)

    // console.log(currentYear)
    useEffect(() => {
        loadSumOfQuart()
        loadSumOfMonth()
        loadCompanyDetail()
        loadMinYear()
    }, [])
    const loadMinYear = async () => {
        try {
            const minYearValue = await axios.get(`tradematebackend-production.up.railway.app/sales/date/${JSON.parse(localStorage.getItem('companyName')).companyName}`,
                {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
                    }
                })
            setMinYear(parseInt(minYearValue.data.split('-')[0]))
            // console.log(minYearValue.data.split('-')[0],typeof(parseInt(minYearValue.data.split('-')[0])))
        } catch (e) {
            console.log("Some error Occurs")
        }
    }

    function quaterMonthFInder(month, currentYear) {
        if (6 >= month && month >= 4) {
            return {
                month1: 4,
                month2: 5,
                month3: 6,
                year: parseInt(year),
                companyName: JSON.parse(localStorage.getItem('companyName')).companyName
            }
        } else if (9 >= month && month >= 7) {
            return {
                month1: 7,
                month2: 8,
                month3: 9,
                year: parseInt(year),
                companyName: JSON.parse(localStorage.getItem('companyName')).companyName
            }
        } else if (12 >= month && month >= 10) {
            return {
                month1: 10,
                month2: 11,
                month3: 12,
                year: parseInt(year),
                companyName: JSON.parse(localStorage.getItem('companyName')).companyName
            }
        } else if (3 >= month && month >= 1) {
            return {
                month1: 1,
                month2: 2,
                month3: 3,
                year: parseInt(year),
                companyName: JSON.parse(localStorage.getItem('companyName')).companyName
            }
        }

    }
    const loadCompanyDetail = async () => {
        const companyDetail = await axios.post(`tradematebackend-production.up.railway.app/company/byname/${JSON.parse(localStorage.getItem('companyName')).companyName}`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
                }
            }

        )
        setCompanyDetails(companyDetail.data)
    }
    const loadSumOfQuart = async () => {
        try {
            const sumofQuart = await axios.post('tradematebackend-production.up.railway.app/sales/quart',
                quaterMonthFInder(month, year),
                {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
                    }
                }

            )
            setQuartSum(sumofQuart.data)
            document.getElementById('compositionGst').innerHTML =`Rs. ${sumofQuart.data*1/100}`
        }
        catch (e) {
            if (document.getElementById('compositionGst')) {
                document.getElementById('compositionGst').innerHTML = "Choose Correct Quarter for Choosen Year"
                console.log(quaterMonthFInder(month, year))
            }
        }
    }

    const loadSumOfMonth = async () => {
        try {
            const sumofMonth = await axios.post('tradematebackend-production.up.railway.app/sales/monthsum',
                {
                    month: regMonth,
                    year: parseInt(year),
                    companyName: JSON.parse(localStorage.getItem('companyName')).companyName
                },
                {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
                    }
                }

            )
            setMonthSum(sumofMonth.data)
            console.log(sumofMonth.data)
            document.getElementById('regularGst').innerHTML = `Rs. ${sumofMonth.data*18/100}`;
        } catch (e) {
            if (document.getElementById('regularGst')) {
                document.getElementById('regularGst').innerHTML = "Choose Correct Month for Choosen Year";
            }

        }
    }

    const selectValue = () => {
        var selectedQuarter = document.getElementById('quarter') ? document.getElementById('quarter').value : currentMonth
        var selectedYear = document.getElementById('year').value
        var selectRegMonth = document.getElementById('regMonth') ? document.getElementById('regMonth').value : currentMonth
        setMonth(selectedQuarter)
        setYear(selectedYear)
        setRegMonth(parseInt(selectRegMonth))
    }

    const loadSelectedGst = () => {
        loadSumOfQuart()
    }
    const loadRegularGst = () => {
        loadSumOfMonth()
        console.log("Clicked")
    }
    console.log(currentYear === year, typeof (currentYear), typeof (year))
    let yearsList = []
    for (let yr = currentYear; yr >= minYear; yr--) {
        yearsList.push(yr)
    }

    return (
        <div className="mt-4 text-center">
            <div className='text-2xl font-bold text-gray-500 mt-10'>Your Payable GST Details:</div>
            {companyDetails.gstType === "Composition" &&
                <div className='mt-8 sm:flex justify-center'>
                    <div className='flex flex-col mx-4 sm:mx-8 mb-4 sm:mb-0'>
                        <label className='font-bold rounded-lg w-full text-blue-600' htmlFor="Year">Select Year</label>
                        <select onChange={selectValue} name="quarter" className='border border-blue-600 p-2 rounded-lg w-full' id="year">
                            {yearsList.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex flex-col mx-4 sm:mx-8'>
                        <label className='font-bold rounded-lg w-full text-blue-600' htmlFor="Quarter">Select Quarter</label>
                        <select onChange={selectValue} name="quarter" className='border border-blue-600 p-2 rounded-lg w-full' id="quarter">
                            <option disabled={currentMonth < 4 && currentYear === parseInt(year)} value="4">Quarter 1 (April-June)</option>
                            <option disabled={currentMonth < 4 && currentYear === parseInt(year)} value="7">Quarter 2 (July-Sep)</option>
                            <option disabled={currentMonth < 4 && currentYear === parseInt(year)} value="10">Quarter 3 (Oct-Dec)</option>
                            <option value="1">Quarter 4 (Jan-March)</option>
                        </select>
                    </div>
                    <button className="border border-blue-600 mt-6 p-2 rounded-lg text-center w-full sm:w-auto bg-blue-400 text-white hover:bg-blue-600" onClick={loadSelectedGst}>Click to select value</button>
                </div>
            }
            {companyDetails.gstType === "Regular" &&
                <div className='mt-8 sm:flex justify-center'>
                    <div className='flex flex-col mx-4 sm:mx-8 mb-4 sm:mb-0'>
                        <label className='font-bold rounded-lg w-full text-blue-600' htmlFor="Month">Select Month</label>
                        <select onChange={selectValue} name="regMonth" className='border border-blue-600 p-2 rounded-lg w-full' id="regMonth">
                            <option value="1" {...currentMonth === 1 ? 'selected' : ''}>January</option>
                            <option value="2" disabled={currentMonth < 2 && currentYear === parseInt(year)} {...currentMonth === 2 ? 'selected' : ''}>February</option>
                            <option value="3" disabled={currentMonth < 3 && currentYear === parseInt(year)} {...currentMonth === 3 ? 'selected' : ''}>March</option>
                            <option value="4" disabled={currentMonth < 4 && currentYear === parseInt(year)} {...currentMonth === 4 ? 'selected' : ''}>April</option>
                            <option value="5" disabled={currentMonth < 5 && currentYear === parseInt(year)} {...currentMonth === 5 ? 'selected' : ''}>May</option>
                            <option value="6" disabled={currentMonth < 6 && currentYear === parseInt(year)} {...currentMonth === 6 ? 'selected' : ''}>June</option>
                            <option value="7" disabled={currentMonth < 7 && currentYear === parseInt(year)} {...currentMonth === 7 ? 'selected' : ''}>July</option>
                            <option value="8" disabled={currentMonth < 8 && currentYear === parseInt(year)} {...currentMonth === 8 ? 'selected' : ''}>August</option>
                            <option value="9" disabled={currentMonth < 9 && currentYear === parseInt(year)} {...currentMonth === 9 ? 'selected' : ''}>September</option>
                            <option value="10" disabled={currentMonth < 10 && currentYear === parseInt(year)} {...currentMonth === 10 ? 'selected' : ''}>October</option>
                            <option value="11" disabled={currentMonth < 11 && currentYear === parseInt(year)} {...currentMonth === 11 ? 'selected' : ''}>November</option>
                            <option value="12" disabled={currentMonth < 12 && currentYear === parseInt(year)} {...currentMonth === 12 ? 'selected' : ''}>December</option>
                        </select>
                    </div>

                    <div className='flex flex-col mx-4 sm:mx-8'>
                        <label className='font-bold rounded-lg w-full text-blue-600' htmlFor="Year">Select Year</label>
                        <select onChange={selectValue} name="quarter" className='border border-blue-600 p-2 rounded-lg w-full' id="year">
                            {yearsList.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>

                </div>
            }
            <div className=' sm:w-full sm:ml-0 ml-10 w-3/4  flex justify-center mt-8'>
                {companyDetails.gstType === "Composition" &&
                    <div className='flex border border-green-600 m-2 p-2 rounded-lg shadow-orange-800'>
                        <div className='text-lg font-bold mt-1 mb-2 pl-2 text-green-600'>Your Composition GST is:</div>
                        <div id="compositionGst" className="text-lg font-bold mt-1 pl-4 text-green-700 rounded-lg"></div>
                    </div>
                }
                {companyDetails.gstType === "Regular" &&
                    <div className='flex border border-green-600 m-2 p-2 rounded-lg shadow-orange-800'>
                        <div className='text-lg font-bold mt-1 mb-2 pl-2 text-green-600'>Your Regular GST is:</div>
                        <div id="regularGst" className="text-lg font-bold mt-1 pl-4 text-green-700 rounded-lg"></div>
                    </div>
                }
            </div>
            <div className='w-full my-10'>
                <button className="border border-blue-600 mt-6 p-2 rounded-lg bg-blue-400 text-white hover:bg-blue-600" onClick={loadRegularGst}>Click to select value</button>

            </div>
        </div>

    )
}

export default GST
