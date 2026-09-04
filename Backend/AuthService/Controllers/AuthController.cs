using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AuthService.Models;

namespace AuthService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;

        public AuthController(IConfiguration config)
        {
            _config = config; 
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // Tymczasowo: logowanie "na sztywno" bez bazy danych
            if (request.Email == "test@student.pl" && request.Password == "12345")
            {
                var token = GenerateToken(request.Email);
                return Ok(new { token = token, message = "Zalogowano pomyœlnie!" });
            }

            return Unauthorized("Nieprawid³owy email lub has³o.");
        }

        private string GenerateToken(string email)
        {
            // 1. Pobieramy klucz (musi mieæ min. 32 znaki!)
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            // 2. Dodajemy informacje do tokenu (Claims)
            var claims = new[]
            {
                new Claim(ClaimTypes.Email, email),
                new Claim(ClaimTypes.NameIdentifier, "1") // Przyk³adowe ID u¿ytkownika
            };

            // 3. Budujemy token
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: credentials);

            // 4. Zwracamy token jako tekst
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}