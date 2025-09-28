namespace PersonalFinanceApi.Dtos;

/// <summary>
/// Representa a requisição para criar uma nova transação.
/// </summary>
/// <param name="Description">A descrição da transação.</param>
/// <param name="Amount">O valor monetário da transação.</param>
/// <param name="Date">A data da transação.</param>
/// <param name="CategoryId">O ID da categoria para esta transação.</param>
/// <param name="UserId">O ID do usuário para esta transação.</param>
public record CreateTransactionRequest(
    string Description,
    decimal Amount,
    DateTime Date,
    int CategoryId,
    int UserId
);
