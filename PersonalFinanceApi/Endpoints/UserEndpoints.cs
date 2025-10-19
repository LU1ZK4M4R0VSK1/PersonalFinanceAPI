using Microsoft.EntityFrameworkCore;
using PersonalFinanceApi.Data;
using PersonalFinanceApi.Dtos;
using PersonalFinanceApi.Models;

namespace PersonalFinanceApi.Endpoints
{
    public static class UserEndpoints
    {
        public static void MapUserEndpoints(this WebApplication app)
        {
            var userGroup = app.MapGroup("/api/users");

            // GET ALL USERS
            userGroup.MapGet("/", async (AppDbContext context) =>
            {
                var users = await context.Users
                    .Select(u => new UserResponse
                    {
                        UserId = u.Id,  // Mudar de UserId para Id
                        Name = u.Name,
                        Email = u.Email
                    })
                    .ToListAsync();
                return Results.Ok(users);
            });

            // GET USER BY ID
            userGroup.MapGet("/{id}", async (int id, AppDbContext context) =>
            {
                var user = await context.Users
                    .Where(u => u.Id == id)  // Mudar de UserId para Id
                    .Select(u => new UserResponse
                    {
                        UserId = u.Id,  // Mudar de UserId para Id
                        Name = u.Name,
                        Email = u.Email
                    })
                    .FirstOrDefaultAsync();
                return user == null ? Results.NotFound() : Results.Ok(user);
            });

            // CREATE USER
            userGroup.MapPost("/", async (CreateUserRequest request, AppDbContext context) =>
            {
                if (await context.Users.AnyAsync(u => u.Email == request.Email))
                    return Results.BadRequest("Email já existe");

                var user = new User
                {
                    Name = request.Name,
                    Email = request.Email
                };

                context.Users.Add(user);
                await context.SaveChangesAsync();

                var response = new UserResponse
                {
                    UserId = user.Id,  // Mudar de UserId para Id
                    Name = user.Name,
                    Email = user.Email
                };

                return Results.Created($"/api/users/{user.Id}", response);  // Mudar de UserId para Id
            });

            // UPDATE USER
            userGroup.MapPut("/{id}", async (int id, UpdateUserRequest request, AppDbContext context) =>
            {
                var user = await context.Users.FindAsync(id);
                if (user == null) 
                    return Results.NotFound();

                if (await context.Users.AnyAsync(u => u.Email == request.Email && u.Id != id))  // Mudar de UserId para Id
                    return Results.BadRequest("Email já em uso");

                user.Name = request.Name;
                user.Email = request.Email;
                
                await context.SaveChangesAsync();

                return Results.Ok(new UserResponse
                {
                    UserId = user.Id,  // Mudar de UserId para Id
                    Name = user.Name,
                    Email = user.Email
                });
            });

            // DELETE USER
            userGroup.MapDelete("/{id}", async (int id, AppDbContext context) =>
            {
                var user = await context.Users.FindAsync(id);
                if (user == null) 
                    return Results.NotFound();

                var hasTransactions = await context.Transactions.AnyAsync(t => t.UserId == id);
                if (hasTransactions)
                    return Results.BadRequest("Não pode excluir usuário com transações associadas");

                context.Users.Remove(user);
                await context.SaveChangesAsync();
                return Results.NoContent();
            });
        }
    }
}