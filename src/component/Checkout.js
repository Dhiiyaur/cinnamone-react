import React, { useState, useEffect} from 'react'
import axios from 'axios';
import { apiUserCheckout, apiUserCart } from "../endpoint";

import { 
    
    Button,
    CssBaseline,
    Container,
    TextField,
    Typography,
    Grid,
    List,
    ListItemText,
    ListItem,
    CircularProgress
    

} from "@material-ui/core";

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core'

import Cookies from 'universal-cookie';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

function Checkout() {

    const cookies = new Cookies()
    const [loading, setLoading] = useState(true)
    const classes = useStyles();
    const { handleSubmit, control } = useForm();
    const [paymentOption, setpaymentOption] = useState();
    const [userOrder, setuserOrder] = useState([])
    const [info, setinfo] = useState('')

    const [formError, setformError] = useState(false)
    const [registerError, setRegisterError] = useState(false)
    
    useEffect(() => {

        let userToken = cookies.get("Cinnamone_Login_Token");
        axios.get(apiUserCart, {
            headers: {
              'Authorization': `Token ${userToken}`
            }
        })
        .then((res) => {
            console.log(res)
            setuserOrder(res.data.order_items)
            setinfo(res.data.total_price)
            setLoading(false)

        })

        .catch(error => {
            console.log(error.response)

        })
        
    
    }, [])

    const handlePaymentSelect = (event, newPayment) => {
        setpaymentOption(newPayment);
    };

    const theme = createMuiTheme({
        palette:{

            type:'dark'
        }

    })
    const onSubmitRegister = data => {


        if(paymentOption == undefined){
            setformError(true)
        }

        else{

            let userToken = cookies.get("Cinnamone_Login_Token");
            // axios.post('http://127.0.0.1:8000/api/checkout/',{
            axios.post(apiUserCheckout,{

                name        : data.name,
                address     : data.address,
                phone       : data.phone,
                payment_option : paymentOption
            },{
                                                
                headers : {
                    
                    'Authorization' : `Token ${userToken}`
            }}
            )
    
            .then((res) => {
                console.log(res.data)
                window.location.href='/'
                
    
            })
    
            .catch(error => {
                console.log(error.response)
                setRegisterError(true)
            })
        } 
        }



    return (
        <div>
            {/* <Container component="main" maxWidth="md" style={{ marginTop : 120 }}> */}
            {/* <Container component="main" style={{ marginTop : 120 }}> */}
            {loading && (

                <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 150 }}>
                    <CircularProgress color="secondary"/>
                </Grid>

            )}
            {!loading && (
            <Container>
            <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 100 }}>
            <Typography component="h1" variant="h5">
                    Checkout Form
            </Typography>
            </Grid>

            <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 50 }}>
                <CssBaseline />
                <Grid item md={8}>
                <div className={classes.paper}>

                    <form className={classes.form} onSubmit={handleSubmit(onSubmitRegister)}>
                    <Controller
                        name='name'
                        as={
                            <TextField
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                // autoComplete="username"
                                autoFocus
                            />
                    }

                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Required'
                        }}

                    />
                    <Controller
                        name='address'
                        as={

                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            id="address"
                            label="address"
                            name="address"
                            autoFocus
                        />
                    
                    }
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Required'
                        }}
                    />

                    <Controller
                        name='phone'
                        as={

                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            name="phone"
                            label="phone"
                            type="phone"
                            id="phone"
                            
                        />
                    }
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Required'
                        }}
                    />

                <br />
                <Typography variant="body2" color="textSecondary" component="p">
                            Payment Option
                </Typography>
                <br />
                <ToggleButtonGroup
                        value={paymentOption}
                        exclusive
                        onChange={handlePaymentSelect}
                        aria-label="lang selected"
                    >
                    <ToggleButton value="debit" aria-label="left aligned" className={classes.buttonColor}>
                        Debit Card
                    </ToggleButton>
                    <ToggleButton value="credit" aria-label="centered" className={classes.buttonColor}>
                        Credit Card
                    </ToggleButton>
                </ToggleButtonGroup>

                {formError && (
                    <Typography color='error'>
                        Select Payment Option
                    </Typography>
                    )}

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Order
                </Button>



                    </form>
                </div>
                </Grid>
                <Grid item md={4} style={{ marginTop : 30 }}>
                <Typography component="h6" variant="h6">
                    Order Detail
                </Typography>   
                <List>
                    {userOrder.map(item =>{   
                        return(
                        <ListItem>
                            <ListItemText primary= {item.product.product_name}
                                          secondary= {`Quantity: ${item.quantity}`}
                                          
                            />
                            <Typography variant="body2">
                                Rp. {item.final_price}
                            </Typography>
                        </ListItem>
                    )})}
                        <ListItem>
                            <ListItemText primary="Total price" />
                            <Typography variant="body2">
                                Rp.{info}
                            </Typography>
                        </ListItem>
                </List>

                </Grid>
                </Grid>
                </Container>
                )}
        </div>
    )
}

export default Checkout
