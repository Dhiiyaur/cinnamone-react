import React, { useState } from 'react'
import axios from 'axios';
import { apiLogin } from "../endpoint";

import { 
    Avatar,
    Button,
    CssBaseline,
    Container,
    TextField,
    Link,
    Grid,
    Typography,

} from "@material-ui/core";

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import Cookies from 'universal-cookie';

import {MuiThemeProvider, createMuiTheme } from '@material-ui/core'

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

export default function SignIn() {

    const classes = useStyles();
    const { handleSubmit, control, errors: fieldsErrors, reset } = useForm();
    const [loginError, setloginError] = useState(false)
    const cookies = new Cookies()

    const theme = createMuiTheme({
        palette:{

            type:'dark'
        }

    })

    const onSubmitLogin = data => {

        axios.post(apiLogin,{

            username   : data.username,
            password: data.password
        })
        
        .then((res) => {
            console.log(res.data.key)
            let date = new Date(2030, 12)
            cookies.set("Cinnamone_Login_Token", res.data.key, { path: "/", expires: date })
            window.location.href='/'

        })

        .catch(error => {
            // console.log(error.response)
            setloginError(true)
        })
    
        
    }


    return (
        <div>
            {/* <MuiThemeProvider theme={theme}> */}
            <Container component="main" maxWidth="xs" style={{ marginTop : 200 }}>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" color="textPrimary">
                Sign in
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmitLogin)}>

                <Controller
                    name='username'
                    as={

                        <TextField
                        variant="filled"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="username"
                        name="username"
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
                    name='password'
                    as={

                    <TextField
                        variant="filled"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    }

                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'Required'
                      }}
                />
                
                {loginError && (
                    <Typography color='error'>
                        Account not found
                    </Typography>
                )}
                
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    
                >
                    Sign In
                </Button>

                <Grid container>
                    <Grid item>
                    <Link href="/auth/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
            </Container>
            {/* </MuiThemeProvider> */}
        </div>
    )
}

