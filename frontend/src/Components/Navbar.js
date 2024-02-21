import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import favicon from './favicon.png'
import logout from './logout.png'


function Navbar(props) {
  let store = JSON.parse(localStorage.getItem('login'))
  const navigate = useNavigate();
  const handleOnClick = () => {
 if(store){
  localStorage.clear();
  navigate("/")
 }else{
  navigate('/signup')
 }
 window.location.reload();
  }
  

  return (

    <div className='bg-blue-200'>
      <nav className="bg-white-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <span className='flex flex-row'><img className="h-8 w-auto" src={favicon} alt="Trade Mate" /><span className='mx-2 my-auto font-semibold'><span>Trade</span><span className='text-red-600'>Mate</span></span></span>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">

                  <NavLink to="/" className=" text-blue-500 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">{localStorage.getItem('login')?"Dashboard":"Home"}</NavLink>
                  {/* <NavLink to="/dashboard" className="text-blue-500 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Dashboard</NavLink> */}
                  <NavLink to="/contact" className="text-blue-500 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Contact</NavLink>
                  <NavLink to="/" className="text-blue-500 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">About</NavLink>
                </div>
              </div>
            </div>

            <div className="relative ml-3">
              <div>
                <button type="button" onClick={handleOnClick} className="relative bg-blue-300 py-2 px-4 flex border hover:border-blue-300 hover:text-white rounded-xl hover:bg-blue-400 transition-all" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  {store ? store.user : "Sign-Up"} <img className='w-7 ml-2 h-7' src={logout} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
