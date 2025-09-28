using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiniValidation;
using PersonalFinanceApi.Data;
using PersonalFinanceApi.Dtos;
using PersonalFinanceApi.Models;

namespace PersonalFinanceApi.Endpoints;

/// <summary>
/// Mapeia os endpoints relacionados a transações.
/// </summary>
public static class TransactionEndpoints
{
    /// <summary>
    /// Mapeia todos os endpoints de transação para a aplicação web.
    /// </summary>
    /// <param name="app">A aplicação web.</param>
    public static void MapTransactionEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/transactions").WithTags("Transactions");

        /// <summary>
        /// Obtém todas as transações para um usuário específico.
        /// </summary>
        group.MapGet("/user/{userId}", async (int userId, AppDbContext context) =>
        {
            var transactions = await context.Transactions
                .AsNoTracking()
                .Where(t => t.UserId == userId)
                .Include(t => t.Category)
                .Select(t => new TransactionResponse(
                    t.Id,
                    t.Description,
                    t.Amount,
                    t.Date,
                    t.Type,
                    t.Category.Name,
                    t.CategoryId))
                .ToListAsync();

            return Results.Ok(transactions);
        })
        .WithName("GetTransactionsByUser")
        .Produces<List<TransactionResponse>>()
        .WithOpenApi();

        /// <summary>
        /// Obtém uma transação específica pelo seu ID.
        /// </summary>
        group.MapGet("/{id}", async (int id, AppDbContext context) =>
        {
            var transaction = await context.Transactions
                .AsNoTracking()
                .Include(t => t.Category)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (transaction is null)
                return Results.NotFound();

            var response = new TransactionResponse(
                transaction.Id,
                transaction.Description,
                transaction.Amount,
                transaction.Date,
                transaction.Type,
                transaction.Category.Name,
                transaction.CategoryId);

            return Results.Ok(response);
        })
        .WithName("GetTransactionById")
        .Produces<TransactionResponse>()
        .Produces(StatusCodes.Status404NotFound)
        .WithOpenApi();

        /// <summary>
        /// Cria uma nova transação.
        /// </summary>
        group.MapPost("/", async (CreateTransactionRequest request, AppDbContext context) =>
        {
            if (!MiniValidator.TryValidate(request, out var errors))
                return Results.ValidationProblem(errors);

            var category = await context.Categories.FindAsync(request.CategoryId);
            if (category is null)
                return Results.BadRequest("Invalid CategoryId.");
                
            var user = await context.Users.FindAsync(request.UserId);
            if (user is null)
                return Results.BadRequest("Invalid UserId. User must exist before creating a transaction.");

            var transaction = new Transaction
            {
                Description = request.Description,
                Amount = request.Amount,
                Date = request.Date,
                CategoryId = request.CategoryId,
                UserId = request.UserId,
                Type = category.Type // Define o tipo de transação com base em sua categoria
            };

            await context.Transactions.AddAsync(transaction);
            await context.SaveChangesAsync();

            var response = new TransactionResponse(
                transaction.Id,
                transaction.Description,
                transaction.Amount,
                transaction.Date,
                transaction.Type,
                category.Name,
                transaction.CategoryId);

            return Results.Created($"/transactions/{transaction.Id}", response);
        })
        .WithName("CreateTransaction")
        .Produces<TransactionResponse>(StatusCodes.Status201Created)
        .Produces<ValidationProblemDetails>(StatusCodes.Status400BadRequest)
        .WithOpenApi();

        /// <summary>
        /// Atualiza uma transação existente.
        /// </summary>
        group.MapPut("/{id}", async (int id, CreateTransactionRequest request, AppDbContext context) =>
        {
            if (!MiniValidator.TryValidate(request, out var errors))
                return Results.ValidationProblem(errors);

            var transaction = await context.Transactions.FindAsync(id);
            if (transaction is null)
                return Results.NotFound();

            var category = await context.Categories.FindAsync(request.CategoryId);
            if (category is null)
                return Results.BadRequest("Invalid CategoryId.");
                
            var user = await context.Users.FindAsync(request.UserId);
            if (user is null)
                return Results.BadRequest("Invalid UserId.");

            transaction.Description = request.Description;
            transaction.Amount = request.Amount;
            transaction.Date = request.Date;
            transaction.CategoryId = request.CategoryId;
            transaction.UserId = request.UserId;
            transaction.Type = category.Type;

            context.Transactions.Update(transaction);
            await context.SaveChangesAsync();

            return Results.NoContent();
        })
        .WithName("UpdateTransaction")
        .Produces(StatusCodes.Status204NoContent)
        .Produces<ValidationProblemDetails>(StatusCodes.Status400BadRequest)
        .Produces(StatusCodes.Status404NotFound)
        .WithOpenApi();

        /// <summary>
        /// Exclui uma transação pelo seu ID.
        /// </summary>
        group.MapDelete("/{id}", async (int id, AppDbContext context) =>
        {
            var transaction = await context.Transactions.FindAsync(id);
            if (transaction is null)
                return Results.NotFound();

            context.Transactions.Remove(transaction);
            await context.SaveChangesAsync();

            return Results.NoContent();
        })
        .WithName("DeleteTransaction")
        .Produces(StatusCodes.Status204NoContent)
        .Produces(StatusCodes.Status404NotFound)
        .WithOpenApi();
    }
}
