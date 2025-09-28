using Microsoft.AspNetCore.Mvc;
using MiniValidation;
using PersonalFinanceApi.Data;
using PersonalFinanceApi.Dtos;
using PersonalFinanceApi.Models;

namespace PersonalFinanceApi.Endpoints;

/// <summary>
/// Mapeia os endpoints relacionados a usuários.
/// </summary>
public static class UserEndpoints
{
    /// <summary>
    /// Mapeia todos os endpoints de usuário para a aplicação web.
    /// </summary>
    /// <param name="app">A aplicação web.</param>
    public static void MapUserEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/users").WithTags("Users");

        /// <summary>
        /// Cria um novo usuário.
        /// </summary>
        group.MapPost("/", async (CreateUserRequest request, AppDbContext context) =>
        {
            if (!MiniValidator.TryValidate(request, out var errors))
                return Results.ValidationProblem(errors);

            var user = new User
            {
                Name = request.Name,
                Email = request.Email
            };

            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();

            return Results.Created($"/users/{user.Id}", user);
        })
        .WithName("CreateUser")
        .Produces<User>(StatusCodes.Status201Created)
        .Produces<ValidationProblemDetails>(StatusCodes.Status400BadRequest)
        .WithOpenApi();
    }
}
