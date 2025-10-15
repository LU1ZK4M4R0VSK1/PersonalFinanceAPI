using PersonalFinanceApi.Data;
using PersonalFinanceApi.Models;

namespace PersonalFinanceApi.Endpoints
{
    public static class UserEndpoints
    {
        public static void MapUserEndpoints(this WebApplication app)
        {
            var group = app.MapGroup("/users").WithTags("Users");

            group.MapPost("/", async (CreateUserRequest request, AppDbContext context) =>
            {
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
            .WithOpenApi();
        }
    }

    public class CreateUserRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }
}