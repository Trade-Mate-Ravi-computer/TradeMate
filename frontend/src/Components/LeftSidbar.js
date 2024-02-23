import React from 'react'
import { NavLink } from 'react-router-dom'

function LeftSidbar(props) {
  return (
    <div>
      <div className=' border border-blue-100'>
        <NavLink className={`border border-blue-100 justify-center flex font-${props.opendash} hover:border-blue-300 hover:font-semibold hover:bg-blue-100`} to={`/dashboard/${JSON.parse(localStorage.getItem('companyName')).companyName}`}>Company Dashboard</NavLink>
        <NavLink className={`border border-blue-100 justify-center flex font-${props.addSale} hover:border-blue-300 hover:font-semibold hover:bg-blue-100`} to={`/addsale/${JSON.parse(localStorage.getItem('companyName')).companyName}`}>Add Sales</NavLink>
        <NavLink className={`border border-blue-100 justify-center flex font-${props.openpurchase} hover:border-blue-300 hover:font-semibold hover:bg-blue-100`} to={`/addpurchase/${JSON.parse(localStorage.getItem('companyName')).companyName}`}>Add Purchase</NavLink>
        <NavLink className={`border border-blue-100 justify-center flex font-${props.addpurchase} hover:border-blue-300 hover:font-semibold hover:bg-blue-100`} to={`/addproduct/${JSON.parse(localStorage.getItem('companyName')).companyName}`}>Add Products</NavLink>
        {/* <NavLink className={`border border-blue-100 justify-center flex font-${props.openexpence} hover:border-blue-300 hover:font-semibold hover:bg-blue-100`} to='/addexpense'>Add Expences</NavLink> */}
        {/* <NavLink className={`border border-blue-100 justify-center flex font-${props.openaddcustomer} hover:border-blue-300 hover:font-semibold hover:bg-blue-100`} to='/addcustomer'>Add Customers</NavLink>*/}
        {/* <NavLink className={`border border-blue-100 justify-center flex font-${props.openemployee} hover:border-blue-300 hover:font-semibold hover:bg-blue-100`} to={`/addEmployee/${JSON.parse(localStorage.getItem('companyName')).companyName}`}>Add User</NavLink>  */}
        </div>
    </div>
  )
}

export default LeftSidbar
