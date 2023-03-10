import React from 'react'
import {MicrosoftLoginButton} from 'react-social-login-buttons';
import {  useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import { Box, List, ListItem } from '@mui/material';
import profileImage from '../../assets/nakheel.png'
import { useDispatch } from 'react-redux';
import { loginSuccess } from 'state';


const SignIn = () => {
  const { instance } = useMsal();
  const dispatch = useDispatch()
  //const [userName, setUserName] = useState('')

    const handleLogin = (loginType) => {
        if (loginType === "popup") {
            instance.loginPopup(loginRequest).catch(e => {
                console.log(e);
            }).then(() => {
              const userData = JSON.parse(sessionStorage.getItem(sessionStorage.key(1)))
              dispatch(loginSuccess(userData['name']))
            });
        }
        
        //setUserName(userData['name'])
        //navigate('/dashboard')
    }
  return (
    <Box >
    <List >
      <ListItem>
      <Box   
                component="img"
                alt="profile"
                src={profileImage}
                height="120px"
                width="120px"
                borderRadius="7%"
                sx={{ objectFit: "cover" }}>
                </Box>
                </ListItem>
                <ListItem>
                <Box>
                <MicrosoftLoginButton onClick={() => handleLogin("popup")}>
      Sign in with Microsoft
    </MicrosoftLoginButton>
                </Box>
                </ListItem>
                
    </List>
    </Box>
    
  )
}

export default SignIn