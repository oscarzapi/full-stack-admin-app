import React, { useState } from 'react'
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, Search, SettingsOutlined, ArrowDropDownOutlined } from '@mui/icons-material'
import FlexBetween from './FlexBetween'
import { useDispatch } from 'react-redux'
import { setMode } from 'state'
import profileImage from 'assets/profile.jpg'
import { useTheme, AppBar, Toolbar, IconButton, InputBase, Button, Box, Typography, Menu,
    MenuItem} from '@mui/material'
import { SignInButton } from './SignInButton'
import { useIsAuthenticated } from "@azure/msal-react";
import { SignOutButton } from './SignOutButton'


const Navbar = ({userData, userName, isSideBarOpen, setIsSideBarOpen}) => {
    const dispatch = useDispatch()
    const theme = useTheme()
    const isAuthenticated = useIsAuthenticated();



    const [anchorEl, setAnchorEl] = useState(null)
    const isOpen = Boolean(anchorEl);
    const handleClick = event => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null);


  return (
    <AppBar sx={{position:'static', background:'none', boxShadow: 'none'}}>
<Toolbar>
            {/* LEFT SIDE */}
    <FlexBetween>
        <IconButton onClick={()=> {setIsSideBarOpen(!isSideBarOpen)}}>
            <MenuIcon></MenuIcon>
        </IconButton>
        <FlexBetween
        backgroundColor={theme.palette.background.alt}
        borderRadius='9px'
        gap='3rem'
        p='0.1rem 1.5rem'>
            <InputBase placeholder='Search...'></InputBase>
            <IconButton>
                <Search></Search>
            </IconButton>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap='1.5rem'>
            <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode ==='dark' ? (
                    <DarkModeOutlined sx={{fontSize:'25px'}}></DarkModeOutlined>
                ): (<LightModeOutlined sx={{fontSize:'25px'}}></LightModeOutlined>)}
            </IconButton>
            <IconButton>
                <SettingsOutlined sx={{fontSize:'25px'}}></SettingsOutlined>
            </IconButton>
            <FlexBetween>
                <Button onClick={handleClick} sx={{display:'flex',
            justifyContent:'space-between',
            alignItems: 'center',
            textTransform: 'none',
            gap:'1rem',
            color: theme.palette.secondary[50]
            }}>
                <Box component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}>
                </Box>
                <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  >
                    {userName}
                  </Typography>
                  <Typography
                  fontSize="0.75rem"
                  
                >
                  {userData.occupation}
                </Typography>
                </Box>
                <ArrowDropDownOutlined
                sx={{  fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
            >
<MenuItem >
{ isAuthenticated ? <SignOutButton /> : <SignInButton /> }
</MenuItem>
            </Menu>
            {isAuthenticated ? <span>Signed in</span> : <SignInButton></SignInButton> }               
            </FlexBetween>
        </FlexBetween>
    </FlexBetween>
</Toolbar>
    </AppBar>
  )
}

export default Navbar