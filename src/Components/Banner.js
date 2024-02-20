import { Container ,Typography} from "@mui/material"
import Carousel from "./Carousel"


const Banner = () => {
  return (
    <div style={{backgroundImage:'url(./banner2.jpg)'}}>
        <Container
            style={{
                height:400,
                display:"flex",
                flexDirection:"column",
                paddingTop:25,
                justifyContent:"space-around"
            }}
        >
            <div style={{
                display:"flex",
                height: "40%",
                flexDirection:"column",
                paddingTop:25,
                justifyContent:"center",
                textAlign:"center"
            }}>
            <Typography 
              style={{
                fontFamily: "Montserrat",
                fontWeight: "bold",
                cursor: "pointer",
                marginBottom:15,
                color:"white"
              }}
              variant='h2'
              >
              Crypto-hunter
            </Typography>
            <Typography 
              style={{
                color:"darkgray",
                textTransform:"capitalize",
                fontFamily:"Montserrat"
              }}
              variant='subtitle2'
              >
              Get all the infomation regarding your favourite Crypto Currency
            </Typography>
            </div>

              <Carousel/>
        </Container>
    </div>
  )
}

export default Banner