using Microsoft.AspNetCore.Mvc;
using Oracle.ManagedDataAccess.Client;
using UbcAPI.Data;
using UbcAPI.Models;
using UbcAPI.Services.Interfaces;

namespace UbcAPI.Controllers;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IAuthService _authService;

    public AuthController(ApplicationDbContext context, IAuthService authService)
    {
        _context = context;
        _authService = authService;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] User user)
    {
        try
        {
            var validUser = _context.Users?.SingleOrDefault(u => u.UserName == user.UserName && u.UserPassword == user.UserPassword);
            
            if (validUser == null)
                return Unauthorized("Usuário ou senha inválidos");

            var token = _authService.GenerateToken(user.UserName);
            return Ok(new { Token = token });
        }
        catch (OracleException)
        {
            return StatusCode(500, "Erro no banco de dados. Por favor, tente novamente mais tarde.");
        }
        catch (Exception)
        {
            return StatusCode(500, "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.");
        }
    }
}
