import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { NavLink } from 'react-router-dom'

function Signin() {
 
  const navigate = useNavigate();
  const [loginDetails,setLoginDetails] =useState({
    email:'',
    password:'',
    login:false,
    store:null
  })
  useEffect(()=>{
    let store = JSON.parse(localStorage.getItem('login'))
    setLoginDetails({store:store})
    if(store && store.login){
      setLoginDetails({login:true})
    }

  },[])
  const onEventChange= ((e)=> {
setLoginDetails(
  {...loginDetails,
  [e.target.name]:e.target.value}
)
  })
  const handleOnClick=((e)=>{
    e.preventDefault();
    fetch('http://localhost:8080/auth/login',{
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(loginDetails)
    }).then((resp)=>{
      console.log(resp)
      resp.json().then((result)=>{
        
        localStorage.setItem('login',JSON.stringify({
          login:true,
          token:result.jwtToken,
          user:result.userNAme
        }))
        
      })
      if(resp.ok){
        navigate('/usersDashboard')
        window.location.reload();
       }
    })
   
  })

 return (
    <div>
       <form className="space-y-6" onSubmit={(e)=>handleOnClick(e)}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-blue-900">Email address</label>
        <div className="mt-2 ">
          <input id="email" name="email" value={loginDetails.email} onChange={(e) => onEventChange(e)}  type="email" autoComplete="email" required className="block w-full rounded-md border-0 p-1.5 text-blue-900 shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-blue-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-blue-900">Password</label>
         
        </div>
        <div className="mt-2">
          <input id="password" value={loginDetails.password} name="password"  onChange={(e) => onEventChange(e)} type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 p-1.5 text-blue-900 shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-blue-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          <div className="text-sm">
            <a href="/" className="font-semibold text-indigo-600 hover:text-indigo-500 underline underline-offset-4">Forgot password?</a>
          </div>
        </div>
      </div>

      <div>
        <button   className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
      <div className="text-sm flex justify-end">
            {/* <p className='mx-2'>Dont's have account </p><a href="/" className="font-semibold text-indigo-600 hover:text-indigo-500 underline underline-offset-4">Sign up</a> */}
          </div>
    </form>
    </div>
  )
}

export default Signin
