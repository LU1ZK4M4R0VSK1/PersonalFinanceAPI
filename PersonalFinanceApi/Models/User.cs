using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PersonalFinanceAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        [EmailAddress]
        [StringLength(150)]
        public string Email { get; set; } = string.Empty;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public List<Transaction> Transactions { get; set; } = new();
        public List<Category> Categories { get; set; } = new();
    }
}