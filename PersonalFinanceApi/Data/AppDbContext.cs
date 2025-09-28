using Microsoft.EntityFrameworkCore;
using PersonalFinanceApi.Models;

namespace PersonalFinanceApi.Data;

/// <summary>
/// O contexto do banco de dados para a aplicação.
/// </summary>
public class AppDbContext : DbContext
{
    /// <summary>
    /// Inicializa uma nova instância da classe <see cref="AppDbContext"/>.
    /// </summary>
    /// <param name="options">As opções para este contexto.</param>
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    /// <summary>
    /// Obtém ou define o conjunto de usuários.
    /// </summary>
    public DbSet<User> Users { get; set; } = null!;

    /// <summary>
    /// Obtém ou define o conjunto de categorias.
    /// </summary>
    public DbSet<Category> Categories { get; set; } = null!;

    /// <summary>
    /// Obtém ou define o conjunto de transações.
    /// </summary>
    public DbSet<Transaction> Transactions { get; set; } = null!;

    /// <summary>
    /// Configura o esquema necessário para o framework de identidade.
    /// </summary>
    /// <param name="modelBuilder">O construtor que está sendo usado para construir o modelo para este contexto.</param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Usuário para Transação (Um-para-Muitos)
        modelBuilder.Entity<User>()
            .HasMany(u => u.Transactions)
            .WithOne(t => t.User)
            .HasForeignKey(t => t.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // Categoria para Transação (Um-para-Muitos)
        modelBuilder.Entity<Category>()
            .HasMany(c => c.Transactions)
            .WithOne(t => t.Category)
            .HasForeignKey(t => t.CategoryId)
            .OnDelete(DeleteBehavior.Restrict); // Impede a exclusão de uma categoria se ela tiver transações

        // Popular Categorias
        modelBuilder.Entity<Category>().HasData(
            // Categorias de Despesa
            new { Id = 1, Name = "Food", Type = TransactionType.Expense },
            new { Id = 2, Name = "Transportation", Type = TransactionType.Expense },
            new { Id = 3, Name = "Housing", Type = TransactionType.Expense },
            new { Id = 4, Name = "Utilities", Type = TransactionType.Expense },
            new { Id = 5, Name = "Health", Type = TransactionType.Expense },
            new { Id = 6, Name = "Entertainment", Type = TransactionType.Expense },
            new { Id = 7, Name = "Other Expenses", Type = TransactionType.Expense },

            // Categorias de Receita
            new { Id = 8, Name = "Salary", Type = TransactionType.Income },
            new { Id = 9, Name = "Freelance", Type = TransactionType.Income },
            new { Id = 10, Name = "Investment", Type = TransactionType.Income },
            new { Id = 11, Name = "Other Income", Type = TransactionType.Income }
        );
    }
}
