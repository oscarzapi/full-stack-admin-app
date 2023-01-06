import { Box } from '@mui/material'
import Header from 'components/Header'
import React from 'react'
import BreakdownChart from 'components/BreakdownChart'

const Breakdown = () => {
  return (
    <Box m='1.5rem 1.5rem'>
      <Header title='BREAKDOWN OF SALES' subtitle='View sales by category'></Header>
    <Box mt="4rem" height="70vh">
      <BreakdownChart></BreakdownChart>
    </Box>
    
    </Box>
  )
}

export default Breakdown