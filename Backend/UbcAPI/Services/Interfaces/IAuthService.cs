namespace UbcAPI.Services.Interfaces;

public interface IAuthService
{
    string GenerateToken(string username);
}
