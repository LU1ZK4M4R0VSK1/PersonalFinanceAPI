namespace PersonalFinanceApi.Dtos;

/// <summary>
/// Representa a requisição para criar um novo usuário.
/// </summary>
/// <param name="Name">O nome do usuário.</param>
/// <param name="Email">O endereço de e-mail do usuário.</param>
public record CreateUserRequest(
    string Name,
    string Email
);
