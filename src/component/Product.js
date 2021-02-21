import React, { useState, useEffect } from 'react'
import axios from 'axios';
import  { apiProduct, apiUserAddItem } from "../endpoint";
import { useParams } from "react-router-dom"



import {
    Grid,
    Container,
    // Card,
    // CardActionArea,
    // CardContent,
    CardMedia,
    Typography,
    // Link,
    Button,
    CircularProgress

 } from '@material-ui/core'

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Cookies from 'universal-cookie';

function Product() {

    const cookies = new Cookies()
    const [productDetailData, setproductDetailData] = useState({})
    const [loading, setLoading] = useState(true)
    const { productName } = useParams()
    const imageLink = 'https://be-cinnamone.herokuapp.com'
    useEffect(() => {

        let mounted = true;

        async function fetchData(){
            const productData = await axios.get(apiProduct, {
                params:{

                    productName:productName,
                    
                }
            })

            if(mounted){
                // console.log(productData.data)
                setproductDetailData(productData.data)
                setLoading(false)
    
            }
        }
    
        fetchData()
        
        return () => mounted = false;
    
    }, [])

    
    return (
        <div>
            {loading && (

            <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 150 }}>
                <CircularProgress color="secondary"/>
            </Grid>

            )}
            {!loading && (
            <Container>
            <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 100 }}>
            <Grid item md={6}>
                <CardMedia
                        component="img"
                        alt=" "
                        // height="180"
                        // src={`http://127.0.0.1:8000${productDetailData.image_url}`}
                        src={`${imageLink}${productDetailData.image_url}`}
                        
                />
            </Grid>
            <Grid item md={6}>
                <Typography variant="h4" color="textPrimary" component="h4">
                            {productDetailData.product_name}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="h6">
                            Rp. {productDetailData.price}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="h6">
                            Description
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                            {productDetailData.description}
                </Typography>
                <br />
                <br />
                <Button variant="contained" 
                        color="secondary"
                        startIcon={<ShoppingCartIcon />}
                        onClick={() => { 

                            // console.log('-');
                            // console.log(item.product.slug);
                            let userToken = cookies.get("Cinnamone_Login_Token");
                            let postData = {
                                
                                slug : productDetailData.slug
                            }

                            let config = {
                                
                                headers : {
                                    
                                    'Authorization' : `Token ${userToken}`
                            }}
                            
                            axios.post(apiUserAddItem, postData, config)
                            .then((res) => {
                                // console.log(res)
                                window.location.href='/order-summary/'
                    
                            })
                    
                            .catch(error => {
                                // console.log(error.response)
                                window.location.href='/auth/signin'

                            })
                        
                }}>                                   
                                    
                    Add To Cart
                </Button>
            </Grid>
            </Grid>
            </Container>
            )}
        </div>
    )
}

export default Product
