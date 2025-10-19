namespace PersonalFinanceApi.Dtos
{
    public class CreateCategoryRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;  // Isso será mapeado para Color
        // Remover UserId
    }
}