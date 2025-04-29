import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AnimatedButton() {
  const [particles, setParticles] = useState([]);
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/Login"); 
  };
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
    }));
    setParticles(newParticles);
  }, []);

  return (
   
      <div className="relative inline-block">
      
       

        {/* Button */}
        <button className="relative px-8 py-3 text-[#c2c6dc]  border-1 border-[#858992] border-opacity-50 rounded-full transition-transform hover:brightness-125 bg-transparent overflow-hidden" style={{fontSize:'15px'}} onClick={handleLogin}>
        Start Free Trail
        </button>

        {/* Particles */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute w-1 h-1 bg-white opacity-0 rounded-full animate-particle"
              style={{
                left: p.left,
                top: p.top,
                animationDelay: p.animationDelay,
              }}
            ></div>
          ))}
     
      </div>

      {/* Tailwind Animation for Particles */}
      <style>
        {`
          @keyframes fadeBlink {
            0% { opacity: 0; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0.8); }
          }
          .animate-particle {
            animation: fadeBlink 2s infinite ease-in-out;
          }
        `}
      </style>
    </div>
  );
}
