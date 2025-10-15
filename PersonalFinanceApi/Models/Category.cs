namespace PersonalFinanceApi.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
        public List<Transaction> Transactions { get; set; } = new();
    }
}