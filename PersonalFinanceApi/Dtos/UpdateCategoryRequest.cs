namespace PersonalFinanceApi.Dtos
{
    public class UpdateCategoryRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;  // Isso será mapeado para Color
    }
}