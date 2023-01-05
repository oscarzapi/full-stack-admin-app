import React from 'react'
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, Search, SettingsOutlined, ArrowDropDownOutlined } from '@mui/icons-material'
import FlexBetween from './FlexBetween'
import { useDispatch } from 'react-redux'
import { setMode } from 'state'
import profileImage from 'assets/profile.jpg'
import { useTheme, AppBar, Toolbar, IconButton, InputBase, Button, Box, Typography, Menu,
    MenuItem} from '@mui/material'

const Navbar = ({user, isSideBarOpen, setIsSideBarOpen}) => {
    const dispatch = useDispatch()
    const theme = useTheme()


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
                <Button sx={{display:'flex',
            justifyContent:'space-between',
            alignItems: 'center',
            textTransform: 'none',
            gap:'1rem'
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
                  sx={{ color: theme.palette.mode === 'dark' ? '#F0F0F0': '#78A1BB' }}>
                    {user.name}
                  </Typography>
                  <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.mode === 'dark' ? '#EBF5EE': '#87A8B9' }}
                >
                  {user.occupation}
                </Typography>
                </Box>
                <ArrowDropDownOutlined
                sx={{ color: theme.palette.mode === 'dark' ? '#F0F0F0': '#78A1BB', fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
<MenuItem >Log Out</MenuItem>
            </Menu>
            </FlexBetween>
        </FlexBetween>
    </FlexBetween>
</Toolbar>
    </AppBar>
  )
}

export default Navbar