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

  const dataFiltered = useMemo(() => {
    if(!data) return []
    const { dataFiltered, predictionsFiltered} = data
    console.log(predictionsFiltered)
    return dataFiltered
  },[data])

  return (
    <Box m='1.5rem 1.5rem'>
      <Header title='PREDICTIONS' subtitle='Search for the products you wish to obtain their forecasting sales'></Header>
       {dataFiltered && !isLoading ? (
        <Box height='75vh' m='0.5rem' >
          <Box><Autocomplete
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
      /> </Box>
      <Box height='100vh' mb='1rem'>
      <ResponsiveLine data={dataFiltered} 
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.secondary[50],
            },
          },
          legend: {
            text: {
              fill: theme.palette.secondary[50],
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary[50],
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.secondary[50],
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary[50],
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}
      //colors={{ datum: "color" }}
      margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 90,
        legend: "Date",
        legendOffset: 60,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Total",
        legendOffset: -50,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      /* pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12} */
      useMesh={true}
      legends={[
        {
          anchor: "top-right",
          direction: "column",
          justify: false,
          translateX: 50,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
        ></ResponsiveLine>
      </Box>
        
        </Box>
      
      ) : (<>Search for one or more products...</>)}
      
    </Box>
  )

}


export default Predictions