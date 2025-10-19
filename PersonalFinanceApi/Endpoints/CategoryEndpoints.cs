using Microsoft.EntityFrameworkCore;
using PersonalFinanceApi.Data;
using PersonalFinanceApi.Dtos;
using PersonalFinanceApi.Models;

namespace PersonalFinanceApi.Endpoints
{
    public static class CategoryEndpoints
    {
        public static void MapCategoryEndpoints(this WebApplication app)
        {
            var categoryGroup = app.MapGroup("/api/categories");

            // GET ALL CATEGORIES
            categoryGroup.MapGet("/", async (AppDbContext context) =>
            {
                var categories = await context.Categories
                    .Select(c => new CategoryResponse
                    {
                        CategoryId = c.Id,  
                        Name = c.Name,
                        Color = c.Color,           
                    })
                    .ToListAsync();
                return Results.Ok(categories);
            });

            // GET CATEGORY BY ID
            categoryGroup.MapGet("/{id}", async (int id, AppDbContext context) =>
            {
                var category = await context.Categories
                    .Where(c => c.Id == id)  
                    .Select(c => new CategoryResponse
                    {
                        CategoryId = c.Id, 
                        Name = c.Name,
                        Color = c.Color,         
                    })
                    .FirstOrDefaultAsync();
                return category == null ? Results.NotFound() : Results.Ok(category);
            });

            // CREATE CATEGORY
            categoryGroup.MapPost("/", async (CreateCategoryRequest request, AppDbContext context) =>
            {
                var category = new Category
                {
                    Name = request.Name,
                    Color = request.Type    
                };

                context.Categories.Add(category);
                await context.SaveChangesAsync();

                var response = new CategoryResponse
                {
                    CategoryId = category.Id, 
                    Name = category.Name,
                    Color = category.Color,                                                                     
                };

                return Results.Created($"/api/categories/{category.Id}", response);
            });

            // UPDATE CATEGORY
            categoryGroup.MapPut("/{id}", async (int id, UpdateCategoryRequest request, AppDbContext context) =>
            {
                var category = await context.Categories.FindAsync(id);
                
                if (category == null) 
                    return Results.NotFound();

                category.Name = request.Name;
                category.Color = request.Type;  
                
                await context.SaveChangesAsync();

                return Results.Ok(new CategoryResponse
                {
                    CategoryId = category.Id,  
                    Name = category.Name,
                    Color = category.Color,                
                });
            });

            // DELETE CATEGORY
            categoryGroup.MapDelete("/{id}", async (int id, AppDbContext context) =>
            {
                var category = await context.Categories.FindAsync(id);
                if (category == null) 
                    return Results.NotFound();

                var hasTransactions = await context.Transactions
                    .AnyAsync(t => t.CategoryId == id);

                if (hasTransactions)
                    return Results.BadRequest("Não pode excluir categoria com transações");

                context.Categories.Remove(category);
                await context.SaveChangesAsync();
                return Results.NoContent();
            });
        }
    }
}