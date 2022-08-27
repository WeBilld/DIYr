import './Signup.css';
import React, {Component, useEffect} from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

export default function Login() {
    const [inputs, setInputs] = React.useState({
        firstName: '',
        lastName: '',
        city: '',
        email: '',
        password: '',
        repassword: ''
    });

    const cityList =['Albuquerque', 'Arlington', 'Atlanta', 'Austin', 'Bakersfield', 'Baltimore', 'Boston', 'Charlotte', 'Chicago', 'Colorado Springs', 'Columbus', 'Dallas', 'Denver', 'Detroit', 'El Paso', 'Fort Worth', 'Fresno', 'Houston', 'Indianapolis', 'Jacksonville', 'Kansas City', 'Las Vegas', 'Long Beach', 'Los Angeles', 'Louisville', 'Memphis', 'Mesa', 'Miami', 'Milwaukee', 'Minneapolis', 'Nashville', 'New York City', 'Oakland', 'Oklahoma City', 'Omaha', 'Philadelphia', 'Phoenix', 'Portland', 'Raleigh', 'Sacramento', 'San Antonio', 'San Diego', 'San Francisco', 'San Jose', 'Seattle', 'Tucson', 'Tulsa', 'Virgnia Beach', 'Washington DC', 'Wichita'];

    // handle change of inputs
    const handleInputChange = (prop) => (e) => {
        setInputs({...inputs, [prop]: e.target.value});
    }

    // onClick for login to submit to our createuser api
    // display an error on bad request


    return (
        <div className="signupMain">
                <Box
                    className = "signupContainer"
                    sx = {{ p: 2, mr:100 }}
                    alignItems="left"
                    >
                        <Stack className="mainStack" direction="column" spacing={3} justifyContent="center" alignItems="center">
                            <span className ="bigLogo">DIYr</span>
                            <h2 className="app description">Do it yourself, with others</h2>
                            <Box className = "inputsContainer" sx={{p:3, boxShadow:1, minWidth:350}}>
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
                                    <Autocomplete
                                        disablePortal
                                        clearOnEscape
                                        options={cityList}
                                        fullWidth
                                        renderInput={(params) => <TextField {...params} label="City"/>}
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
                                    <Button variant="contained" size="large">Create Account</Button>
                                </Stack>
                            </Box>
                            </Stack>
                </Box>
        </div>
    )
}