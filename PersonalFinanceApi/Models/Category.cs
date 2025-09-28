namespace PersonalFinanceApi.Models;

/// <summary>
/// Representa uma categoria para transações.
/// </summary>
public class Category
{
    /// <summary>
    /// O identificador único para a categoria.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// O nome da categoria.
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// O tipo de transação ao qual esta categoria se aplica (Receita ou Despesa).
    /// </summary>
    public TransactionType Type { get; set; }

    /// <summary>
    /// A lista de transações associadas a esta categoria.
    /// </summary>
    public List<Transaction> Transactions { get; set; } = new();
}
