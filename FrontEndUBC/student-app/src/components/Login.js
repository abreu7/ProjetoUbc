import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Avatar,
  IconButton,
  InputAdornment,
  Link,
  CircularProgress,
  Fade,
  Alert,
} from "@mui/material";
import {
  LockOutlined,
  Visibility,
  VisibilityOff,
  LoginOutlined,
} from "@mui/icons-material";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    username: "",
    userpassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      await login(credentials);
    } catch (err) {
      setError(err.message || "Ocorreu um erro ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2,
            width: "100%",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlined />
          </Avatar>

          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Bem-vindo de volta
          </Typography>

          {error && (
            <Fade in={true}>
              <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                {error}
              </Alert>
            </Fade>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nome de usuário"
              name="username"
              autoComplete="username"
              autoFocus
              value={credentials.username}
              onChange={handleChange}
              disabled={isLoading}
              sx={{ mb: 2 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="userpassword"
              label="Senha"
              type={showPassword ? "text" : "password"}
              id="userpassword"
              autoComplete="current-password"
              value={credentials.userpassword}
              onChange={handleChange}
              disabled={isLoading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePassword}
                      edge="end"
                      disabled={isLoading}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                textTransform: "none",
                fontSize: "1.1rem",
                position: "relative",
              }}
            >
              {isLoading ? (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CircularProgress size={24} sx={{ mr: 1 }} />
                  Entrando...
                </Box>
              ) : (
                <>
                  Entrar
                  <LoginOutlined sx={{ ml: 1 }} />
                </>
              )}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;