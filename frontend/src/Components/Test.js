import React, { useState } from 'react';

function Test() {
    const [sale, setSale] = useState({
        item: {
            itemName: ''
        },
        user: '',
        price: 0
    });
   
    const [isOpen,steIsOpen]=useState(false)

    const handleEventChange = (e) => {
        const { name, value } = e.target;
        setSale(prevState => ({
            ...prevState,
            [name==="itemName"?'':name]:name==="itemName"?'':value,
            item:{
            [(name==="itemName" )?name:'']: name==="itemName"?value:'' 
            }// Update the sale state directly instead of updating nested item properties
        }));
       
    };
    const handleOnClick =()=>{
      isOpen?steIsOpen(false):steIsOpen(true)
    }
   

    return (
        <div className=' border border-green-300 px-40 h-screen'>
            <span>Hello, this is a test</span>
            <div>
                <span>Price: </span>
                <input name="price" onChange={handleEventChange} value={sale.price} className='border border-x-2 my-10' type="number" />
            </div>
            <div>
                {/* <span>User: </span> */}
                <input name="user" onClick={handleOnClick} value={sale.user} onChange={handleEventChange} className='border border-x-2 w-40 ' type="text" />
              {!isOpen?'':  <div className="dropdown absolute ">
                    <li className='list-none border border-x-2 w-40 flex justify-center hover:bg-blue-200'>Mouse</li>
                    <li className='list-none border border-x-2 w-40 flex justify-center hover:bg-blue-200'>Keyboard</li>
                    <li className='list-none border border-x-2 w-40 flex justify-center hover:bg-blue-200'>Laptop</li>
                </div>}
            </div>
            {/* <div>
                <span>Name: </span>
                <input name="itemName" value={sale.item.itemName} onChange={handleEventChange} className='border border-x-2 my-10' type="text" />
            </div> */}
        </div>
    );
}

export default Test;
