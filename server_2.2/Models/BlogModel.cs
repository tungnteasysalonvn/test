using System.ComponentModel.DataAnnotations;

namespace server_2._2.Models
{
    public class BlogModel
    {
        [Required]
        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string ImageUrl { get; set; } = string.Empty;

        public string Author { get; set; } = string.Empty;
    }
}
