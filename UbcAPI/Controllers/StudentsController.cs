using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UbcAPI.Models;
using UbcAPI.Services.Interfaces;

namespace UbcAPI.Controllers;

[Route("api/students")]
[ApiController]
[Authorize]
public class StudentsController : ControllerBase
{
    private readonly IStudentService _studentService;

    public StudentsController(IStudentService studentService)
    {
        _studentService = studentService;
    }

    [HttpGet]
    public IActionResult GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
    {
        var students = _studentService.GetAll(pageNumber, pageSize);
        return Ok(students);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var student = _studentService.GetById(id);
        return student == null ? NotFound() : Ok(student);
    }

    [HttpPost]
    public IActionResult Create([FromBody] Student student) => Ok(_studentService.Create(student));

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] Student student) => Ok(_studentService.Update(id, student));

    [HttpDelete("{id}")]
    public IActionResult Delete(int id) => _studentService.Delete(id) ? NoContent() : NotFound();
}
