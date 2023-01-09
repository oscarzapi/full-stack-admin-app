import React, { Suspense, useState } from 'react'
import {Box, useMediaQuery} from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'
import { useGetUserQuery } from "state/api";
import { useIsAuthenticated } from "@azure/msal-react";
import Login from 'scenes/login'


const Layout = () => {
  const userId = useSelector((state) => state.global.userId)
  const { data } = useGetUserQuery(userId);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const isAuthenticated = useIsAuthenticated();



  return (
    <Box display={isNonMobile ? 'flex': 'block'} width='100%' height='100%'>
        {isAuthenticated ? (
        <Box>
          <Sidebar user={data|| {}}
      isSideBarOpen={isSideBarOpen}
      setIsSideBarOpen={setIsSideBarOpen}
      drawerWidth="250px"
      isNonMobile={isNonMobile}
      ></Sidebar>
   
   <Box flexGrow={1}>
      <Navbar user={data || {}}
      isSideBarOpen={isSideBarOpen}
      setIsSideBarOpen={setIsSideBarOpen}
      ></Navbar>
      <Suspense fallback={<h1>Loading...</h1>}>
      <Outlet></Outlet>
      </Suspense>
      </Box></Box>): (<Box><Login></Login></Box>)}
        
      </Box>
  )
}

export default Layout