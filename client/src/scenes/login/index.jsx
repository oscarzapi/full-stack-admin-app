import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
import { Box, List, ListItem } from '@mui/material'
import React, { Suspense } from 'react'
import SignIn from 'scenes/signin';
import profileImage from '../../assets/nakheel.png'


const Login = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
      <Box >
       
        {isAuthenticated ? (
          <Box display='flex' justifyContent='center' m='1.5rem'>
           <List>
           <ListItem>
           <Box   
                    component="img"
                alt="profile"
                src={profileImage}
                height="250px"
                width="250px"
                borderRadius="7%"
                sx={{ objectFit: "cover" }}>
                </Box>
     
           </ListItem>
           <ListItem>
            <h2>Welcome back user!!</h2>
           </ListItem>
           </List>
           </Box>
            
            

        ): (
          <SignIn /> 
        )}
        
      </Box>
   
  )
}

export default Login

