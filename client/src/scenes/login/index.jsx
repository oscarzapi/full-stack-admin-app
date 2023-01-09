import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
import { Box } from '@mui/material'
import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom';
import { SignInButton } from "../../components/SignInButton";


const Login = () => {
  const isAuthenticated = useIsAuthenticated();



  return (
      <Box display='flex' justifyContent='center' m='1.5rem'>
        {isAuthenticated ? (
          <Box>
            Welcome back user
          </Box>

        ): (
          <SignInButton /> 
        )}
        
      </Box>
   
  )
}

export default Login

