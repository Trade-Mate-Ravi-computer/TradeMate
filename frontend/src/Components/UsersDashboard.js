import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Home from './Home';
import UpdateCompany from './UpdateCompany';
import crossImage from './cross.png';
import CreateCOmpany from './CreateCOmpany';
import VerificationAlert from './VerificationAlert';

function UsersDashboard() {
    const [update, setUpdate] = useState(false);
    const [id, setId] = useState(0);
    const [onlyUpdate, setOnlyUpdate] = useState(false);
    const [companyDetail, setCompanyDetail] = useState([]);
    const navigate = useNavigate();
    const [Verification,setVerification]=useState(false)

    useEffect(() => {
        loadUser()
        loadCompany();
    }, []);
    const loadUser= async ()=>{
        const loadedUser= await axios.get(`https://tradematebackend-production.up.railway.app/user/byemail/${JSON.parse(localStorage.getItem('login')).user}`,{
            
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('login')).token}`,
        },
            
        })
        console.log("Verification status :- ",loadedUser.data.verified)
        setVerification(loadedUser.data.verified)
    }

    const loadCompany = async () => {
        try {
            const response = await axios.post(
                `https://tradematebackend-production.up.railway.app/company/byuser/${JSON.parse(localStorage.getItem('login')).user}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('login')).token}`,
                    },
                }
            );
            setCompanyDetail(response.data);
        } catch (error) {
            console.error('Error fetching company details:', error);
        }
    };

    const handleClickOnCompany = (id) => {
        navigate(`/dashboard/${id}`);
        localStorage.setItem('companyName', JSON.stringify({ companyName: id }));
    };

    const handleOnclickBody = () => {
        setUpdate(false);
        setOnlyUpdate(false);
        loadCompany();
    };

    const handleCreateCOmpany = () => {
        setUpdate(true);
    };

    const handleOnclickOnupdate = (e, id) => {
        e.stopPropagation();
        setId(id);
        setOnlyUpdate(true);
    };

    return (
       <div>
        {Verification?
             <div className="bg-blue-300 min-h-screen relative overflow-hidden">
             {localStorage.getItem('login') && JSON.parse(localStorage.getItem('login')).login ? (
                 <div className="grid grid-cols-4">
                     <div className="col-span-1 flex justify-center items-center">
                         <div className="w-full h-16 bg-blue-200 flex justify-center items-center hover:bg-blue-300 transition-colors duration-300 rounded-lg shadow-md">
                             <button onClick={handleCreateCOmpany} className="text-blue-700 hover:text-blue-900 font-semibold focus:outline-none">
                                 Create Company
                             </button>
                         </div>
                     </div>
                     <div className="col-span-3 mx-2 bg-blue-300">
                         <div className="h-16 w-full flex justify-center items-center text-4xl text-blue-600 font-bold bg-gray-200 border-b-4 border-blue-400 rounded-t-lg  mt-2">
                             Your Companies
                         </div>
 
                         {/* Background overlay when either CreateCOmpany or UpdateCompany is open */}
                         {(update || onlyUpdate) && (
                             <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" onClick={handleOnclickBody}></div>
                         )}
 
                         {/* Render update form */}
                         {update && (
                             <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-black shadow-md rounded-md p-4 z-50">
                                 <div className="flex justify-end">
                                     <button onClick={handleOnclickBody} className="w-6 h-6 mr-2 focus:outline-none hover:scale-110 transform transition-transform">
                                         <img src={crossImage} alt="Close" />
                                     </button>
                                 </div>
                                 <CreateCOmpany setUpdate={setUpdate} myfunction={loadCompany} />
                             </div>
                         )}
                         {/* Render update company form */}
                         {onlyUpdate && (
                             <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-black shadow-md rounded-md p-4 z-50">
                                 <div className="flex justify-end">
                                     <button onClick={handleOnclickBody} className="w-6 h-6 mr-2 focus:outline-none hover:scale-110 transform transition-transform">
                                         <img src={crossImage} alt="Close" />
                                     </button>
                                 </div>
                                 <UpdateCompany setOnlyUpdate={setOnlyUpdate} id={id} myfunction={loadCompany} />
                             </div>
                         )}
                         {/* Render company list */}
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
                             {companyDetail.map((company, index) => (
                                 <div
                                     key={company.companyId}
                                     className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg hover:scale-105 transition-transform"
                                     onClick={() => handleClickOnCompany(company.companyName)}
                                 >
                                     <p className="text-lg font-extrabold text-blue-600 uppercase tracking-wide mb-4">{company.companyName}</p>
                                     {company.gst && <p className="text-sm mb-2">GST: {company.gst}</p>}
                                     {company.gstType && <p className="text-sm mb-2">GST Type: {company.gstType}</p>}
                                     <p className="text-sm mb-2">Address: {company.companyAddress}</p>
                                     <p className="text-sm mb-2">Mobile No: {company.mobile}</p>
                                     <button
                                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                         onClick={(e) => handleOnclickOnupdate(e, company.companyId)}
                                     >
                                         Update
                                     </button>
                                 </div>
                             ))}
                         </div>
                     </div>
                 </div>
             ) : (
                 <Home />
             )}
         </div>:<VerificationAlert/>
        }
       </div>
    );
}

export default UsersDashboard;
