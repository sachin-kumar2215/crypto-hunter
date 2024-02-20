import axios from "axios";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../Config/Api";
import { useCryptoState } from "../CryptoContext";
import { useEffect, useState } from "react";
import CoinInfo from "../Components/CoinInfo";
import { Typography ,useTheme ,styled } from "@mui/material";


const Root = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  display:"flex",
  [theme.breakpoints.down('md')]: {
    flexDirection:"column",
    textAlign:"center",
  },
}));


const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = useCryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };
  function numberWithCommas(x=" ") {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  useEffect(() => {
    fetchCoin();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to extract English words from a string
  const extractEnglishWords = (text) => {
    if (text) {
      // Match English words (sequences of letters) excluding URLs
      const matches = text.match(/[A-Za-z]+(?![^\s]*:\/\/)/g);

      if (matches) {
        return matches.join(" ");
      }
    }
    return ""; // Return an empty string if text is undefined
  };

  const theme = useTheme();
  return (
    <Root>
      <div
        style={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 25,
          borderRight: "2px solid grey",
        }}
      >
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography
          variant="h3"
          style={{
            fontWeight: "bold",
            marginBottom: 20,
            fontFamily: "Montserrat",
          }}
        >
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          style={{
            width: "100%",
            fontFamily: "Montserrat",
            padding: 25,
            paddingBottom: 15,
            paddingTop: 0,
            textAlign: "justify",
          }}
        >
          {extractEnglishWords(coin?.description.en.slice(0,600))}.
        </Typography>
        <div style={{
          alignSelf:"start",
          padding:25,
          paddingTop:10,
          width:"100%",
        }}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={{
              fontWeight: "bold",
              marginBottom: 20,
              fontFamily: "Montserrat",
            }} >
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                color:"gold",
                fontFamily: "Montserrat",
              }}
            >
              {(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5"style={{
              fontWeight: "bold",
              marginBottom: 20,
              fontFamily: "Montserrat",
            }}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                color:"gold",
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={{
              fontWeight: "bold",
              marginBottom: 20,
              fontFamily: "Montserrat",
            }}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                color:"gold",
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
      </div>

      <CoinInfo coin={coin} />
    </Root>
  );
};

export default CoinPage;
