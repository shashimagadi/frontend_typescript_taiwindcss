import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { baseURL } from "../api/baseURL";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    
    try {
      const res = await axios.post(`${baseURL}/userRoutes/register`, values);
      if(res.data.message==='success'){
    toast.success ("insert scuccessfully")
      }
    } catch (err) {
       
        toast.error("User already exists")
        
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
          <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
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
            {loading ? "Registering..." : "Register"}
          </Button>
          <p className="mt-2 text-center">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </Form>
      </div>
    </>
  );
};

export default Register;
