using PersonalFinanceApi.Data;
using PersonalFinanceApi.Models;
using Microsoft.EntityFrameworkCore;

namespace PersonalFinanceApi.Endpoints
{
    public static class CategoryEndpoints
    {

        public static void MapCategoryEndpoints(this WebApplication app)
        {
            var group = app.MapGroup("/categories").WithTags("Categories");

            group.MapGet("/", async (AppDbContext context) =>
            {
                var categories = await context.Categories.ToListAsync();
                return Results.Ok(categories);
            })
            .WithName("GetAllCategories")
            .WithOpenApi();

            group.MapPost("/", async (CreateCategoryRequest request, AppDbContext context) =>
            {
                var category = new Category
                {
                    Name = request.Name,
                    Color = request.Color
                };

                await context.Categories.AddAsync(category);
                await context.SaveChangesAsync();
                return Results.Created($"/categories/{category.Id}", category);
            })
            .WithName("CreateCategory")
            .WithOpenApi();
        }
    }

    public class CreateCategoryRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
    }
}