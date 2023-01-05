import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
  } from "@mui/material";
import React, { useEffect, useState } from 'react'
import FlexBetween from './FlexBetween'
import profileImage from '../assets/nakheel.png'
import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
  } from "@mui/icons-material";
  import { useLocation, useNavigate } from "react-router-dom";


const Sidebar = ({user,
    isSideBarOpen,
    setIsSideBarOpen,
    drawerWidth, isNonMobile}) => {

        const theme = useTheme()
        const {pathname} = useLocation()
        const [active, setActive] = useState('')
        const navigate = useNavigate()

        useEffect(() => {
            setActive(pathname.substring(1))
        }, [pathname])
        const navItems = [
            {
              text: "Dashboard",
              icon: <HomeOutlined />,
            },
            {
              text: "Client Facing",
              icon: null,
            },
            {
              text: "Products",
              icon: <ShoppingCartOutlined />,
            },
            {
              text: "Customers",
              icon: <Groups2Outlined />,
            },
            {
              text: "Transactions",
              icon: <ReceiptLongOutlined />,
            },
            {
              text: "Geography",
              icon: <PublicOutlined />,
            },
            {
              text: "Sales",
              icon: null,
            },
            {
              text: "Overview",
              icon: <PointOfSaleOutlined />,
            },
            {
              text: "Daily",
              icon: <TodayOutlined />,
            },
            {
              text: "Monthly",
              icon: <CalendarMonthOutlined />,
            },
            {
              text: "Breakdown",
              icon: <PieChartOutlined />,
            },
            {
              text: "Management",
              icon: null,
            },
            {
              text: "Admin",
              icon: <AdminPanelSettingsOutlined />,
            },
            {
              text: "Performance",
              icon: <TrendingUpOutlined />,
            },
          ];


  return (
    <Box component='nav'>
        {isSideBarOpen && (
            <Drawer 
            open={isSideBarOpen}
            onClose={() => setIsSideBarOpen(false)}
            variant="persistent"
            anchor="left"
            sx={{
              width: drawerWidth,
              "& .MuiDrawer-paper": {
                color: theme.palette.secondary[200],
                backgroundColor: theme.palette.background.alt,
                boxSixing: "border-box",
                borderWidth: isNonMobile ? 0 : "2px",
                width: drawerWidth,
              },
            }}
          >
            <Box width='100%'>
                <Box m='1.5rem 2rem 2rem 3rem'>
                    <FlexBetween color={theme.palette.secondary.main}>
                    <Box display="flex" alignItems="center" gap="0.5rem" 
                    component="img"
                alt="profile"
                src={profileImage}
                height="80px"
                width="90px"
                borderRadius="10%"
                sx={{ objectFit: "cover" }}>
                </Box>
                {!isNonMobile && (
                    <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
                        <ChevronLeft></ChevronLeft>
                    </IconButton>
                )}
                    </FlexBetween>
                </Box>
                <List>
                    {navItems.map(({text,icon}) => {
                        if(!icon){
                            return (
                                <Typography key={text} sx={{m:'2.25rem 0 1rem 3rem'}}></Typography>
                            )
                        }
                        const lcText = text.toLowerCase()
                        return (
                            <ListItem key={text} disablePadding>
                                <ListItemButton onClick={() => {
                                    navigate(`/${lcText}`)
                                    
                                }}
                                sx={{
                                    backgroundColor: active === lcText 
                                    ? '#F0F0F0'
                            : "transparent",
                            color: active === lcText &&
                            theme.palette.mode === 'dark' ? '#78A1BB': active !== lcText &&
                            theme.palette.mode === 'dark' ? '#F0F0F0' : theme.palette.mode === 'light' ? '#78A1BB': active !== lcText &&
                            theme.palette.mode === 'light' ? '#78A1BB' : '#22223b'
                                }}>
                                    <ListItemIcon
                                    sx={{
                                        ml:'2rem',
                                        color:
                                        active === lcText &&
                            theme.palette.mode === 'dark' ? '#78A1BB': active !== lcText &&
                            theme.palette.mode === 'dark' ? '#F0F0F0' : theme.palette.mode === 'light' ? '#78A1BB': active !== lcText &&
                            theme.palette.mode === 'light' ? '#78A1BB' : '#22223b'
                                    }}>{icon}</ListItemIcon>
                                    <ListItemText primary={text}></ListItemText>
                                {active === lcText && (
                                    <ChevronRightOutlined sx={{ ml: "auto" }}></ChevronRightOutlined>
                                )}
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </List>
            </Box>

            <Box position='absolute' bottom='2rem'></Box>

          </Drawer>
        )}
    </Box>
  )
}

export default Sidebar