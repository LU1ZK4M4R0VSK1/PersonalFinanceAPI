using Microsoft.EntityFrameworkCore;
using PersonalFinanceApi.Data;
using PersonalFinanceApi.Endpoints;

var builder = WebApplication.CreateBuilder(args);

// 1. Adiciona serviços ao contêiner.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    // Configura o Swagger para usar comentários XML.
    var xmlFilename = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(System.IO.Path.Combine(AppContext.BaseDirectory, xmlFilename));
});

// Adiciona ProblemDetails para respostas de erro HTTP padronizadas.
builder.Services.AddProblemDetails();

// Adiciona AppDbContext para o Entity Framework Core.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(connectionString));

var app = builder.Build();

// 2. Configura o pipeline de requisições HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Personal Finance API V1");
        c.RoutePrefix = string.Empty; // Define a UI do Swagger na raiz da aplicação
    });
}

// Habilita o tratamento padronizado de códigos de status.
app.UseStatusCodePages();

app.UseHttpsRedirection();

// 3. Mapeia os endpoints da API.
app.MapTransactionEndpoints();
app.MapCategoryEndpoints();
app.MapDashboardEndpoints();
app.MapUserEndpoints();

// Um endpoint raiz simples para dar as boas-vindas aos usuários.
app.MapGet("/", () => Results.Redirect("/index.html", permanent: false))
   .ExcludeFromDescription(); // Ocultar do Swagger

app.Run();