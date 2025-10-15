using PersonalFinanceApi.Data;
using PersonalFinanceApi.Models;
using Microsoft.EntityFrameworkCore;

namespace PersonalFinanceApi.Services
{
    public class FinancialService
    {
        private readonly AppDbContext _context;

        public FinancialService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<decimal> GetTotalBalanceAsync(int userId)
        {
            var income = await _context.Transactions
                .Where(t => t.UserId == userId && t.Type == TransactionType.Income)
                .SumAsync(t => t.Amount);
                
            var expense = await _context.Transactions
                .Where(t => t.UserId == userId && t.Type == TransactionType.Expense)
                .SumAsync(t => t.Amount);
                
            return income - expense;
        }
    }
}