import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
import { Box, List, ListItem } from '@mui/material'
import React, { Suspense } from 'react'
import { useSelector } from 'react-redux';
import SignIn from 'scenes/signin';
import profileImage from '../../assets/nakheel.png'


const Login = () => {


  const isAuthenticated = useIsAuthenticated();
  const userName = useSelector((state) => state.global.userName)

  return (
      <Box >
       
        {isAuthenticated ? (
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
            {<h2>Welcome back {userName}!!</h2>}
           </ListItem>
           </List>
            
            

        ): (
          <SignIn /> 
        )}
        
      </Box>
   
  )
}

export default Login

