using PersonalFinanceApi.Data;
using PersonalFinanceApi.Models;
using Microsoft.EntityFrameworkCore;

namespace PersonalFinanceApi.Endpoints
{
    public static class TransactionEndpoints
    {
        public static void MapTransactionEndpoints(this WebApplication app)
        {
            var group = app.MapGroup("/transactions").WithTags("Transactions");

            group.MapGet("/", async (AppDbContext context) =>
            {
                var transactions = await context.Transactions
                    .Include(t => t.User)
                    .Include(t => t.Category)
                    .ToListAsync();
                    
                return Results.Ok(transactions);
            })
            .WithName("GetAllTransactions")
            .WithOpenApi();

            group.MapGet("/{id}", async (int id, AppDbContext context) =>
            {
                var transaction = await context.Transactions
                    .Include(t => t.User)
                    .Include(t => t.Category)
                    .FirstOrDefaultAsync(t => t.Id == id);
                    
                if (transaction == null)
                    return Results.NotFound();
                    
                return Results.Ok(transaction);
            })
            .WithName("GetTransactionById")
            .WithOpenApi();

            group.MapPost("/", async (CreateTransactionRequest request, AppDbContext context) =>
            {
                var user = await context.Users.FindAsync(request.UserId);
                if (user == null)
                    return Results.NotFound($"User with ID {request.UserId} not found");

                var category = await context.Categories.FindAsync(request.CategoryId);
                if (category == null)
                    return Results.NotFound($"Category with ID {request.CategoryId} not found");

                var transaction = new Transaction
                {
                    Description = request.Description,
                    Amount = request.Amount,
                    Date = request.Date,
                    Type = request.Type,
                    UserId = request.UserId,
                    CategoryId = request.CategoryId
                };

                await context.Transactions.AddAsync(transaction);
                await context.SaveChangesAsync();
                
                return Results.Created($"/transactions/{transaction.Id}", transaction);
            })
            .WithName("CreateTransaction")
            .WithOpenApi();

            group.MapPut("/{id}", async (int id, CreateTransactionRequest request, AppDbContext context) =>
            {
                var transaction = await context.Transactions.FindAsync(id);
                if (transaction == null)
                    return Results.NotFound();

                var user = await context.Users.FindAsync(request.UserId);
                if (user == null)
                    return Results.NotFound($"User with ID {request.UserId} not found");

                var category = await context.Categories.FindAsync(request.CategoryId);
                if (category == null)
                    return Results.NotFound($"Category with ID {request.CategoryId} not found");

                transaction.Description = request.Description;
                transaction.Amount = request.Amount;
                transaction.Date = request.Date;
                transaction.Type = request.Type;
                transaction.UserId = request.UserId;
                transaction.CategoryId = request.CategoryId;

                await context.SaveChangesAsync();
                return Results.Ok(transaction);
            })
            .WithName("UpdateTransaction")
            .WithOpenApi();

            group.MapDelete("/{id}", async (int id, AppDbContext context) =>
            {
                var transaction = await context.Transactions.FindAsync(id);
                if (transaction == null)
                    return Results.NotFound();

                context.Transactions.Remove(transaction);
                await context.SaveChangesAsync();
                
                return Results.NoContent();
            })
            .WithName("DeleteTransaction")
            .WithOpenApi();
        }
    }

    public class CreateTransactionRequest
    {
        public string Description { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public TransactionType Type { get; set; }
        public int UserId { get; set; }
        public int CategoryId { get; set; }
    }
}