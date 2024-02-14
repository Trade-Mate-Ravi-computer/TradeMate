import React, { useState } from 'react';

function Test() {
    const [sale, setSale] = useState();
    const [isOpen, steIsOpen] = useState(false)
    const itemNames =JSON.parse(localStorage.getItem('saleDetails'))
    const handleEventChange = (e) => {
        // const { name, value } = e.target;
        setSale(e.target.value)

    };
    const handleOnClick = () => {
        isOpen ? steIsOpen(false) : steIsOpen(true)
    }
    const handlOnClickItemName = (name) => {
        setSale(name)
        steIsOpen(false)
    }

    return (
        <div className=' border border-green-300 px-40 h-screen'>
            <span>Hello, this is a test</span>
            <div>
                <div className="dropdown absolute">
                    <input name="user" onClick={handleOnClick} value={sale} onChange={handleEventChange} className='border border-x-2 w-60' type="text" />
                    <ul>
                        {isOpen && itemNames.map((item, index) => (
                           item.itemName.toLowerCase().includes(sale?sale.toLowerCase():'')? <li key={index} className='list-none border border-x-2 w-full flex justify-center hover:bg-blue-200' onClick={() => handlOnClickItemName(item.itemName)}>
                           {item.itemName}
                       </li>:''
                        ))}
                    </ul>
                </div>
            </div>

        </div>

        
    );
}

export default Test;
