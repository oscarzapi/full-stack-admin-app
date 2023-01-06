import { Box, useTheme } from '@mui/material'
import { ResponsivePie } from '@nivo/pie'
import React from 'react'
import { useGetSalesQuery } from 'state/api'

const BreakdownChart = ({ isDashboard = false }) => {

  const theme = useTheme()
  const {data, isLoading} = useGetSalesQuery()

  if(!data || isLoading) return 'Loading...'
  const colors = [
    theme.palette.secondary[200],
    theme.palette.secondary[700],
    theme.palette.secondary[100],
    theme.palette.secondary[400],
  ];

  const formattedData = Object.entries(data[0].salesByCategory).map(
    ([category,sales], i) => ({
        id:category,
        label:category,
        value: sales,
        color:colors[i]
    })
  )

  return (
    <Box height={isDashboard ? "400px" : "100%"}
    width={undefined}
    minHeight={isDashboard ? "325px" : undefined}
    minWidth={isDashboard ? "325px" : undefined}
    position="relative">
        <ResponsivePie data={formattedData}
        theme={{
            axis: {
              domain: {
                line: {
                  stroke: theme.palette.secondary[200],
                },
              },
              legend: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              ticks: {
                line: {
                  stroke: theme.palette.secondary[200],
                  strokeWidth: 1,
                },
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
            },
            tooltip: {
              container: {
                color: theme.palette.primary.main,
              },
            },
          }}
          margin='10px 10px 10px 10px'
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsDiagonalLength={5}
        arcLinkLabelsStraightLength={6}
        arcLinkLabelsTextOffset={2}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
        ></ResponsivePie>
    </Box>
  )
}

export default BreakdownChart