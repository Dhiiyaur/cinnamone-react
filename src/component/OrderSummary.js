import React, { useState, useEffect } from 'react'
import axios from 'axios';
import  { apiUserCart, apiUserAddItem, apiUserRemoveItem } from "../endpoint";
// import { useParams,Redirect } from "react-router-dom"

import {
    Grid,
    Container,
    CardMedia,
    Typography,
    Button,
    CircularProgress,
    ButtonGroup,
    ListItemText,
    ListItem,

 } from '@material-ui/core'

import Cookies from 'universal-cookie';

import IconButton from '@material-ui/core/IconButton';

import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';


function OrderSummary() {


    const cookies = new Cookies()
    const [isLoggedIn, setisLoggedIn] = useState(false)
    const [orderItems, setorderItems] = useState([])
    const [info, setinfo] = useState('')
    const imageLink = 'https://be-cinnamone.herokuapp.com'

    function userOrderData() {

        let userToken = cookies.get("Cinnamone_Login_Token");
        // console.log(userToken)

        axios.get(apiUserCart, {
            headers: {
              'Authorization': `Token ${userToken}`
            }
        })

        .then((res) => {
            // console.log(res.data)
            // console.log(res.data.order_items)
            setorderItems(res.data.order_items)
            setinfo(res.data.total_price)


        })

        .catch(error => {
            console.log(error.response)
        })
        
    }
  
    function tokenCheck(){
  
      let userToken = cookies.get("Cinnamone_Login_Token");

  
      if(userToken != undefined){
  
        setisLoggedIn(true)
        userOrderData();
  
      }else{

        window.location.href='/auth/signin/'


      }
  
    }

    useEffect(() => {

        tokenCheck()
    
      }, [])


    return (
        <div>
            {isLoggedIn && (
            <div>
            <Container maxWidth='md'>
                <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 100 }}>
                <Typography component="h1" variant="h5">
                        Order Summmary
                </Typography>
                </Grid>
                
                {orderItems.map(item =>{

                    return(
                        <div>
                            <Grid container spacing={3} m={2} style={{ marginTop : 30 }}>
                                <Grid item md={6} lg={3} xs={12}>
                                    <CardMedia
                                        component="img"
                                        alt=" "
                                        // height="500"
                                        // src={`http://127.0.0.1:8000${item.product.image}`}
                                        src={`${imageLink}${item.product.image}`}
                                    />
                                </Grid>
                                <Grid item md={6} lg={9} xs={12}>
                                    <ListItem>
                                        <ListItemText primary= {item.product.product_name}
                                                     secondary= {`Total Price: ${item.final_price}`}
                                                    
                                        />
                                        <ListItemText>
                                        <ListItemSecondaryAction>
                                        <IconButton color="secondary" 
                                                    aria-label="add to shopping cart" 
                                                    onClick={() => { 

                                                    let userToken = cookies.get("Cinnamone_Login_Token");
                                                    let postData = {
                                                        
                                                        slug : item.product.slug
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
                                                        console.log(error.response)

                                                    })

                                                    }}>
                                            <AddBoxIcon />
                                        </IconButton>
                                        {item.quantity}
                                        <IconButton color="secondary" 
                                                    aria-label="add to shopping cart"
                                                    onClick={() => { 

                                                        let userToken = cookies.get("Cinnamone_Login_Token");
                                                        let postData = {
                                                            
                                                            slug : item.product.slug
                                                        }
        
                                                        let config = {
                                                            
                                                            headers : {
                                                                
                                                                'Authorization' : `Token ${userToken}`
                                                        }}
                                                        
                                                        axios.post(apiUserRemoveItem, postData, config)
                                                        .then((res) => {
                                                            // console.log(res)
                                                            window.location.href='/order-summary/'
                                                
                                                        })
                                                
                                                        .catch(error => {
                                                            console.log(error.response)
        
                                                        })
                                            }}>
                                            <IndeterminateCheckBoxIcon />
                                        </IconButton>
                                        </ListItemSecondaryAction>
                                        </ListItemText>
                                    </ListItem>
                                </Grid>
                            </Grid>
                        </div>
                        )
                })}
                        
                <Grid item xs={12} style={{ marginTop : 50, marginBottom : 10}}>
                    
                    <Typography variant="body2" color='error' component="p">
                        Do not delay the purchase, adding items to your cart does not mean booking them.
                    </Typography>

                    <ListItem>
                        <ListItemText primary= {'The total amount of'}/>
                        <Typography variant="body2">
                            Rp. {info}
                        </Typography>
                    </ListItem>
                    <ButtonGroup fullWidth style={{ marginTop : 30}}>
                    <Button variant="contained" 
                            color="secondary"
                            onClick={() => { window.location.href='/checkout/' }}>
                        Checkout
                    </Button>
                    </ButtonGroup>
                    
                </Grid>
            
            </Container>
            </div>
            )}
        </div>
    )
}

export default OrderSummary
