using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PersonalFinanceAPI.Models
{
    public class Category
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(50)]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        [StringLength(10)]
        public string Type { get; set; } = "Expense";
        
        public int UserId { get; set; }
        public User User { get; set; } = null!;
        
        public List<Transaction> Transactions { get; set; } = new();
    }
}