namespace PersonalFinanceApi.Dtos
{
    public class CategoryResponse
    {
        public int CategoryId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;  // Mudar Type para Color
        // Remover UserId e UserName
    }
}