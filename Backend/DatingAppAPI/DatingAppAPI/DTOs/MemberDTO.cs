﻿namespace DatingAppAPI.DTOs
{
    public class MemberDTO
    {
        public string Username { get; set; } = string.Empty;
        public string PhotoUrl { get; set; } = string.Empty;
        public int Age { get; set; }
        public string KnownAs { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime LastActive { get; set; }
        public string Gender { get; set; } = string.Empty;
        public string Introduction { get; set; } = string.Empty;
        public string Interests { get; set; } = string.Empty;
        public string LookingFor { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public ICollection<PhotoDTO>? Photos { get; set; }
    }
}
