using PersonalFinanceApi.Data;
using PersonalFinanceApi.Models;
using Microsoft.EntityFrameworkCore;

namespace PersonalFinanceApi.Endpoints
{
    public static class DashboardEndpoints
    {

        public static void MapDashboardEndpoints(this WebApplication app)
        {
            var group = app.MapGroup("/dashboard").WithTags("Dashboard");

            group.MapGet("/summary/{userId}", async (int userId, AppDbContext context) =>
            {
                var totalIncome = await context.Transactions
                    .Where(t => t.UserId == userId && t.Type == TransactionType.Income)
                    .SumAsync(t => t.Amount);

                var totalExpenses = await context.Transactions
                    .Where(t => t.UserId == userId && t.Type == TransactionType.Expense)
                    .SumAsync(t => t.Amount);

                var balance = totalIncome - totalExpenses;

                var recentTransactions = await context.Transactions
                    .Where(t => t.UserId == userId)
                    .Include(t => t.Category)
                    .OrderByDescending(t => t.Date)
                    .Take(5)
                    .ToListAsync();

                var result = new
                {
                    TotalIncome = totalIncome,
                    TotalExpenses = totalExpenses,
                    Balance = balance,
                    RecentTransactions = recentTransactions
                };

                return Results.Ok(result);
            })
            .WithName("GetDashboardSummary")
            .WithOpenApi();
        }
    }
}