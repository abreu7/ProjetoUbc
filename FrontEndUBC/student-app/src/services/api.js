import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

// Configurar o axios para incluir o token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getStudents = async (pageNumber, pageSize) => {
  try{
    const response = await axios.get(`${apiBaseUrl}/students`, {
      ...getAuthHeaders(),
      params: {
        pageNumber,
        pageSize
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar estudantes:', error);
    throw error;
  }
};

export const addStudent = async (student) => {
  await axios.post(`${apiBaseUrl}/students`, student, getAuthHeaders());
};

export const updateStudent = async (student) => {
  await axios.put(`${apiBaseUrl}/students/${student.id}`, student, getAuthHeaders());
};

export const deleteStudent = async (id) => {
  await axios.delete(`${apiBaseUrl}/students/${id}`, getAuthHeaders());
};