import React, { useContext } from 'react';
import { useState } from "react";
import StudentList from "../components/StudentList";
import StudentForm from "../components/StudentForm";
import { Container, Button, AppBar, Toolbar, Typography, IconButton} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const [editingStudent, setEditingStudent] = useState(null);
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
    <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
          {/* <Button color="inherit" onClick={() => setEditingStudent({})}>
            Adicionar Estudante
          </Button> */}
        </Toolbar>
      </AppBar>

    <Container>
      {/* <Button onClick={() => setEditingStudent({})} variant="contained">Adicionar Estudante</Button> */}
      {editingStudent && <StudentForm student={editingStudent} onSave={() => setEditingStudent(null)} />}
      <StudentList onEdit={setEditingStudent} />
    </Container>
    </>
  );
};

export default Dashboard;