using Microsoft.Extensions.Options;
using UbcAPI.Helpers;
using UbcAPI.Models;
using UbcAPI.Services.Interfaces;

namespace UbcAPI.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly JwtSettings _jwtSettings;

        public AuthService(IOptions<JwtSettings> jwtSettings)
        {
            _jwtSettings = jwtSettings.Value;
        }

        public string GenerateToken(string username)
        {
            var key = _jwtSettings.SecretKey;
            var token = JwtTokenGenerator.GenerateToken(username, key);
            
            return token;
        }
    }
}