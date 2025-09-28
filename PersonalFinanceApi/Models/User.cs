namespace PersonalFinanceApi.Models;

/// <summary>
/// Representa um usuário no sistema.
/// </summary>
public class User
{
    /// <summary>
    /// O identificador único para o usuário.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// O nome do usuário.
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// O endereço de e-mail do usuário.
    /// </summary>
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// A lista de transações associadas ao usuário.
    /// </summary>
    public List<Transaction> Transactions { get; set; } = new();
}
