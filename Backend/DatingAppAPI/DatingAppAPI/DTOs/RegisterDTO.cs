using System.ComponentModel.DataAnnotations;

namespace DatingAppAPI.DTOs
{
    public class RegisterDTO
    {
        [Required]
        public string UserName { get; set; } = string.Empty;
        [Required]
        [StringLength(8, MinimumLength = 4)]
        public string Password { get; set; } = string.Empty;
    }
}
