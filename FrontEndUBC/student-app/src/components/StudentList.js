import React, { useEffect, useState } from "react";
import { getStudents, deleteStudent, addStudent, updateStudent } from "../services/api";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Container,
  Typography,
  Paper,
  IconButton,
  Box,
  TableContainer,
  TablePagination,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tooltip,
  Alert,
  Snackbar,
  TextField,
  Grid,
  InputAdornment,
  CircularProgress
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  Home as HomeIcon,
  CalendarMonth as CalendarIcon,
  Grade as GradeIcon,
  Close as CloseIcon, 
  Save as SaveIcon
} from "@mui/icons-material";

const initialStudentState = {
  nome: '',
  idade: '',
  serie: '',
  notaMedia: '',
  endereco: '',
  nomePai: '',
  nomeMae: '',
  dataNascimento: ''
};

const StudentList = ({ onEdit }) => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [newStudent, setNewStudent] = useState(initialStudentState);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Efeitos
  useEffect(() => {
    loadStudents();
  }, [page, rowsPerPage]);

  // Funções de carregamento
  const loadStudents = async (pageNumber = page, pageSize = rowsPerPage) => {
    try {
      setLoading(true);
      const data = await getStudents(pageNumber, pageSize);
      setStudents(data.content);
      setTotalElements(data.totalElements);
    } catch (error) {
      showSnackbar('Erro ao carregar estudantes', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    loadStudents(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage();
    setPage(0);
    loadStudents(0, newRowsPerPage);
  };

  // Handler para abrir a modal de edição
  const handleEditClick = (student) => {
    setStudentToEdit(student);
    setEditDialogOpen(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;

    setStudentToEdit(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler para salvar as alterações do estudante
  const handleEditSave = async () => {
    
    console.log(studentToEdit);
    if (!studentToEdit.nome || 
      !studentToEdit.idade || 
      !studentToEdit.serie || 
      !studentToEdit.notaMedia || 
      !studentToEdit.endereco || 
      !studentToEdit.dataNascimento) {
      showSnackbar('Todos os campos obrigatórios devem ser preenchidos', 'error');
      return;
    }

    if (!Number.isInteger(Number(studentToEdit.serie)) || !Number.isInteger(Number(studentToEdit.idade))) {
      showSnackbar('A série e a idade devem ser um número inteiro', 'error');
      return;
    }

    try {
      await updateStudent(studentToEdit);
      await loadStudents(page, rowsPerPage);
      setEditDialogOpen(false);
      showSnackbar('Estudante atualizado com sucesso', 'success');
    } catch (error) {
      showSnackbar('Erro ao atualizar estudante', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setAddDialogOpen(true);
  };

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteStudent(studentToDelete.id);
      await loadStudents();
      showSnackbar('Estudante excluído com sucesso', 'success');
    } catch (error) {
      showSnackbar('Erro ao excluir estudante', 'error');
    }
    setDeleteDialogOpen(false);
  };

  const handleAddStudent = async () => {
    
    if (!newStudent.nome || 
        !newStudent.idade || 
        !newStudent.serie || 
        !newStudent.notaMedia || 
        !newStudent.endereco || 
        !newStudent.dataNascimento) {
      showSnackbar('Todos os campos obrigatórios devem ser preenchidos', 'error');
      return;
    }

    if (!Number.isInteger(Number(newStudent.serie)) || !Number.isInteger(Number(newStudent.idade))) {
      showSnackbar('A série e a idade devem ser um número inteiro', 'error');
      return;
    }

    try {
      await addStudent(newStudent);
      await loadStudents();
      setAddDialogOpen(false);
      resetNewStudent();
      showSnackbar('Estudante adicionado com sucesso', 'success');
    } catch (error) {
      showSnackbar('Erro ao adicionar estudante', 'error');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Funções auxiliares
  const resetNewStudent = () => {
    setNewStudent(initialStudentState);
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const getGradeColor = (grade) => {
    if (grade >= 7) return 'success';
    if (grade >= 5) return 'warning';
    return 'error';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  // Render
  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          {/* Cabeçalho */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4" component="h1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SchoolIcon fontSize="large" color="primary" />
              Lista de Estudantes
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              size="large"
              sx={{ borderRadius: 2 }}
              onClick={() => setAddDialogOpen(true)}
            >
              Adicionar Estudante
            </Button>
          </Box>

          {/* Tabela */}
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Idade</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Série</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Média</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Endereço</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Nome Pai</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Nome Mãe</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Data Nascimento</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : students.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                      Nenhum estudante encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  students.map((student) => (
                    <TableRow 
                      key={student.id}
                      sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
                    >
                      <TableCell>{student.nome}</TableCell>
                      <TableCell>{student.idade}</TableCell>
                      <TableCell>
                        <Chip 
                          label={student.serie} 
                          color="primary" 
                          variant="outlined" 
                          size="small" 
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={`${student.notaMedia}`}
                          color={getGradeColor(student.notaMedia)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{student.endereco}</TableCell>
                      <TableCell>{student.nomePai}</TableCell>
                      <TableCell>{student.nomeMae}</TableCell>
                      <TableCell>{formatDate(student.dataNascimento)}</TableCell>
                      <TableCell>
                        <Tooltip title="Editar">
                          <IconButton 
                            color="primary" 
                            onClick={() => handleEditClick(student)}
                            size="small"
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Excluir">
                          <IconButton 
                            color="error"
                            onClick={() => handleDeleteClick(student)}
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Paginação */}
          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={totalElements}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Linhas por página:"
          />
        </Paper>
      </Box>

      {/* Modal de Adição de Estudante */}
      <Dialog 
        open={addDialogOpen} 
        onClose={() => setAddDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ 
          bgcolor: 'primary.main', 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <AddIcon />
          Adicionar Novo Estudante
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <DialogContentText sx={{ mb: 2 }}>
            Preencha todos os campos para adicionar um novo estudante ao sistema.
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="nome"
                label="Nome Completo"
                value={newStudent.nome}
                onChange={handleInputChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="idade"
                label="Idade"
                type="number"
                value={newStudent.idade}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="serie"
                label="Série"
                type="number"
                value={newStudent.serie}
                onChange={handleInputChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SchoolIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="notaMedia"
                label="Média"
                type="number"
                value={newStudent.notaMedia}
                onChange={handleInputChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GradeIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="endereco"
                label="Endereço"
                value={newStudent.endereco}
                onChange={handleInputChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="nomePai"
                label="Nome do Pai"
                value={newStudent.nomePai}
                onChange={handleInputChange}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="nomeMae"
                label="Nome da Mãe"
                value={newStudent.nomeMae}
                onChange={handleInputChange}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="dataNascimento"
                label="Data de Nascimento"
                type="date"
                value={newStudent.dataNascimento}
                onChange={handleInputChange}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={() => {
              setAddDialogOpen(false);
              resetNewStudent();
            }}
            variant="outlined"
            startIcon={<DeleteIcon />}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleAddStudent}
            variant="contained"
            startIcon={<AddIcon />}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de Edição de Estudante */}
      <Dialog 
        open={editDialogOpen} 
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            background: 'linear-gradient(45deg, #1976d2, #2196f3)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            py: 2,
          }}
        >
          <EditIcon />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Editar Estudante
          </Typography>
          <IconButton
            size="small"
            onClick={() => setEditDialogOpen(false)}
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent 
          sx={{ 
            mt: 2, 
            px: 3,
            background: 'linear-gradient(to bottom, #f5f5f5, #ffffff)',
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" color="text.secondary">
              Atualize as informações do estudante conforme necessário
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="nome"
                label="Nome Completo"
                value={studentToEdit?.nome || ''}
                onChange={handleEditInputChange}
                fullWidth
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="idade"
                label="Idade"
                type="number"
                value={studentToEdit?.idade || ''}
                onChange={handleEditInputChange}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="serie"
                label="Série"
                type="number"
                value={studentToEdit?.serie || ''}
                onChange={handleEditInputChange}
                fullWidth
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SchoolIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="notaMedia"
                label="Média"
                type="number"
                value={studentToEdit?.notaMedia || ''}
                onChange={handleEditInputChange}
                fullWidth
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GradeIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="endereco"
                label="Endereço"
                value={studentToEdit?.endereco || ''}
                onChange={handleEditInputChange}
                fullWidth
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="nomePai"
                label="Nome do Pai"
                value={studentToEdit?.nomePai || ''}
                onChange={handleEditInputChange}
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="nomeMae"
                label="Nome da Mãe"
                value={studentToEdit?.nomeMae || ''}
                onChange={handleEditInputChange}
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="dataNascimento"
                label="Data de Nascimento"
                type="date"
                value={studentToEdit?.dataNascimento || ''}
                onChange={handleEditInputChange}
                fullWidth
                required
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions 
          sx={{ 
            px: 3, 
            py: 3,
            background: '#f8f9fa',
            borderTop: '1px solid #e0e0e0',
          }}
        >
          <Button 
            onClick={() => setEditDialogOpen(false)}
            variant="outlined"
            startIcon={<CloseIcon />}
            sx={{ mr: 1 }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleEditSave}
            variant="contained"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
            disabled={loading}
            sx={{
              background: 'linear-gradient(45deg, #1976d2, #2196f3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1565c0, #1976d2)',
              }
            }}
          >
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de confirmação de exclusão */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          Tem certeza que deseja excluir o estudante {studentToDelete?.nome}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default StudentList;