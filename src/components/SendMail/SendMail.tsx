import axios from 'axios';
import React, { useState } from 'react'
import api from '../../utils/api';

const SendMail = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState("");
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

 // Send OTP to user email
 const sendOtp = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await api.post("/emailRoutes/send-otp", { email });
      setGeneratedOtp(response.data.otp); // Save OTP from backend (For testing purpose)
      setStep(2);
      setMessage("OTP sent successfully!");
    } catch (error) {
      setMessage("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

   // Verify OTP (Update this function)
const verifyOtp = async () => {
    setLoading(true);
    setMessage("");
  
    try {
      const response = await api.post("/emailRoutes/verify-otp", {
        email,
        otp,
      });
  
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          {step === 1 ? "Enter Your Email" : "Enter OTP"}
        </h2>

        {step === 1 ? (
          // Step 1: Enter Email
          <div className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
            <button
              onClick={sendOtp}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>
        ) : (
          // Step 2: Enter OTP
          <div className="space-y-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
            <button
              onClick={verifyOtp}
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              Verify OTP
            </button>
          </div>
        )}

        {message && <p className="text-center text-sm text-gray-700 mt-2">{message}</p>}
      </div>
    </div>
    </>
  )
}

export default SendMail