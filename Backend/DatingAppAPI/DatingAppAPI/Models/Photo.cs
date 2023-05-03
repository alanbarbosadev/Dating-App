using System.ComponentModel.DataAnnotations.Schema;

namespace DatingAppAPI.Models
{
    [Table("Photos")]
    public class Photo : BaseEntity
    {
        public string Url { get; set; } = string.Empty;
        public bool IsMain { get; set; }
        public string PublicId { get; set; } = string.Empty;
        public AppUser AppUser { get; set; } = new AppUser();
        public Guid AppUserId { get; set; }
    }
}
