using System;
using System.ComponentModel.DataAnnotations;

namespace server_2._2.Data
{
    public class Blog
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        public string Author { get; set; }
        public string ImageURL { get; set; }
    }
}
