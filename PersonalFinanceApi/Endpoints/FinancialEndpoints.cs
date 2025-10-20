using PersonalFinanceApi.Services;

namespace PersonalFinanceApi.Endpoints
{
    public static class FinancialEndpoints
    {
        public static void MapFinancialEndpoints(this WebApplication app)
        {
            var financialGroup = app.MapGroup("/financial").WithTags("Financial");

            financialGroup.MapGet("/summary/{userId}", async (int userId, FinancialService financialService) =>
            {
                try
                {
                    var summary = await financialService.GetFinancialSummaryAsync(userId);
                    return Results.Ok(summary);
                }
                catch (ArgumentException ex)
                {
                    return Results.BadRequest(ex.Message);
                }
            })
            .WithName("GetFinancialSummary")
            .WithOpenApi();

            financialGroup.MapPost("/report", async (TransactionReportRequest request, FinancialService financialService) =>
            {
                try
                {
                    if (request.StartDate > request.EndDate)
                        return Results.BadRequest("Data inicial não pode ser após data final");

                    var report = await financialService.GetTransactionReportAsync(request);
                    return Results.Ok(report);
                }
                catch (ArgumentException ex)
                {
                    return Results.BadRequest(ex.Message);
                }
            })
            .WithName("GetTransactionReport")
            .WithOpenApi();

            financialGroup.MapGet("/monthly-summary/{userId}/{year}/{month}", async (int userId, int year, int month, FinancialService financialService) =>
            {
                try
                {
                    var startDate = new DateTime(year, month, 1);
                    var endDate = startDate.AddMonths(1).AddDays(-1);

                    var request = new TransactionReportRequest
                    {
                        UserId = userId,
                        StartDate = startDate,
                        EndDate = endDate
                    };

                    var report = await financialService.GetTransactionReportAsync(request);
                    
                    var income = report.Transactions
                        .Where(t => t.Type == "Income")
                        .Sum(t => t.Amount);
                    
                    var expenses = report.Transactions
                        .Where(t => t.Type == "Expense")
                        .Sum(t => t.Amount);

                    return Results.Ok(new
                    {
                        UserId = userId,
                        Year = year,
                        Month = month,
                        TotalIncome = income,
                        TotalExpenses = expenses,
                        Balance = income - expenses,
                        TotalTransactions = report.TotalTransactions
                    });
                }
                catch (ArgumentException ex)
                {
                    return Results.BadRequest(ex.Message);
                }
            })
            .WithName("GetMonthlySummary")
            .WithOpenApi();
        }
    }
}