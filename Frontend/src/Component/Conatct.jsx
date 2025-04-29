import React from "react";
function Conatct() {
  return (
    <div className="mt-40">
      <div className="text-center">
        
        <button
          className="border-[1px] px-5 py-2 text-sm border-[#2d3748] rounded-2xl"
          style={{ fontSize: "11px", background: "rgba(255, 255, 255, 0.07)" }}
        >
          CONTACT US
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 md:p-12 lg:p-20">
  {/* Left Section */}
  <div className="col-span-1 md:col-span-2 relative text-center md:text-left">
    <div className="mt-5 relative z-10">
      <span className="text-3xl md:text-4xl mt-4">Ask whatever you have</span>
      <br />
      <p className="text-3xl md:text-4xl text-gradient">in your mind now</p>
    </div>
    <span className="mt-7 text-sm relative z-10 block">
      Whether you have questions or suggestion to give us, we’re here to help. Reach out today.
    </span>
    <br />
    <div className="flex flex-col items-center md:items-start space-y-3 mt-5 relative z-10">
      <span className="flex items-center gap-2 text-sm">
        <img src="/Mail.png" alt="Mail" className="w-5 h-5" />
        <u>contact@openote.ai</u>
      </span>
      <span className="flex items-center gap-2 text-sm">
        <img src="/Phone.png" alt="Phone" className="w-5 h-5" />
        (969) 819-8061
      </span>
      <span className="flex items-center gap-2 text-sm">
        <img src="/Address.png" alt="Address" className="w-5 h-5" />
        CUH , Haryana
      </span>
    </div>

    {/* Background Ellipse */}
    <div className="absolute -top-20 md:-top-32 -z-10 w-full h-auto flex justify-center">
      <img src="/Ellipse 9.png" alt="Decorative Ellipse" className="max-w-xs md:max-w-md lg:max-w-full" />
    </div>
  </div>

  {/* Right Section - Form */}
  <div className="col-span-1 md:col-span-2 px-4 md:px-10 text-sm">
    {/* Name Field */}
    <div className="mb-4">
      <label htmlFor="name" className="block mb-1">
        Name
      </label>
      <input
        type="text"
        id="name"
        className="w-full border border-[#7687B5] py-2 px-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#7687B5]"
      />
    </div>

    {/* Email Field */}
    <div className="mb-4">
      <label htmlFor="email" className="block mb-1">
        Email
      </label>
      <input
        type="email"
        id="email"
        className="w-full border border-[#7687B5] py-2 px-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#7687B5]"
      />
    </div>

    {/* Message Field */}
    <div className="mb-4">
      <label htmlFor="message" className="block mb-1">
        Message
      </label>
      <textarea
        id="message"
        rows="4"
        className="w-full border border-[#7687B5] py-2 px-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#7687B5]"
      ></textarea>
    </div>

    {/* Submit Button */}
    <button className="border px-6 py-2 border-[#2d3748] bg-[#7687B5]/50 rounded-2xl w-full md:w-auto">
      Send
    </button>
  </div>
</div>

    </div>
  );
}

export default Conatct;
