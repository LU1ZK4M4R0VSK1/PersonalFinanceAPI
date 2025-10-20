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
                    .OrderByDescending(t => t.Date)
                    .Select(t => new TransactionResponse
                    {
                        Id = t.Id,
                        Description = t.Description,
                        Amount = t.Amount,
                        Date = t.Date,
                        Type = t.Type.ToString(),
                        CategoryId = t.CategoryId,
                        CategoryName = t.Category.Name,
                        UserId = t.UserId,
                        UserName = t.User.Name
                    })
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
                    .Where(t => t.Id == id)
                    .Select(t => new TransactionResponse
                    {
                        Id = t.Id,
                        Description = t.Description,
                        Amount = t.Amount,
                        Date = t.Date,
                        Type = t.Type.ToString(),
                        CategoryId = t.CategoryId,
                        CategoryName = t.Category.Name,
                        UserId = t.UserId,
                        UserName = t.User.Name
                    })
                    .FirstOrDefaultAsync();
                    
                if (transaction == null)
                    return Results.NotFound();
                    
                return Results.Ok(transaction);
            })
            .WithName("GetTransactionById")
            .WithOpenApi();

            group.MapGet("/user/{userId}", async (int userId, AppDbContext context) =>
            {
                var transactions = await context.Transactions
                    .Include(t => t.User)
                    .Include(t => t.Category)
                    .Where(t => t.UserId == userId)
                    .OrderByDescending(t => t.Date)
                    .Select(t => new TransactionResponse
                    {
                        Id = t.Id,
                        Description = t.Description,
                        Amount = t.Amount,
                        Date = t.Date,
                        Type = t.Type.ToString(),
                        CategoryId = t.CategoryId,
                        CategoryName = t.Category.Name,
                        UserId = t.UserId,
                        UserName = t.User.Name
                    })
                    .ToListAsync();
                    
                return Results.Ok(transactions);
            })
            .WithName("GetTransactionsByUser")
            .WithOpenApi();

            group.MapPost("/", async (CreateTransactionRequest request, AppDbContext context) =>
            {
                var user = await context.Users.FindAsync(request.UserId);
                if (user == null)
                    return Results.NotFound($"User with ID {request.UserId} not found");

                var category = await context.Categories.FindAsync(request.CategoryId);
                if (category == null)
                    return Results.NotFound($"Category with ID {request.CategoryId} not found");

                // REMOVA esta validação se Category não tem UserId
                // if (category.UserId != request.UserId)
                //     return Results.BadRequest("Category does not belong to the user");

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
                
                var response = new TransactionResponse
                {
                    Id = transaction.Id,
                    Description = transaction.Description,
                    Amount = transaction.Amount,
                    Date = transaction.Date,
                    Type = transaction.Type.ToString(),
                    CategoryId = transaction.CategoryId,
                    CategoryName = category.Name,
                    UserId = transaction.UserId,
                    UserName = user.Name
                };
                
                return Results.Created($"/transactions/{transaction.Id}", response);
            })
            .WithName("CreateTransaction")
            .WithOpenApi();

            group.MapPut("/{id}", async (int id, UpdateTransactionRequest request, AppDbContext context) =>
            {
                var transaction = await context.Transactions
                    .Include(t => t.User)
                    .Include(t => t.Category)
                    .FirstOrDefaultAsync(t => t.Id == id);
                    
                if (transaction == null)
                    return Results.NotFound();

                var category = await context.Categories.FindAsync(request.CategoryId);
                if (category == null)
                    return Results.NotFound($"Category with ID {request.CategoryId} not found");

                // REMOVA esta validação se Category não tem UserId
                // if (category.UserId != transaction.UserId)
                //     return Results.BadRequest("Category does not belong to the user");

                transaction.Description = request.Description;
                transaction.Amount = request.Amount;
                transaction.Date = request.Date;
                transaction.CategoryId = request.CategoryId;

                await context.SaveChangesAsync();
                
                var response = new TransactionResponse
                {
                    Id = transaction.Id,
                    Description = transaction.Description,
                    Amount = transaction.Amount,
                    Date = transaction.Date,
                    Type = transaction.Type.ToString(),
                    CategoryId = transaction.CategoryId,
                    CategoryName = category.Name,
                    UserId = transaction.UserId,
                    UserName = transaction.User.Name
                };
                
                return Results.Ok(response);
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

        // DTOs
        public class CreateTransactionRequest
        {
            public string Description { get; set; } = string.Empty;
            public decimal Amount { get; set; }
            public DateTime Date { get; set; }
            public TransactionType Type { get; set; }
            public int UserId { get; set; }
            public int CategoryId { get; set; }
        }

        public class UpdateTransactionRequest
        {
            public string Description { get; set; } = string.Empty;
            public decimal Amount { get; set; }
            public DateTime Date { get; set; }
            public int CategoryId { get; set; }
        }

        public class TransactionResponse
        {
            public int Id { get; set; }
            public string Description { get; set; } = string.Empty;
            public decimal Amount { get; set; }
            public DateTime Date { get; set; }
            public string Type { get; set; } = string.Empty;
            public int CategoryId { get; set; }
            public string CategoryName { get; set; } = string.Empty;
            public int UserId { get; set; }
            public string UserName { get; set; } = string.Empty;
        }
    }
}