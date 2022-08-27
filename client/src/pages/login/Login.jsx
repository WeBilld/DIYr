import './login.css';
import React, {Component, useEffect} from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Login() {
    const [inputs, setInputs] = React.useState({
        email: '',
        password: ''
    });

    // handle change of inputs
    const handleInputChange = (prop) => (e) => {
        setInputs({...inputs, [prop]: e.target.value});
    }

    // onClick for login to submit to our auth api
    

    return (
        <div className="loginMain">
                <Box
                    className = "loginContainer"
                    sx = {{ p: 2, mr:100 }}
                    alignItems="left"
                    >
                        <Stack className="mainStack" direction="column" spacing={3} justifyContent="center" alignItems="center">
                            <span className ="bigLogo">DIYr</span>
                            <h2 className="app description">Do it yourself, with others</h2>
                            <Box className = "inputsContainer" sx={{p:3, boxShadow:1, minWidth:350}}>
                                <Stack className="loginFields" direction="column" spacing={3} justifyContent="center" alignItems="center">
                                    <TextField
                                        label="Email"
                                        variant="standard"
                                        fullWidth
                                        onChange={handleInputChange('email')}
                                    />
                                    <TextField
                                        label="Password"
                                        variant="standard"
                                        type="password"
                                        fullWidth
                                        onChange={handleInputChange('password')}
                                    />
                                    <Stack className="submitButtonsStack" direction="row" spacing={3} justifyContent="center">
                                        <Button variant="contained" size="large">Log In</Button>
                                        <Button variant="contained" size="large">Sign Up</Button>
                                    </Stack>
                                </Stack>
                            </Box>
                            </Stack>
                </Box>
        </div>
    )
}