using Microsoft.EntityFrameworkCore;
using PersonalFinanceApi.Data;
using PersonalFinanceApi.Models;

namespace PersonalFinanceApi.Endpoints;

/// <summary>
/// Representa a resposta para o resumo do dashboard.
/// </summary>
public record DashboardResponse(
    decimal TotalIncome,
    decimal TotalExpenses,
    decimal Balance
);

/// <summary>
/// Mapeia os endpoints relacionados ao dashboard.
/// </summary>
public static class DashboardEndpoints
{
    /// <summary>
    /// Mapeia todos os endpoints de dashboard para a aplicação web.
    /// </summary>
    /// <param name="app">A aplicação web.</param>
    public static void MapDashboardEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/dashboard").WithTags("Dashboard");

        /// <summary>
        /// Obtém um resumo financeiro para um usuário específico.
        /// </summary>
        group.MapGet("/summary/{userId}", async (int userId, AppDbContext context) =>
        {
            var userExists = await context.Users.AnyAsync(u => u.Id == userId);
            if (!userExists)
            {
                return Results.NotFound("User not found.");
            }

            var totalIncome = await context.Transactions
                .AsNoTracking()
                .Where(t => t.UserId == userId && t.Type == TransactionType.Income)
                .SumAsync(t => t.Amount);

            var totalExpenses = await context.Transactions
                .AsNoTracking()
                .Where(t => t.UserId == userId && t.Type == TransactionType.Expense)
                .SumAsync(t => t.Amount);

            var balance = totalIncome - totalExpenses;

            var response = new DashboardResponse(totalIncome, totalExpenses, balance);

            return Results.Ok(response);
        })
        .WithName("GetDashboardSummary")
        .Produces<DashboardResponse>()
        .Produces(StatusCodes.Status404NotFound)
        .WithOpenApi();
    }
}
