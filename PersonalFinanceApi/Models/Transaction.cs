using System.ComponentModel.DataAnnotations.Schema;

namespace PersonalFinanceApi.Models;

/// <summary>
/// Representa uma única transação financeira.
/// </summary>
public class Transaction
{
    /// <summary>
    /// O identificador único para a transação.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Uma descrição da transação.
    /// </summary>
    public string Description { get; set; } = string.Empty;

    /// <summary>
    /// O valor monetário da transação.
    /// </summary>
    [Column(TypeName = "decimal(18, 2)")]
    public decimal Amount { get; set; }

    /// <summary>
    /// A data e hora em que a transação ocorreu.
    /// </summary>
    public DateTime Date { get; set; } = DateTime.Now;

    /// <summary>
    /// O tipo da transação (Receita ou Despesa).
    /// </summary>
    public TransactionType Type { get; set; }
    
    /// <summary>
    /// A chave estrangeira para a categoria associada.
    /// </summary>
    public int CategoryId { get; set; }

    /// <summary>
    /// A propriedade de navegação para a categoria associada.
    /// </summary>
    public Category Category { get; set; } = null!;
    
    /// <summary>
    /// A chave estrangeira para o usuário associado.
    /// </summary>
    public int UserId { get; set; }

    /// <summary>
    /// A propriedade de navegação para o usuário associado.
    /// </summary>
    public User User { get; set; } = null!;
}
