import React from "react";
import { useState } from "react";
import { addStudent, updateStudent } from "../services/api";
import { TextField, Button, Container } from "@mui/material";

const StudentForm = ({ student, onSave }) => {
  const [formData, setFormData] = useState(student || { name: "", age: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.id) {
      await updateStudent(formData);
    } else {
      await addStudent(formData);
    }
    onSave();
  };

  return (
    <Container>
      <TextField fullWidth label="Nome" name="name" value={formData.name} onChange={handleChange} required />
      <TextField fullWidth label="Idade" name="age" value={formData.age} onChange={handleChange} required sx={{ mt: 2 }} />
      <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ mt: 3 }}>
        Salvar
      </Button>
    </Container>
  );
};

export default StudentForm;