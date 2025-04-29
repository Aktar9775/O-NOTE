import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../../Backend/services/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import image3 from "../assets/Mask group.svg";
import image1 from "../assets/Rectangle 5.png";
import image2 from "../assets/Rectangle 4.png";

function Login() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in as:", res.user.email);
      navigate("/notepad");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      alert("Verification email sent. Please check your inbox.");
      setIsRegister(false);
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email to reset password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent.");
      setShowForgotPassword(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/notepad");
    } catch (error) {
      alert("Google Sign-In failed: " + error.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="relative p-6 w-96 z-50 ">
        <h2 className="text-4xl font-semibold mb-4 text-center">
          {isRegister ? "Register" : showForgotPassword ? "Reset Password" : "Login"}
        </h2>

        {isRegister ? (
          <>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1">Name</label>
              <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="w-full border border-[#7687B5] py-2 px-3 rounded-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">Email</label>
              <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-[#7687B5] py-2 px-3 rounded-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-1">Password</label>
              <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-[#7687B5] py-2 px-3 rounded-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block mb-1">Confirm Password</label>
              <input type="password" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full border border-[#7687B5] py-2 px-3 rounded-sm" />
            </div>
            <button className="border px-6 py-2 bg-[#7687B5]/50 rounded-2xl w-full" onClick={handleRegister}>
              Register
            </button>
            <p className="text-center mt-3">
              Already have an account? <span className="text-blue-500 cursor-pointer" onClick={() => setIsRegister(false)}>Login</span>
            </p>
          </>
        ) : showForgotPassword ? (
          <>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">Email</label>
              <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-[#7687B5] py-2 px-3 rounded-sm" />
            </div>
            <button className="border px-6 py-2 bg-[#7687B5]/50 rounded-2xl w-full" onClick={handleForgotPassword}>
              Send Reset Link
            </button>
            <p className="text-center mt-3">
              Back to <span className="text-blue-500 cursor-pointer" onClick={() => setShowForgotPassword(false)}>Login</span>
            </p>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">Email</label>
              <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-[#7687B5] py-2 px-3 rounded-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-1">Password</label>
              <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-[#7687B5] py-2 px-3 rounded-sm" />
            </div>
            <div className="flex flex-col gap-3 text-center">
              <button className="border px-6 py-2 bg-[#7687B5]/50 rounded-2xl w-full" onClick={handleLogin}>
                Login
              </button>
              <span className="text-red-300 cursor-pointer" onClick={() => setShowForgotPassword(true)}>
                Forgot Password ?
              </span>
              OR
              <button className="border px-6 py-2 border-gray-400 bg-white text-gray-700 flex items-center justify-center rounded-2xl w-full" onClick={handleGoogleLogin}>
                <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google Logo" className="mr-2" />
                Sign in with Google
              </button>
              <p className="text-center mt-3">
                Don't have an account? <span className="text-blue-500 cursor-pointer" onClick={() => setIsRegister(true)}>Sign Up</span>
              </p>
            </div>
          </>
        )}
      </div>

      {/* Background Layers */}
      <div className="absolute w-[900px] h-[600px]">
        <img src={image3} alt="Layer 2" className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/9 w-[1000px] h-[1000px] opacity-2.5" />
        <img src={image2} alt="Layer 1" className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/15 w-[500px] h-[650px] z-10" />
        <img src={image1} alt="Layer 3" className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/10 w-[1000px] h-[700px] z-10" />
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl text-center opacity-6 z-10">
          O`Note
        </span>
      </div>
    </div>
  );
}

export default Login;
