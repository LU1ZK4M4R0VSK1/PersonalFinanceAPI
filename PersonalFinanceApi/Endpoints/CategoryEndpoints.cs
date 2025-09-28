using Microsoft.EntityFrameworkCore;
using PersonalFinanceApi.Data;
using PersonalFinanceApi.Models;

namespace PersonalFinanceApi.Endpoints;

/// <summary>
/// Mapeia os endpoints relacionados a categorias.
/// </summary>
public static class CategoryEndpoints
{
    /// <summary>
    /// Mapeia todos os endpoints de categoria para a aplicação web.
    /// </summary>
    /// <param name="app">A aplicação web.</param>
    public static void MapCategoryEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/categories").WithTags("Categories");

        /// <summary>
        /// Obtém todas as categorias.
        /// </summary>
        group.MapGet("/", async (AppDbContext context) =>
        {
            var categories = await context.Categories
                .AsNoTracking()
                .ToListAsync();

            return Results.Ok(categories);
        })
        .WithName("GetCategories")
        .Produces<List<Category>>()
        .WithOpenApi();
    }
}
