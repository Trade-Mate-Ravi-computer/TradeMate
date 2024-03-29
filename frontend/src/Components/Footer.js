import React from 'react';

export default function Footer() {
  return (
    <div className='bg-blue-200'>
      <footer className="text-blue-600 body-font">
        <div className="container px-3 py-4 mx-auto flex items-center sm:flex-row flex-col ">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-blue-900">

            <span className="ml-3 text-xl">Trade<span className='text-red-600'>Mate</span></span>
          </a>
          <p className=" text-sm text-blue-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-blue-200 sm:py-2 sm:mt-0 mt-4">© 2024 Trade<span className='text-red-600'>Mate</span> —
            <a className="text-blue-600 ml-1" rel="noopener noreferrer" target="_blank">@trade<span className='text-red-600'>Mate</span></a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            {/* <a className="text-blue-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-blue-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a> */}
            <a className="ml-3 text-blue-500" href='https://www.instagram.com/tradematebusinessapp?igsh=MWl4M3FjZzc3bDY1eQ==' target='_blank'>
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a className="ml-3 text-blue-500" href='https://www.youtube.com/channel/UC6tRrpNI2Rdct_zAVJMfKwQ' target='_blank'>
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 3.51c-.26-.97-1.03-1.74-2-2C18.21 1 12 1 12 1S5.79 1 4 1.51c-.97.26-1.74 1.03-2 2C1 5.79 1 12 1 12s0 6.21.51 7.99c.26.97 1.03 1.74 2 2C5.79 23 12 23 12 23s6.21 0 7.99-.51c.97-.26 1.74-1.03 2-2C23 18.21 23 12 23 12s0-6.21-.51-7.99zM10 15V9l5.2 3-5.2 3z" />
              </svg>

            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
