using PersonalFinanceApi.Models;

namespace PersonalFinanceApi.Dtos;

/// <summary>
/// Representa a resposta para uma transação.
/// </summary>
/// <param name="Id">O identificador único da transação.</param>
/// <param name="Description">A descrição da transação.</param>
/// <param name="Amount">O valor monetário da transação.</param>
/// <param name="Date">A data da transação.</param>
/// <param name="Type">O tipo da transação (Receita ou Despesa).</param>
/// <param name="CategoryName">O nome da categoria.</param>
/// <param name="CategoryId">O ID da categoria.</param>
public record TransactionResponse(
    int Id,
    string Description,
    decimal Amount,
    DateTime Date,
    TransactionType Type,
    string CategoryName,
    int CategoryId
);
