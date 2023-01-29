import { Box, Typography, TextField, MenuItem } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';
import { colors } from 'theme';
import { useState } from 'react';
import { mockLineData as data } from './mockData';

const status = [
  {
    value: 'month',
    label: 'Tháng',
  },
  {
    value: 'year',
    label: 'Năm',
  },
];

const LineChart = ({ isDashboard = false }) => {
  const [value, setValue] = useState<string>('');

  return (
    <Box
      sx={{
        height: '478px',
        borderRadius: '12px',
        boxShadow: '0 0 20px rgba(0,0,0,0.2)',
        p: '20px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '20px',
        }}
      >
        <Box>
          <Typography sx={{ fontSize: '12px', color: '#666', fontWeight: 500 }}>
            Số người tham gia
          </Typography>
          <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: 800 }}>500</Typography>
        </Box>

        <Box>
          <Typography sx={{ fontSize: '12px', color: '#666', fontWeight: 500 }}>
            Số người hoàn thành
          </Typography>
          <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: 800 }}>500</Typography>
        </Box>

        <Box>
          <Typography sx={{ fontSize: '12px', color: '#666', fontWeight: 500 }}>
            Đánh giá
          </Typography>
          <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: 800 }}>4.5</Typography>
        </Box>

        <Box ml="auto">
          <TextField
            id="standard-select-currency"
            select
            size="small"
            value={value}
            sx={{
              fontSize: '14px',
            }}
            onChange={(e) => setValue(e.target.value)}
          >
            {status.map((option) => (
              <MenuItem sx={{ fontSize: '14px' }} key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>

      <Box
        sx={{
          height: '400px',
        }}
      >
        <ResponsiveLine
          data={data}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: colors.grey[900],
                },
              },
              legend: {
                text: {
                  fill: colors.grey[900],
                },
              },
              ticks: {
                line: {
                  stroke: colors.grey[900],
                  strokeWidth: 1,
                },
                text: {
                  fill: colors.grey[900],
                },
              },
            },
            legends: {
              text: {
                fill: colors.grey[900],
              },
            },
            tooltip: {
              container: {
                background: colors.grey[200],
                color: colors.grey[900],
              },
            },
          }}
          colors={
            isDashboard
              ? {
                  datum: 'color',
                }
              : { scheme: 'nivo' }
          }
          margin={{ top: 40, right: 140, bottom: 40, left: 50 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          curve="catmullRom"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : 'transportation',
            legendOffset: 36,
            legendPosition: 'middle',
          }}
          axisLeft={{
            tickValues: 5,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : 'count',
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          enableGridX={false}
          enableGridY={false}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default LineChart;
