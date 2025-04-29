import React from 'react';
const ImageCard = ({ review, user }) => {
  return (
    <div className="border border-[#7687B5] bg-[#07080a] p-7 m-3 rounded-2xl w-90 z-50">

      <p style={{fontSize:'13px', color:'#C5CDE3'}}>{review}</p>
      <div className='mt-9' style={{fontSize:'13px'}}>
        {user}
      </div>
      
    </div>
  );
};

function ClientRv() {
  
  const images = [
    { review: '"We used to stragle with consistent branding across platform . O`Note unified dashboard ensures our message stays on point every single time."', user: "-Brand Director at a Teach Startup" },
    { review: 'O`Note turned our complicated campaigns into a breeze. The built-in AI agents helped us reach exactly the customers we wanted—without guesswork!”', user: "–Head of Growth at Tech Startup" },
    { review: '“We’ve tried other platforms before, but none delivered the depth of insights O`Note offers. Our conversion rates are up by 35% since we signed on!”', user: "–Ecommerce Manager at Home Décor Brand" },
    { review: '“What impressed me most was the real-time optimization. OpenNote intelligent agents just keep refining our campaigns—our ad spend has never worked harder!”', user: "–Digital Strategist at SaaS Company" },
    { review: '“O`Note made everything from campaign setup to performance tracking simple. Our team can now focus on creating great content rather than crunching numbers.”', user: "- Social Media Lead at Non-Profit Organization" },
    { review: '“We’ve seen a 50% boost in engagement across our social channels since switching to adTask. Its AI-driven insights are game-changing!”', user: "–Social Media Manager at a Fitness Brand" },   
    
  ];
  return (
    <div className=" grid place-items-center p-4 " >
      <div className="flex gap-4 flex-wrap">
        {images.map((image, index) => (
          <ImageCard key={index} review={image.review} user={image.user} />
        ))}
      </div>
    </div>
  );
}

export default ClientRv;
