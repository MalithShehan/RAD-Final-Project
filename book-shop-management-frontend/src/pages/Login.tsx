import { useEffect, useState } from "react";
import {Button, TextField, Typography, Container, Paper, Grid, Slide} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {Appdispatch } from "../store/store.ts";
import { useNavigate } from "react-router";
import { User } from "../models/User.ts";
import {loginUser, registerUser} from "../reducer/UserSlice.ts";

export function Login() {
    const dispatch = useDispatch<Appdispatch>();
    const navigate = useNavigate();

    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);


    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [showRegister, setShowRegister] = useState(false);

    const toggleRegister = () => {
        setShowRegister(!showRegister);
    };

    const handleRegister = () => {
        const user: User = { username: registerUsername, password: registerPassword };
        dispatch(registerUser (user));
        navigate("/");
    };

    const handleLogin = () => {
        const user: User = { username: loginUsername, password: loginPassword };
        dispatch(loginUser (user));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');
        }
    }, [isAuthenticated, navigate]);

    return (
        <Container component="main" maxWidth="xs" style={{marginTop:"3%"}}>
            <Paper elevation={3} style={{ padding: '20px', position: 'relative' ,height:"400px" , transition: 'height 0.3s ease-in-out'}}>
                <Typography variant="h2" align="center" style={{fontFamily:'cursive'}}>Welcome</Typography>

                {/* Login Form */}
                {!showRegister && (
                <Slide in={!showRegister} timeout={200} direction="up" mountOnEnter unmountOnExit>
                    <Grid container spacing={2} style={{ marginBottom: '10px', marginTop:"20px" }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Username"
                                variant="outlined"
                                value={loginUsername}
                                onChange={(e) => setLoginUsername(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Password"
                                type="password"
                                variant="outlined"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleLogin}
                            >
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </Slide>
                )}

                {/* Sign Up Link */}
                <Typography variant="body2" align="center" style={{ cursor: 'pointer' ,marginTop:"10px"}} onClick={toggleRegister}>
                    {showRegister ? "Already have an account? Login" : "Don't have an account? Sign Up"}
                </Typography>

                {/* Registration Form */}
                <Slide direction="down" in={showRegister} mountOnEnter unmountOnExit timeout={200}>
                    <Grid container spacing={2} style={{ marginTop: '5px' }}>
                        <Grid item xs={12}>
                            <Typography variant="h6" align="center">Register</Typography>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Username"
                                variant="outlined"
                                value={registerUsername}
                                onChange={(e) => setRegisterUsername(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Password"
                                type="password"
                                variant="outlined"
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                onClick={handleRegister}
                            >
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                </Slide>
            </Paper>
        </Container>
    );
}