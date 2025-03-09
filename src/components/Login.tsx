import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "../api/baseURL";

const Login = () => {
    const navigate=useNavigate();
  const onFinish = async (values: { email: string; password: string }) => {
    console.log("Login Success:", values);
    try {
        const res = await axios.post(
            `${baseURL}/userRoutes/login`, 
            values,  
            { withCredentials: true } 
          );
          console.log("reas[ponseeeeee", res.data.token, res.data.user.username);
      if (res.data.message === "success") {
        localStorage.setItem("authToken", res.data.token);
        toast.success("Login scuccessfully");
        navigate('/home')
      } 
      
      
    } 
    
    catch (err: any) {
        if (err.response) {
          // Extract backend error message
          const errorMessage = err.response.data.message;
          console.log("Error Response from Backend:", errorMessage);
    
          if (errorMessage === "Invalid credentials") {
            toast.warn("Invalid credentials");
          } else {
            toast.error(errorMessage);
          }
        } else {
          toast.error("Failed to Login");
        }
      }
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-indigo-500">
        <Form
          onFinish={onFinish}
          className="p-6 bg-white rounded shadow-md w-96"
          style={{ backgroundColor: "#f8fafc" }}
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please enter your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Login
          </Button>
          <p className="mt-2 text-center">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </Form>
      </div>
    </>
  );
};

export default Login;
