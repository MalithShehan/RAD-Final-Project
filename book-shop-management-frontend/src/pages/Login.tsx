import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
  Slide,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Appdispatch } from "../store/store.ts";
import { useNavigate } from "react-router";
import { User } from "../models/User.ts";
import { loginUser, registerUser, clearError } from "../reducer/UserSlice.ts";
import bookshopImage from "../assets/img/login-background.png";

export function Login() {
  const dispatch = useDispatch<Appdispatch>();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);
  const error = useSelector((state: any) => state.user.error);

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const toggleRegister = () => {
    setShowRegister(!showRegister);
    dispatch(clearError());
  };

  const handleRegister = () => {
    const user: User = {
      username: registerUsername,
      password: registerPassword,
    };
    dispatch(registerUser(user));
    navigate("/");
  };

  const handleLogin = () => {
    const user: User = {
      username: loginUsername,
      password: loginPassword,
    };
    dispatch(loginUser(user));
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, [isAuthenticated, navigate]);

  return (
    <Container
      component="main"
      maxWidth="lg"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "100%",
        background: "linear-gradient(to right, #00c6ff, #0072ff)",
      }}
    >
      <Paper
        elevation={6}
        style={{
          display: "flex",
          flexDirection: "row",
          width: "900px",
          overflow: "hidden",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "15px",
        }}
      >
        {/* Left Image */}
        <Slide in direction="left" timeout={500}>
          <div
            style={{
              width: "50%",
              backgroundImage: `url(${bookshopImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </Slide>

        {/* Right Form Area */}
        <div style={{ padding: "30px", width: "50%" }}>
          <Typography
            variant="h4"
            align="center"
            style={{
              fontFamily: "'Segoe UI', cursive",
              color: "#0f172a",
              marginBottom: "20px",
            }}
          >
            📚 Welcome to Bookzone
          </Typography>

          {/* Show Login Form */}
          {!showRegister && (
            <Slide in={!showRegister} timeout={300} direction="up" mountOnEnter unmountOnExit>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {error && (
                    <Alert severity="error" style={{ marginBottom: "15px" }}>
                      {error}
                    </Alert>
                  )}
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
                    style={{
                      background: "linear-gradient(to right, #3b82f6, #06b6d4)",
                      color: "white",
                      marginTop: "15px",
                    }}
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Slide>
          )}

          <Typography
            variant="body2"
            align="center"
            style={{
              cursor: "pointer",
              marginTop: "15px",
              color: "#0ea5e9",
              fontWeight: "500",
            }}
            onClick={toggleRegister}
          >
            {showRegister
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </Typography>

          {/* Show Register Form */}
          {showRegister && (
            <Slide direction="down" in={showRegister} mountOnEnter unmountOnExit timeout={300}>
              <Grid container spacing={2} style={{ marginTop: "10px" }}>
                <Grid item xs={12}>
                  <Typography variant="h6" align="center" style={{ color: "#1e3a8a" }}>
                    📝 Register
                  </Typography>
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
                    style={{
                      background: "linear-gradient(to right, #ec4899, #f97316)",
                      color: "white",
                      marginTop: "15px",
                    }}
                    onClick={handleRegister}
                  >
                    Register
                  </Button>
                </Grid>
              </Grid>
            </Slide>
          )}
        </div>
      </Paper>
    </Container>
  );
}
