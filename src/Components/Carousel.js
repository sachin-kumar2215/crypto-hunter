import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useCryptoState } from '../CryptoContext'
import { TrendingCoins } from '../Config/Api'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
const Carousel = () => {
    const [trending, setTrending] = useState([]);
    const { currency, symbol } = useCryptoState();

    const fetchTrendingCoins = async () => {
        const response = await axios.get(TrendingCoins(currency));
        const jsonData = response.data; // Extract the data from the response
        setTrending(jsonData);
        console.log(jsonData);
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    useEffect(() => {
        fetchTrendingCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])

    const items = trending.map((coin) => {
        let profit = coin?.price_change_percentage_24h >= 0;

        return (
            <Link style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                textTransform: "uppercase",
                color: "white",
            }}
                to={`/coins/${coin.id}`}>
                <img
                    src={coin?.image}
                    alt={coin.name}
                    height="80"
                    style={{ marginBottom: 10 }}
                />
                <span style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    color: "white",
                }}>
                    {coin?.symbol}
                    &nbsp;
                    <span
                        style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                        }}
                    >
                        {profit && "+"}
                        {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                    <span style={{ fontSize: 22, fontWeight: 500 }} >
                        {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                    </span>
                </span>
            </Link>
        );
    });

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    }

    return (
        <div style={{
            color: "white",
            height: "50%",
            display: "flex",
            alignItems: "center"
        }}>
            <AliceCarousel mouseTracking infinite autoPlayInterval={1000} animationDuration={1500}
                disableDotsControls
                responsive={responsive}
                autoPlay
                items={items}
                disableButtonsControls
            >

            </AliceCarousel>
        </div>
    )
}

export default Carousel