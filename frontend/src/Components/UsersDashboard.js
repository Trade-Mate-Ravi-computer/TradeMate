import React, { useEffect, useState } from 'react'
import Home from './Home'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import CreateCOmpany from './CreateCOmpany'
import crossImage from './cross.png'
import UpdateCompany from './UpdateCompany'

function UsersDashboard() {
    const [update, setUpdate] = useState(false)
    const [id, setId] = useState(0)
    const [onlyUpdate, setOnlyUpdate] = useState(false)
    let store = JSON.parse(localStorage.getItem('login'))
    const navigate = useNavigate()
    const [companyDetail, setCompanyDetail] = useState([])
    useEffect(() => {
        loadCompany();
        localStorage.setItem('companyName', "")
    }, [])
    const loadCompany = async () => {
        const companyDetails = await axios.post(`http://localhost:8080/company/byuser/${JSON.parse(localStorage.getItem('login')).user}`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
                }

            })
        setCompanyDetail(companyDetails.data)
    }
    const handleClickOnCompany = (id) => {
        navigate(`/dashboard/${id}`)
        localStorage.setItem('companyName', JSON.stringify({
            companyName: id
        }))
    }
    const handleOnclickBody = () => {
        setUpdate(false)
        loadCompany()
    }
    const handleOnclickupdate = () => {
        setOnlyUpdate(false)
        loadCompany()
    }
    const handleCreateCompany = () => {
        setUpdate(true)
    }
    const handleOnclickOnupdate = (id) => {
        setId(id)
        setOnlyUpdate(true)
    }
    return (
        <div style={{ height: 597 }} className=' bg-gray-300 '>

            {
                (store && store.login) ?
                    <div className='grid grid-cols-4'>
                        <div className='col-span-1 text-center w-full h-8 bg-gray-100 pt-1 ml-2 mt-12 hover:bg-gray-200 hover:font-semibold'><button onClick={handleCreateCompany}><span className=''>Create Company</span></button></div>

                        <div style={{ height: 600 }} className='col-span-3 mx-2 bg-gray-300 '>
                            <div className='h-10 w-full p-3 text-center text-2xl text-blue-600 font-semibold'>Your Companies</div>
                            {update ? (
                                <div>
                                    <div className='fixed border border-black bg-white ml-52'>
                                        <div className='w-full h-10 text-right'>
                                            <button className='h-6 w-6 m-2 transition-all hover:h-8 hover:w-8 hover:m-1' onClick={handleOnclickBody}>
                                                <img src={crossImage} alt="" />
                                            </button>
                                        </div>
                                        <div>
                                            <CreateCOmpany setUpdate={setUpdate}  myfunction={loadCompany} />

                                        </div>
                                    </div>

                                </div>

                            ) : ''}
                            {onlyUpdate ? <div className='fixed border border-black bg-white ml-52'>
                                <div className='w-full h-10 text-right'>
                                    <button className='h-6 w-6 m-2 transition-all hover:h-8 hover:w-8 hover:m-1' onClick={handleOnclickupdate}>
                                        <img src={crossImage} alt="" />
                                    </button>
                                </div>
                                <div>
                                    <UpdateCompany setOnlyUpdate={setOnlyUpdate} id={id} myfunction={loadCompany} />

                                </div>
                            </div> : ''

                            }
                            <table className='w-full border border-gray-200 mt-2 rounded-md'>
                                <thead className='border border-gray-400 h-10 bg-gray-500 text-white font-semibold text-lg'>
                                    <tr>
                                        <td className='text-center'>Sn.</td>
                                        <td className='text-center'>Company Name</td>
                                        <td className='text-center'>GST</td>
                                        <td className='text-center'>Address</td>
                                        <td className='text-center'>GST Type</td>
                                        <td className='text-center'>Mobile No</td>
                                        <td className='text-center w-24'>Update</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {companyDetail.map((company, index) => (
                                        <tr key={company.companyId} className='border border-white h-12 m-6 hover:bg-gray-100 rounded-lg hover:shadow-md cursor-pointer'>
                                            <td onClick={() => handleClickOnCompany(company.companyName)} className='text-center text-sm'>{index + 1}</td>

                                            <td onClick={() => handleClickOnCompany(company.companyName)} className='text-center text-sm'>{company.companyName}</td>
                                            <td onClick={() => handleClickOnCompany(company.companyName)} className='text-center text-sm'>{company.gstIn}</td>
                                            <td onClick={() => handleClickOnCompany(company.companyName)} className='text-center text-sm'>{company.companyAddress}</td>

                                            <td onClick={() => handleClickOnCompany(company.companyName)} className='text-center text-sm'>{company.gstType}</td>

                                            <td onClick={() => handleClickOnCompany(company.companyName)} className='text-center text-sm'>{company.mobile}</td>
                                            <td className='text-center text-sm'>
                                                <span className='border border-red-500 rounded-lg p-2 hover:bg-green-600 hover:font-semibold hover:text-white w-16 cursor-pointer' onClick={() => handleOnclickOnupdate(company.companyId)}>Update</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>


                    </div>
                    : <Home />
            }
        </div>
    )
}

export default UsersDashboard
