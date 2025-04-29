import React from 'react'
function Footer() {
  return (
    <div className=" text-white">
     
      <hr className="border-t border-[#7687B5]" />

     
<div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-x-10 px-6 sm:px-10 py-10 md:py-20">
  {/* Left Section */}
  <div className="flex flex-col space-y-10 text-center md:text-left">
    <div className="grid grid-cols-2 gap-x-10">
      
      {/* Utilities */}
      <div>
        <p className="text-2xl font-semibold">Utilities</p>
        <ul className="mt-5 space-y-3 text-gray-400">
          <li>Home</li>
          <li>Product</li>
          <li>Features</li>
          <li>Contact Us</li>
        </ul>
      </div>

      {/* Socials */}
      <div>
        <p className="text-2xl font-semibold">Socials</p>
        <ul className="mt-5 space-y-3 text-gray-400">
          <li>X</li>
          <li>LinkedIn</li>
          <li>Instagram</li>
          <li>Facebook</li>
        </ul>
      </div>
    </div>
  </div>

  {/* Right Section */}
  <div className="text-[#7687B5] text-center md:text-right flex flex-col items-center md:items-end space-y-6">
    
    <span className="text-5xl md:text-7xl text-white">O`<b>Note</b></span>

    <div className="flex gap-2 items-center text-sm">
      <img src="/Mail.png" alt="Mail" className="w-5 h-5" />
      <u>contact@openote.ai</u>
    </div>

    <div className="flex gap-2 items-center text-sm">
      <img src="/Address.png" alt="Address" className="w-5 h-5" />
      <span>CUH , Haryana</span>
    </div>

  </div>

</div>


      <div className="text-center text-[#7687B5] mb-5">
        All rights reserved © 2025 OpenNote
      </div>
    </div>
  )
}

export default Footer
