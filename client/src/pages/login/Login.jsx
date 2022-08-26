import './login.css';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

export default function Login() {
    const [inputs, setInputs] = React.useState({
        email: '',
        password: ''
    });


    return (
        <div className="loginMain">
            <Container className = "loginMainContainer" maxWidth = "sm" sx = {{p:2}}>
                <Box
                    className = "loginContainer"
                    sx = {{ p: 2 }}
                    >
                        <Stack className="loginFields" direction="column" spacing={3} justifyContent="center" alignItems="center">
                            <TextField
                                label="Email"
                                variant="standard"
                                fullWidth
                            />
                            <TextField
                                label="Password"
                                variant="standard"
                                fullWidth
                            />
                        </Stack>
                </Box>
            </Container>
        </div>
    )
}