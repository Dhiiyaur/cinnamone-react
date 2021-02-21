import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { apiProductList } from "../endpoint";

import {
    Grid,
    Container,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Link,
    CircularProgress

 } from '@material-ui/core'

import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
 

import imageOne from "../bg/bgnew_1.jpg";
import imageTwo from "../bg/bgnew_2.jpg";
import imageThree from "../bg/bgnew_3.jpg";

import { Link as RouterLink } from "react-router-dom"
// import Cookies from 'universal-cookie';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';

import {MuiThemeProvider} from '@material-ui/core'

// const cookies = new Cookies()
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(6),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    root: {
        maxWidth: 345,

    },
    mobileText:{

        [theme.breakpoints.down("xs")]: {
            fontSize: 12
        }
    }
  }));

export default function Home() {

    const [productData, setproductData] = useState([])
    const [loading, setLoading] = useState(true)
    const classes = useStyles();

    const itemsLength = Array.from({ length: 5 });
    const items = itemsLength.map((item, index) => {
        const style = { width: 150 + index * 100 };
        return (<div className="item" style={style}>{index + 1}</div>);
    });

    const theme = createMuiTheme({
        palette:{

            type:'light'
        }

    })

    useEffect(() => {

        let mounted = true;
        // axios.get(apiBrowse)

        // .then(res =>{
        //     if(mounted){
        //         // console.log(res.data)
        //         setList(res.data)
        //         setLoading(false)
        //     }
        // })

        async function fetchData(){
            const productListData = await axios.get(apiProductList);
            if(mounted){
                console.log(productListData.data)
                setproductData(productListData.data)
                setLoading(false)

            }
        }

        fetchData()
        
        return () => mounted = false;

    }, [])

    const productList = (

        <div>
            <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 100 }}>
                {loading && (
                    <CircularProgress color="secondary"/>
                )}
            </Grid>
            <Grid container spacing={3} m={2} justify='center'>
            {productData.map(item =>{
            
                return(
                <Grid item lg={3} xs={6}>
                <Card className={classes.root} style={{ height: '100%' }}>
                    <CardActionArea>
                    <Link underline='none' component={RouterLink} to={`/product/${item.slug}`}>
                    <CardMedia
                        component="img"
                        alt=" "
                        height="350"
                        src={item.image}
                        title="manga title"
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p" className={classes.mobileText}>
                            {item.product_name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" className={classes.mobileText}>
                            Rp. {item.price}
                        </Typography>
                    </CardContent>
                    </Link>
                    </CardActionArea>
                </Card>
                </Grid>
            )})}
            </Grid>
        </div>
    )

    return (
        <div>
            
            <MuiThemeProvider theme={theme}>
                
                {/* <Typography variant="h4" component="h4" color='textPrimary'>
                    Cinnamone
                </Typography> */}

            <AliceCarousel
                    autoWidth
                    autoHeight
                    autoPlay
                    // autoPlayControls
                    autoPlayStrategy="none"
                    autoPlayInterval={2000}
                    animationDuration={2000}
                    animationType="fadeout"
                    infinite
                    mouseTracking
                    touchTracking={true}
                    // disableDotsControls
                    disableButtonsControls
                    items={items}
            >
                <img src={imageOne} className="sliderimg"/>
                <img src={imageTwo} className="sliderimg"/>
                <img src={imageThree} className="sliderimg"/>

            </AliceCarousel>
            <Container>     
                {productList}
            </Container>
            </MuiThemeProvider>
        </div>
    )
}
