using DatingAppAPI.Extensions;

namespace DatingAppAPI.Models
{
    public class AppUser : BaseEntity
    {
        public string UserName { get; set; } = string.Empty;
        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordSalt { get; set; }
        public DateTime Birthday { get; set; }
        public string KnownAs { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;
        public string Gender { get; set; } = string.Empty;
        public string Introduction { get; set; } = string.Empty;
        public string Interests { get; set; } = string.Empty;
        public string LookingFor { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public ICollection<Photo>? Photos { get; set; }

        //public int GetAge()
        //{
        //    return Birthday.CalculateAge();
        //}

    }
}
