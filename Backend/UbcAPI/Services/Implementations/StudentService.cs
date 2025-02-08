using UbcAPI.Data;
using UbcAPI.Models;
using UbcAPI.Services.Interfaces;

namespace UbcAPI.Services.Implementations
{
    public class StudentService : IStudentService
    {
        private readonly ApplicationDbContext _context;

        public StudentService(ApplicationDbContext context)
        {
            _context = context;
        }

        public PagedStudents<Student> GetAll(int pageNumber, int pageSize)
        {
            if (_context.Students == null)
            {
                return new PagedStudents<Student>(Enumerable.Empty<Student>(), 0);
            }

            var adjustedPageNumber = pageNumber + 1;
            var totalElements = _context.Students.Count();
            var students = _context.Students
                .Skip((adjustedPageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return new PagedStudents<Student>(students, totalElements);
        }

        public Student? GetById(int id) => _context.Students?.Find(id);

        public Student Create(Student student)
        {
            _context.Students?.Add(student);
            _context.SaveChanges();
            return student;
        }

        public Student Update(int id, Student student)
        {
            var existing = _context.Students?.Find(id);
            
            if (existing == null) 
                throw new KeyNotFoundException("Aluno não encontrado");

            existing.Nome = student.Nome;
            existing.Idade = student.Idade;
            existing.Serie = student.Serie;
            existing.NotaMedia = student.NotaMedia;
            existing.Endereco = student.Endereco;
            existing.NomePai = student.NomePai;
            existing.NomeMae = student.NomeMae;
            existing.DataNascimento = student.DataNascimento;

            _context.SaveChanges();
            return existing;
        }

        public bool Delete(int id)
        {
            var student = _context.Students?.Find(id);
            if (student == null) 
                return false;

            _context.Students?.Remove(student);
            _context.SaveChanges();
            return true;
        }
    }
}
