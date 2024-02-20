import React, { useState, useEffect } from 'react';
import { HistoricalChart } from '../Config/Api';
import { useCryptoState } from '../CryptoContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CircularProgress, createTheme, ThemeProvider, useTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Line  } from 'react-chartjs-2'; // Import Line from react-chartjs-2
import SelectButton from './SelectButton';
import { ChartDays } from '../Config/data';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const [flag, setflag] = useState(false)
  const { currency } = useCryptoState();
  const { id } = useParams();

  const fetchHistoricalData = async () => {
    try {
      const { data } = await axios.get(HistoricalChart(id, days, currency));
      setHistoricalData(data.prices);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };
  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days, id]);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const theme = useTheme();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div
        style={{
          width: '75%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 25,
          margin: 40,
          [theme.breakpoints.down('md')]: {
            width: '100%',
            marginTop: 0,
            padding: 20,
            paddingTop: 0,
          },
        }}
      >
        {!historicalData ? (
          <CircularProgress style={{ color: 'gold' }} size={250} thickness={1} />
        ) : (<>
                      <Line
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {ChartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
        </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
