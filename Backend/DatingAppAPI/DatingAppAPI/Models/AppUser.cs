namespace DatingAppAPI.Models
{
    public class AppUser : BaseEntity
    {
        public int MyProperty { get; set; }
        public string UserName { get; set; } = string.Empty;
    }
}
