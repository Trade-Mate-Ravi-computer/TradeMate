import React, { useEffect, useState } from 'react'
import axios from 'axios'

function GST() {
    const currentDate = new Date();
    const [currentMonth,setCurrentMonth] = useState(currentDate.getMonth() + 1)
    const currentYear = currentDate.getFullYear();
    const [quartSum, setQuartSum] = useState(0)
    const [mmonthSum, setMonthSum] = useState(0)
    const [companyDetails, setCompanyDetails] = useState({});
  const month=0
    // console.log(currentYear)
    useEffect(() => {
        loadSumOfQuart()
        loadSumOfMonth()
        loadCompanyDetail()
    }, [])
    function quarterFinder(month) {
        if (6 >= month && month >= 4) {
            return "Quarter 1 (Aprail-june)"
        } else if (9 >= month && month >= 7) {
            return "Quarter 2 (july-sep)"
        } else if (12 >= month && month >= 10) {
            return "Quarter 3 (Oct-Dec)"
        } else if (3 >= month && month>= 1)  {
            return "Quarter 4 (Jan-March)"
        }
    }
    console.log("Quarter is ", quarterFinder(currentMonth))

    function quaterMonthFInder(month, currentYear) {
        if (6 >= month && month >= 4) {
            return {
                month1: 4,
                month2: 5,
                month3: 6,
                year: currentYear,
                companyName: JSON.parse(localStorage.getItem('companyName')).companyName
            }
        } else if (9 >= month && month >= 7) {
            return {
                month1: 7,
                month2: 8,
                month3: 9,
                year: currentYear,
                companyName: JSON.parse(localStorage.getItem('companyName')).companyName
            }
        } else if (12 >= month && month >= 10) {
            return {
                month1: 10,
                month2: 11,
                month3: 12,
                year: currentYear - 1,
                companyName: JSON.parse(localStorage.getItem('companyName')).companyName
            }
        } else if(3 >= month && month>= 1) {
            return {
                month1: 1,
                month2: 2,
                month3: 3,
                year: currentYear,
                companyName: JSON.parse(localStorage.getItem('companyName')).companyName
            }
        }

    }
    const loadCompanyDetail = async () => {
        const companyDetail = await axios.post(`http://localhost:8080/company/byname/${JSON.parse(localStorage.getItem('companyName')).companyName}`,
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
        const sumofQuart = await axios.post('http://localhost:8080/sales/quart',
            quaterMonthFInder(currentMonth, currentYear),
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
                }
            }

        )
        setQuartSum(sumofQuart.data)
    }
    const loadSumOfMonth = async () => {
        const sumofMonth = await axios.post('http://localhost:8080/sales/monthsum',
            quaterMonthFInder(currentMonth, currentYear),
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
                }
            }

        )
        setMonthSum(sumofMonth.data)
    }
    //    console.log(mmonthSum
    //     ,quartSum,companyDetails)

    return (
        <div className="mt-4 text-center">
            {
                companyDetails.gstType === "Composition" &&
                <div className="bg-gray-200 p-4 rounded-lg">{quartSum * 1 / 100}</div>
            }
            {
                companyDetails.gstType === "Regular" &&
                <div className="bg-gray-200 p-4 rounded-lg mt-4">{mmonthSum * 18 / 100}</div>
            }
        </div>

    )
}

export default GST
