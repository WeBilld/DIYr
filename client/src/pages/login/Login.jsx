import './login.css';
import React, { Component, useEffect, useContext } from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'

import UserContext from '../../Contexts/UserContext';
import { Navigate } from 'react-router-dom';

export default function Login() {
    const [inputs, setInputs] = React.useState({
        email: '',
        password: ''
    });

    const { setUserInfo, userInfo } = useContext(UserContext);
    // console.log(userInfo)


    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo.user_id) {
            navigate('/home')
        }
    })

    // handle change of inputs
    const handleInputChange = (prop) => (e) => {
        setInputs({ ...inputs, [prop]: e.target.value });
    }

    // onClick for login to submit to our user api
    // display an error on bad request

    const submitLogin = () => {
        // build body form
        const formBody = {
            email: inputs.email,
            password: inputs.password
        };
        // submit values from field to our rest/login route
        fetch('http://localhost:5500/rest/users/login', {
            method: 'POST',
            body: JSON.stringify(formBody),
            credentials: 'include', // Don't forget to specify this if you need cookies
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                setUserInfo({
                    ...res
                })
            })
    }






    return (
        <div className="loginMain">
            <Box
                className="loginContainer"
                sx={{ p: 2, mr: 100 }}
                alignItems="left"
            >
                <Stack className="mainStack" direction="column" spacing={3} justifyContent="center" alignItems="center">
                    <span className="bigLogo">DIYr</span>
                    <h2 className="app description">Do it yourself, with others</h2>
                    <Box className="inputsContainer" sx={{ p: 3, boxShadow: 1, minWidth: 350 }}>
                        <Stack className="loginFields" direction="column" spacing={3} justifyContent="center" alignItems="center">
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                onChange={handleInputChange('email')}
                            />
                            <TextField
                                label="Password"
                                variant="outlined"
                                type="password"
                                fullWidth
                                onChange={handleInputChange('password')}
                            />
                            <Stack className="submitButtonsStack" direction="row" spacing={3} justifyContent="center">
                                <Button variant="contained" size="large" onClick={submitLogin}>Log In</Button>
                                <Button variant="contained" size="large">Sign Up</Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </div>
    )
}