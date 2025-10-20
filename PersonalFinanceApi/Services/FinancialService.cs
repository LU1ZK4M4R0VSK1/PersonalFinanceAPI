using Microsoft.EntityFrameworkCore;
using PersonalFinanceApi.Data;
using PersonalFinanceApi.Models;

namespace PersonalFinanceApi.Services
{
    public class FinancialService
    {
        private readonly AppDbContext _context;

        public FinancialService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<FinancialSummaryResponse> GetFinancialSummaryAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) throw new ArgumentException("Usuário não encontrado");

            var transactions = await _context.Transactions
                .Include(t => t.Category)
                .Where(t => t.UserId == userId)
                .ToListAsync();

            var totalIncome = transactions
                .Where(t => t.Type == TransactionType.Income)
                .Sum(t => t.Amount);

            var totalExpenses = transactions
                .Where(t => t.Type == TransactionType.Expense)
                .Sum(t => t.Amount);

            var categorySummaries = transactions
                .GroupBy(t => new { t.Category.Name, CategoryType = t.Type.ToString() })
                .Select(g => new CategorySummary
                {
                    CategoryName = g.Key.Name,
                    CategoryType = g.Key.CategoryType,
                    TotalAmount = g.Sum(t => t.Amount),
                    TransactionCount = g.Count()
                })
                .OrderByDescending(cs => cs.TotalAmount)
                .ToList();

            return new FinancialSummaryResponse
            {
                UserId = userId,
                UserName = user.Name,
                TotalIncome = totalIncome,
                TotalExpenses = totalExpenses,
                Balance = totalIncome - totalExpenses,
                CategorySummaries = categorySummaries,
                GeneratedAt = DateTime.UtcNow
            };
        }

        public async Task<TransactionReportResponse> GetTransactionReportAsync(TransactionReportRequest request)
        {
            var user = await _context.Users.FindAsync(request.UserId);
            if (user == null) throw new ArgumentException("Usuário não encontrado");

            var query = _context.Transactions
                .Include(t => t.Category)
                .Include(t => t.User)
                .Where(t => t.UserId == request.UserId &&
                           t.Date >= request.StartDate &&
                           t.Date <= request.EndDate);

            if (!string.IsNullOrEmpty(request.CategoryType))
            {
                query = query.Where(t => t.Type.ToString() == request.CategoryType);
            }

            var transactions = await query
                .OrderByDescending(t => t.Date)
                .Select(t => new TransactionResponse
                {
                    Id = t.Id,
                    Description = t.Description,
                    Amount = t.Amount,
                    Date = t.Date,
                    Type = t.Type.ToString(),
                    CategoryId = t.CategoryId,
                    CategoryName = t.Category.Name,
                    UserId = t.UserId,
                    UserName = t.User.Name
                })
                .ToListAsync();

            return new TransactionReportResponse
            {
                UserId = request.UserId,
                UserName = user.Name,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                Transactions = transactions,
                TotalAmount = transactions.Sum(t => t.Amount),
                TotalTransactions = transactions.Count
            };
        }
    }

    // DTOs para o FinancialService
    public class FinancialSummaryResponse
    {
        public int UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public decimal TotalIncome { get; set; }
        public decimal TotalExpenses { get; set; }
        public decimal Balance { get; set; }
        public List<CategorySummary> CategorySummaries { get; set; } = new();
        public DateTime GeneratedAt { get; set; }
    }

    public class CategorySummary
    {
        public string CategoryName { get; set; } = string.Empty;
        public string CategoryType { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
        public int TransactionCount { get; set; }
    }

    public class TransactionReportRequest
    {
        public int UserId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? CategoryType { get; set; } // "Income" ou "Expense"
    }

    public class TransactionReportResponse
    {
        public int UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<TransactionResponse> Transactions { get; set; } = new();
        public decimal TotalAmount { get; set; }
        public int TotalTransactions { get; set; }
    }

    // Reutilizando o TransactionResponse do TransactionEndpoints
    public class TransactionResponse
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string Type { get; set; } = string.Empty;
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public int UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
    }
}