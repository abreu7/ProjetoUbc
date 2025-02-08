import React from "react";
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Paper, 
  useTheme,
  alpha
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  School as SchoolIcon,
  PersonAdd as PersonAddIcon,
  Assessment as AssessmentIcon,
  Login as LoginIcon
} from '@mui/icons-material';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
        pt: 8,
        pb: 6
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 6,
            background: `linear-gradient(to right, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.95)})`,
            backdropFilter: 'blur(20px)',
            borderRadius: 2,
            textAlign: 'center'
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Sistema de Gestão de Estudantes
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}
          >
            Uma plataforma moderna e intuitiva para gerenciar a vida escolar dos seus estudantes.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/login")}
            startIcon={<LoginIcon />}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              borderRadius: 2,
              textTransform: 'none',
              boxShadow: theme.shadows[4]
            }}
          >
            Entrar no Sistema
          </Button>
        </Paper>

        {/* Footer */}
        <Box sx={{ mt: 8, textAlign: 'center', color: 'white' }}>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} Sistema de Gestão de Estudantes.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;