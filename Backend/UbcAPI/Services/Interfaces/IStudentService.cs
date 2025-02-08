namespace UbcAPI.Services.Interfaces;

using UbcAPI.Models;

public interface IStudentService
{
    PagedStudents<Student> GetAll(int pageNumber, int pageSize);
    Student? GetById(int id);
    Student Create(Student student);
    Student Update(int id, Student student);
    bool Delete(int id);
}
