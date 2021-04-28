import React, { useState, useEffect } from 'react'
import axios from 'axios';
import  { 
    apiUserCart, 
    apiUserAddItemQuantity, 
    apiUserDecItemQuantity 
} from "../endpoint";
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
    IconButton,
    ListItemSecondaryAction


 } from '@material-ui/core'

import Cookies from 'universal-cookie';

import {
    DeleteIcon,
    AddBoxIcon,
    IndeterminateCheckBoxIcon

} from '@material-ui/icons/Delete'


function OrderSummary() {


    const cookies = new Cookies()
    const [isLoggedIn, setisLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)
    const [orderItems, setorderItems] = useState([])
    const [info, setinfo] = useState('')
    const [errormessage, seterrormessage] = useState('')
    // const imageLink = 'https://be-cinnamone.herokuapp.com'

    function userOrderData() {

        let userToken = cookies.get("Cinnamone_Login_Token");
        // console.log(userToken)

        axios.get(apiUserCart, {
            headers: {
              'Authorization': `Token ${userToken}`
            }
        })

        .then((res) => {

            setorderItems(res.data.data)
            setinfo(res.data.paid_amount)
            setLoading(false)

        })

        .catch(error => {
            console.log(error.response)
            console.log(error.response.data)
            seterrormessage(error.response.data.messages)
            setLoading(false)
            // window.location.href='/'
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
            {loading ? (

                <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 150 }}>
                <CircularProgress color="secondary"/>
                </Grid>
                
            ) : (

                <div>
                {isLoggedIn ? (

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
                                            // src={`${imageLink}${item.product.image}`}
                                            src={item.image}
                                        />
                                    </Grid>
                                    <Grid item md={6} lg={9} xs={12}>
                                        <ListItem>
                                            <ListItemText primary= {item.product}
                                                        secondary= {`Total Price: ${item.total_price}`}
                                                        
                                            />
                                            <ListItemText>
                                            <ListItemSecondaryAction>
                                            <IconButton 
                                                color="secondary" 
                                                aria-label="add to shopping cart" 
                                                onClick={() => { 

                                                    let userToken = cookies.get("Cinnamone_Login_Token");
                                                    let postData = {
                                                        
                                                        id : item.id
                                                    }

                                                    let config = {
                                                        
                                                        headers : {
                                                            
                                                            'Authorization' : `Token ${userToken}`
                                                    }}

                                                    axios.post(apiUserAddItemQuantity, postData, config)
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
                                            <IconButton 
                                                color="secondary" 
                                                aria-label="remove to shopping cart"
                                                onClick={() => { 

                                                let userToken = cookies.get("Cinnamone_Login_Token");
                                                let postData = {
                                                    
                                                    id : item.id
                                                }

                                                let config = {
                                                    
                                                    headers : {
                                                        
                                                        'Authorization' : `Token ${userToken}`
                                                }}
                                                
                                                axios.post(apiUserDecItemQuantity, postData, config)
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
                                            <IconButton>
                                                <DeleteIcon />
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

                ) : (

                    <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 50 }}>
                    <Typography component="h1" variant="h5">
                            {errormessage}
                    </Typography>
                    </Grid>
                )}
                </div>
            )}
        </div>
    )}

export default OrderSummary
