import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import Navbar from './Navbar';

import Home from './Home';

const Layout = () => {

  
  return (
    <>
        <Navbar />
        <Home/>
    </> 
  )
}

export default Layout


