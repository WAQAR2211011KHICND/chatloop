import React, { useState , useContext} from 'react';
import { Container, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Typography } from '@material-ui/core';
import {  FormControl, TextField, Button, Box } from '@mui/material';


const useStyles = makeStyles({
    
    button: {
        background: '#42b6EE !important',
        border: '0 !important',
        borderRadius: '3 !important',
        color: 'white !important',
        height: 48,
        padding: '0 30px !important',
    },
    Signup: {
        margin:'30px 100px !important',
    }
});


const Signup = ({ appState, setAppState}) => {
    
    const classes = useStyles();

    const name = useFormInput('');
    const email = useFormInput('');
    const password = useFormInput('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [comment, setComment] = useState(); 

    const handleSignIn=()=>{
        setAppState("signin")
    }

    const handleSignUp=()=>{
        
        setLoading(true);
 
        const data = {
            name: name.value,
            email: email.value,
            password: password.value
        }

        fetch('http://192.168.0.144:8080/chatloop',  {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }, {
            mode: 'cors'
          })
            .then(response => response.json())
            .then(data => {
                setLoading(false);
                setComment(JSON.stringify(data));
            })
            .catch((err)=>{
                setLoading(false);
                console.log(err);
                setError("Server is busy or crediential is invalid");
            });
    }

 
    return (
        <>
            <Container   sx={{display:'flex', justifyContent:'left'}}>
                <FormControl>
                    <Grid container spacing={3}>
                        <Grid item lg={12} xs={12} display='flex' justifyContent='center'>
                            <Typography variant='h4'>
                                 SignUp
                            </Typography>
                        </Grid>
                        <Grid item lg={12} xs={12} display='flex' justifyContent='center'>
                
            
                <Box className={classes.Signup}
                    sx={{
                        width: { lg: "700px", xs: '300px' }, height:'auto',
                        background: '#F6F6F6', padding: '15px',
                        display: 'flex', justifyContent: 'center',
                        borderRadius: '10px',
                        'boxShadow': 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                    }}>
                    <Grid container spacing={3}>
                        <Grid item lg={12} xs={12} >
                            <TextField id="name" fullWidth label="Name" placeholder='Muhammad Waqar' {...name} type="text" variant="outlined" required />
                        </Grid>
                        <Grid item lg={12} xs={12} >
                            <TextField id="email" fullWidth label="Email" placeholder='abc@cloud.neduet.edu.pk' {...email} type="email" variant="outlined" required />
                        </Grid>
                    
                        <Grid item lg={12} xs={12}>
                            <TextField id="password" fullWidth label="Password" type='password' {...password} variant="outlined" required />
                        </Grid>

                        <Grid item lg={12} xs={12} display='flex' justifyContent='right' >
                            <Button className={classes.button} onClick={handleSignIn} outline="none" sx={{ background: '42b6EE', marginRight: '10px' }}>
                                SignIn
                            </Button>
                            <Button className={classes.button} disabled={loading} onClick={handleSignUp} outline="none" sx={{ background: '42b6EE', marginRight: '10px' }}>
                                SignUp
                            </Button>
                        </Grid>
                        {
                            error &&
                            <Grid item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <> <pre style={{ color: 'red' }}>{error}</pre> </>
                            </Grid>
                        }
                        {
                            comment && <pre style={{ color: 'red' }}>{error}</pre>
                        }
                    </Grid>
                </Box>
                        </Grid>
                    </Grid>
                </FormControl>
            </Container>
        </>
    )
}


const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}

export default Signup


