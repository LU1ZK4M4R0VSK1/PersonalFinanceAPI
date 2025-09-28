namespace PersonalFinanceApi.Models;

/// <summary>
/// Define o tipo de uma transação.
/// </summary>
public enum TransactionType
{
    /// <summary>
    /// Uma transação que representa uma despesa.
    /// </summary>
    Expense = 0,

    /// <summary>
    /// Uma transação que representa uma receita.
    /// </summary>
    Income = 1
}
