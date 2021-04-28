import React, { useState, useEffect } from 'react'
import axios from 'axios';
import  { 
    apiUserCart, 
    apiUserAddItemQuantity, 
    apiUserDecItemQuantity,
    apiUserRemoveItem 
} from "../endpoint";

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
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';


export default function OrderSummary() {

    const cookies = new Cookies()
    const [isLoggedIn, setisLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)
    const [orderItems, setorderItems] = useState([])
    const [info, setinfo] = useState('')
    const [errormessage, seterrormessage] = useState('')
    const [errormessageCheckout, seterrormessageCheckout] = useState(false)
    const [noOrder, setnoOrder] = useState(false)

    const userOrderData = () => {

        let userToken = cookies.get("Cinnamone_Login_Token");
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
            // console.log(error.response)
            // console.log(error.response.data)
            
            seterrormessage(error.response.data.messages)
            setnoOrder(true)
            setLoading(false)
            // console.log(errormessage)
            // window.location.href='/'
        })
        
    }

    const tokenCheck =() => {  
      let userToken = cookies.get("Cinnamone_Login_Token");
      if(userToken != undefined){
  
        setisLoggedIn(true)
        userOrderData();
  
      }else{

        window.location.href='/auth/signin/'
      }
  
    }

    // DATA

    const addQuantityItem = (id) => {

        let userToken = cookies.get("Cinnamone_Login_Token");
        let postData = {
            
            id : id
        }
        let config = {
            headers : {
                
                'Authorization' : `Token ${userToken}`
        }}

        axios.post(apiUserAddItemQuantity, postData, config)
        .then((res) => {

            window.location.href='/order-summary/'

        })
        .catch(error => {
            console.log(error.response)

        })
    }

    const decQuantityItem = (id) => {
        let userToken = cookies.get("Cinnamone_Login_Token");
        let postData = {   
            id : id
        }
        let config = {
            headers : {
                
                'Authorization' : `Token ${userToken}`
        }}
        
        axios.post(apiUserDecItemQuantity, postData, config)
        .then((res) => {
            window.location.href='/order-summary/'

        })
        .catch(error => {
            console.log(error.response)

        })
    }

    const removeCartItem = (id) => {
        let userToken = cookies.get("Cinnamone_Login_Token");
        let postData = {   
            id : id
        }
        let config = {
            headers : {
                
                'Authorization' : `Token ${userToken}`
        }}

        axios.post(apiUserRemoveItem, postData, config)
        .then((res) => {
            window.location.href='/order-summary/'

        })
        .catch(error => {
            console.log(error.response)

        })
    }

    const checkoutOrder = () => {

        if (noOrder) {

            seterrormessageCheckout(true)

        } else {

            window.location.href='/checkout/'
        }
    }

    const loadingData = (
        <div>
        <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 150 }}>
        <CircularProgress color="secondary"/>
        </Grid>
        </div>
    ) 

    const NoOrderData = (
        <div>
        <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 50,marginBottom : 300, color : "red" }}>
        <Typography component="h1" variant="h5">
            {errormessage}
        </Typography>
        </Grid>
        </div>
    ) 


    const NoOrderDataCheckout = (
        <div>
            <Typography variant="body2" color='error' component="p" style={{ marginTop : 10}}>
                Must order something
            </Typography>
        </div>
    )

    const OrderData = (

        <div>
        <Container maxWidth = 'md'>
        <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 100 }}>
            <Typography component="h1" variant="h5">
                Order Summmary
            </Typography>
        </Grid>

        {noOrder && (NoOrderData)}

        {orderItems.map((item, index) =>{
            return(
                <div>
                <Grid container spacing={3} m={2} style={{ marginTop : 30 }}>
                    <Grid item md={6} lg={3} xs={12}>
                        <CardMedia
                            component="img"
                            alt=" "
                            src={item.image}
                        />
                    </Grid>
                    <Grid item md={6} lg={9} xs={12}>
                        <ListItem>
                        <ListItemText 
                            primary= {item.product}
                            secondary= {`Total Price: ${item.total_price}`}      
                        />
                        <ListItemText>
                        <ListItemSecondaryAction>
                        <IconButton
                            color="secondary" 
                            aria-label="Add Quantity Item"
                            onClick = {() =>{addQuantityItem(item.id)}}>
                            <AddBoxIcon/>
                        </IconButton>
                        {item.quantity}
                        <IconButton
                            color="secondary" 
                            aria-label="Dec Quantity Item"
                            onClick = {() => {decQuantityItem(item.id)}}>
                            <IndeterminateCheckBoxIcon/>
                        </IconButton>
                        <IconButton
                            color="secondary" 
                            aria-label="Remove Item"
                            onClick = {() =>{removeCartItem(item.id)}}>
                            <DeleteIcon/>
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
                    onClick={() => {checkoutOrder()}}>
                Checkout
            </Button>
            </ButtonGroup>

        {errormessageCheckout && (NoOrderDataCheckout)}

        </Grid>
        </Container>
        </div>
    ) 

    useEffect(() => {

        tokenCheck()
    
      }, [])

    return (
        <div>
            {loading ? (loadingData) : (OrderData)}
        </div>
    )
}