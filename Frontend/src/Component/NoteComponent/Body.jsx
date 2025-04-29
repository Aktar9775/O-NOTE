import React, { useState, useEffect } from 'react';
import image1 from "/Ellipse 9.png";
import { FaUserCircle } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { PiOpenAiLogoFill } from "react-icons/pi";
import TextEditor from './TextEditor';
import { IoMdRefresh } from "react-icons/io";
import { auth } from "../../../../Backend/services/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Body() {
  const navigate = useNavigate();
  const [showChatbot, setShowChatbot] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatbotWidth, setChatbotWidth] = useState(400);
  const [resizing, setResizing] = useState(false);
  const [username, setUsername] = useState("Username");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || user.email);
      } else {
        setUsername("Username");
      }
    });
    return () => unsubscribe();
  }, []);

  // const handleLogout = async () => {
  //   await signOut(auth);
  //   navigate("/");
  // };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: updatedMessages,
        }),
      });

      const data = await response.json();
      const botReply = data.choices[0].message;
      setMessages([...updatedMessages, botReply]);
    } catch (error) {
      setMessages([...updatedMessages, { role: 'assistant', content: 'Error: Something went wrong.' }]);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMouseDown = () => {
    setResizing(true);
  };

  const handleMouseMove = (e) => {
    if (!resizing) return;
    const newWidth = window.innerWidth - e.clientX;
    if (newWidth > 250 && newWidth < 700) {
      setChatbotWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setResizing(false);
  };

  useEffect(() => {
    if (resizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizing]);

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        className="transition-all duration-300"
        style={{ marginRight: showChatbot ? `${chatbotWidth}px` : '0' }}
      >
        <div className='text-2xl m-8 flex justify-between'>
          O`Note
          <div className='flex text-xl gap-5 relative'>
            {username}
            <FaUserCircle
              className='text-4xl cursor-pointer'
              onMouseEnter={() => setShowPopup(true)}
              onMouseLeave={() => setShowPopup(false)}
            />
            {/* {showPopup && (
              <div
                className='absolute right-0 w-32 bg-white shadow-md rounded-xl mt-12'
                onMouseEnter={() => setShowPopup(true)}
                onMouseLeave={() => setShowPopup(false)}
              >
                <ul className='text-sm text-center text-black'>
                  <li className='w-full p-2 hover:bg-[#262640] cursor-pointer rounded-xl hover:text-white'>Profile</li>
                  <li className='w-full p-2 hover:bg-[#64393a] cursor-pointer rounded-xl hover:text-white' onClick={handleLogout}>Logout</li>
                </ul>
              </div>
            )} */}
          </div>
        </div>

        <TextEditor />

        {!showChatbot && (
          <div
            className='fixed bottom-4 right-4 rounded-full p-3 flex items-center shadow-lg cursor-pointer z-50'
            onClick={() => setShowChatbot(true)}
          >
            <span className='text-sm font-semibold mr-3'>O`Note GPT</span>
            <PiOpenAiLogoFill className='text-4xl' />
          </div>
        )}
      </div>

      {showChatbot && (
        <div
          className="fixed top-0 right-0 h-full bg-[#161b28] shadow-lg z-40 flex flex-col resize-x overflow-hidden transition-all duration-300"
          style={{ width: chatbotWidth }}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize z-50"
            onMouseDown={handleMouseDown}
          ></div>

          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <p className="text-white text-lg flex justify-center items-center gap-2">
              <PiOpenAiLogoFill className="text-4xl" />
              O'Note GPT
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setMessages([])}
                className="text-white text-2xl px-2 py-1"
              >
                <IoMdRefresh />
              </button>
              <button
                onClick={() => setShowChatbot(false)}
                className="text-white text-xl px-3 py-1"
              >
                ✕
              </button>
            </div>
          </div>

          <div className='flex-1 overflow-y-auto text-white text-sm space-y-2 p-4'>
            {messages.map((msg, idx) => (
              <div key={idx} className={msg.role === 'user' ? ' p-2 rounded-2xl bg-gray-700 text-right text-white outline-none max-w-fit' : 'text-left text-gray-300'}>
                <p>{msg.content}</p>
              </div>
            ))}
            {loading && <p className="text-gray-500 italic">Typing...</p>}
          </div>

          <div className='border-t border-gray-700 p-2'>
            <div className='flex'>
              <input
                type='text'
                className='flex-1 text-sm p-2 rounded-l-md outline-none text-white'
                placeholder='Type your message...'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className=' text-white px-4 flex items-center justify-center rounded-r-md'
              >
                <IoSend />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Body;
