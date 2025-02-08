namespace UbcAPI.Models;

public class PagedStudents<Student>
{
    public IEnumerable<Student> Content { get; set; }
    public int TotalElements { get; set; }

    public PagedStudents(IEnumerable<Student> content, int totalElements)
    {
        Content = content;
        TotalElements = totalElements;
    }
}