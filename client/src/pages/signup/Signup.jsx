import './Signup.css';
import React, { Component, useEffect, useContext } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate, Link } from 'react-router-dom';
import UserContext from '../../Contexts/UserContext';

export default function Login() {
    const [inputs, setInputs] = React.useState({
        firstName: '',
        lastName: '',
        city: '',
        email: '',
        password: '',
        repassword: '',
        passError: false,
        emailError: false
    });

    const {setUserInfo, userInfo} = useContext(UserContext);
    const navigate = useNavigate();
    
    const cityList = ['Albuquerque', 'Arlington', 'Atlanta', 'Austin', 'Bakersfield', 'Baltimore', 'Boston', 'Charlotte', 'Chicago', 'Colorado Springs', 'Columbus', 'Dallas', 'Denver', 'Detroit', 'El Paso', 'Fort Worth', 'Fresno', 'Houston', 'Indianapolis', 'Jacksonville', 'Kansas City', 'Las Vegas', 'Long Beach', 'Los Angeles', 'Louisville', 'Memphis', 'Mesa', 'Miami', 'Milwaukee', 'Minneapolis', 'Nashville', 'New York City', 'Oakland', 'Oklahoma City', 'Omaha', 'Philadelphia', 'Phoenix', 'Portland', 'Raleigh', 'Sacramento', 'San Antonio', 'San Diego', 'San Francisco', 'San Jose', 'Seattle', 'Tucson', 'Tulsa', 'Virgnia Beach', 'Washington DC', 'Wichita'];


    // handle change of inputs
    const handleInputChange = (prop) => (e, values) => {
        if (prop === 'city'){
            setInputs({...inputs, city: e.target.innerText})
        }else 
        setInputs({ ...inputs, [prop]: e.target.value });
    }

    // onClick to submit to our createuser api
    // display an error on bad request
    const submitSignup = () => {

        if (inputs.repassword !== inputs.password){
            console.log("Passwords must match")
        } else {
            const formBody ={
                email: inputs.email,
                password: inputs.password,
                firstName: inputs.firstName,
                lastName: inputs.lastName,
                city: inputs.city
            }
            fetch('http://localhost:5500/rest/users/signup', {
                method: 'POST',
                body: JSON.stringify(formBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then (res => res.json())
            .then (res => {
                setUserInfo({
                    ...userInfo,
                    city: res.city,
                    email: res.email,
                    firstName: res.first_name,
                    lastName: res.last_name,
                    user_id: res._id
                })
                
                navigate('/')
            })
        }
    }

    return (
        <div className="signupMain">
            <Box
                className="signupContainer"
                sx={{ p: 2, mr: 100 }}
                alignItems="left"
            >
                <Stack className="mainStack" direction="column" spacing={3} justifyContent="center" alignItems="center">
                    <span className="bigLogo">DIYr</span>
                    <h2 className="app description">Do it yourself, with others</h2>
                    <Box className="inputsContainer" sx={{ p: 3, boxShadow: 1, minWidth: 350 }}>
                        <Stack className="loginFields" direction="column" spacing={3} justifyContent="center" alignItems="center">
                            <TextField
                                label="First Name"
                                variant="outlined"
                                fullWidth
                                onChange={handleInputChange('firstName')}
                            />
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                onChange={handleInputChange('lastName')}
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                onChange={handleInputChange('email')}
                            />
                            <Autocomplete
                                disablePortal
                                clearOnEscape
                                options={cityList}
                                fullWidth
                                renderInput={(params) => <TextField {...params} label="City" />}
                                onChange={handleInputChange('city')}
                            />
                            <TextField
                                label="Password"
                                variant="outlined"
                                type="password"
                                fullWidth
                                onChange={handleInputChange('password')}
                            />
                            <TextField
                                label="Re-enter Password"
                                variant="outlined"
                                type="password"
                                fullWidth
                                onChange={handleInputChange('repassword')}
                            />
                            <Stack className="submitButtonsStack" direction="row" spacing={3} justifyContent="center">
                                <Button variant="contained" size="large" onClick={submitSignup} >Create Account</Button>
                                <Link to="/" style={{textDecoration: 'none'}}>
                                    <Button variant="contained" size="large">Back to Sign In</Button>
                                </Link>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </div>
    )
}