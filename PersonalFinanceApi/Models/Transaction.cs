using System.ComponentModel.DataAnnotations;

namespace PersonalFinanceAPI.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Description { get; set; } = string.Empty;
        
        [Required]
        [Range(0.01, double.MaxValue)]
        public decimal Amount { get; set; }
        
        [Required]
        public DateTime Date { get; set; } = DateTime.UtcNow;
        
        public int CategoryId { get; set; }
        public int UserId { get; set; }
        
        public Category Category { get; set; } = null!;
        public User User { get; set; } = null!;
    }
}