import React, { useMemo, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import { Box, TextField, useTheme } from '@mui/material';
import Header from 'components/Header';
import { useGetPredictionsQuery } from 'state/api';
import { ResponsiveLine } from '@nivo/line';


const Predictions = () => {

  const theme = useTheme()

  const [search, setSearch] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const {data, isLoading} = useGetPredictionsQuery({search})

   const listOfProducts = useMemo(() => {
    if(!data) return []
    const {listOfProducts} = data

    return listOfProducts

  }, [data]) 

  const productsFiltered = useMemo(() => {
    if(!data) return []
    const {productsFiltered} = data
    return productsFiltered
  },[data])

console.log(productsFiltered)

  return (
    <Box m='1.5rem 1.5rem'>
      <Header title='PREDICTIONS' subtitle='Search for the products you wish to obtain their forecasting sales'></Header>
       {data && !isLoading ? (
        <Box width='100%' height='100%'>
       <Autocomplete
      loading={isLoading || !data}
        multiple
        id="tags-standard"
        options={listOfProducts}
        getOptionLabel={(option) => option}
        value={search}
        onChange={(event, newValue) => {
          setSearch(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }} 
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder="Search for more products"
          />
        )}
      /> 
        <ResponsiveLine data={productsFiltered}
        ></ResponsiveLine>
        </Box>
      
      ) : (<>Loading...</>)}
      
    </Box>
  )

}


export default Predictions