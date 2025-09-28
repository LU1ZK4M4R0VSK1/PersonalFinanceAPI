 ### 1. 📝 Desenvolvimento de software visual


   * Nome do Projeto: Sistema de Controle de Finanças Pessoais
  O sistema de Controle de Finanças Pessoais foi desenvolvido para resolver o problema da falta de
  visibilidade e organização das finanças diárias. Ele permite que os usuários registrem e gerenciem suas
  receitas e despesas de forma simples e centralizada.


   * Público-alvo: Usuários que desejam ter um controle claro sobre suas movimentações financeiras,
     categorizar seus gastos e receitas, e acompanhar o saldo consolidado de suas contas.
  ---

  ### 3. 🏗️ ARQUITETURA DO PROJETO

  A estrutura do projeto foi organizada para separar as responsabilidades, facilitando a manutenção e
  escalabilidade.


  `
  PersonalFinanceApi/
  ├── Models/                 # Contém as classes que representam as tabelas do banco de dados (User,
  Category, Transaction).
  ├── Data/                   # Contém o AppDbContext, responsável pela comunicação com o banco de dados via
   Entity Framework Core.
  ├── DTOs/                   # (Data Transfer Objects) Objetos para modelar os dados que entram e saem da
  API.
  ├── Endpoints/              # Define os endpoints da API usando o padrão de Minimal APIs.
  ├── Properties/             # Contém configurações de execução do projeto, como o launchSettings.json.
  ├── Migrations/             # Arquivos gerados pelo EF Core para versionar o schema do banco de dados.
  ├── appsettings.json        # Arquivo de configuração da aplicação.
  ├── Program.cs              # Ponto de entrada da aplicação, onde os serviços são configurados e o
  pipeline de requisições é montado.
  └── PersonalFinanceApi.csproj # Arquivo de projeto do .NET, que define as dependências e configurações de
  build.
  `

  ---

  ### 4. 📊 EXPLICAÇÃO DAS ENTIDADES (MODELS)


  User.cs
  Category.cs
  Transaction.cs
  ---

  ### 5. 🔗 EXPLICAÇÃO DOS ENDPOINTS DA API


  Category Endpoints
  `json
      [
        { "id": 1, "name": "Food", "type": 1 },
        { "id": 8, "name": "Salary", "type": 0 }
      ]
      `


  Transaction Endpoints (CRUD)
   * URL e Método: GET /transactions/user/{userId}
   * URL e Método: GET /transactions/{id}
   * URL e Método: PUT /transactions/{id}
   * URL e Método: DELETE /transactions/{id}
  Dashboard Endpoints
  `json
      {
        "totalIncome": 5000.00,
        "totalExpenses": 1500.50,
        "balance": 3499.50
      }
      `

  ---

  ### 6. 🗃️ CONFIGURAÇÃO DO BANCO DE DADOS


   * SQLite: Foi escolhido por ser um banco de dados leve, baseado em arquivo único (personalfinance.db) e que
      não exige um servidor dedicado. É ideal para desenvolvimento, prototipagem e aplicações de pequeno a
     médio porte. A configuração da conexão está no appsettings.json.
  7. 🚀 COMO EXECUTAR O PROJETO
   1. Restaurar as dependências do .NET:
  `bash
      dotnet run
      `
      Após a execução, a API estará disponível em https://localhost:<porta> e a interface do Swagger poderá
  ser acessada no navegador para testar os endpoints.

  ---

  ### 8. 🔧 FLUXO DE FUNCIONAMENTO


  O fluxo operacional do sistema é centrado no usuário e suas transações.


  Diagrama mental do fluxo:
  Usuário → Acessa a API → Cria/Lê uma Transação → Transação é associada a uma Categoria → Dados são
  persistidos no Banco de Dados → Dashboard é atualizado


  Ciclo de uma operação (Ex: criar transação):
  1.  O usuário envia uma requisição POST /transactions com os dados da transação (descrição, valor, data,
  ID da categoria e ID do usuário).
  2.  A API recebe a requisição no TransactionEndpoints.
  3.  O sistema valida os dados recebidos.
  4.  Busca a Category correspondente para determinar se a transação é Income ou Expense.
  5.  Cria uma nova instância do objeto Transaction e a preenche.
  6.  O AppDbContext do Entity Framework Core adiciona o novo objeto à sessão.
  7.  O método SaveChangesAsync() é chamado, e o EF Core traduz o objeto em um comando SQL INSERT,
  persistindo os dados no banco de dados SQLite.
  8.  A API retorna uma resposta 201 Created com os dados da transação recém-criada.

  ---

  ### 9. 💡 PRINCIPAIS FUNCIONALIDADES IMPLEMENTADAS


   * ✅ CRUD completo de transações: Funcionalidades para criar, ler, atualizar e deletar transações.
  10. 🛠️ TECNOLOGIAS E BIBLIOTECAS
   * .NET 8: Versão mais recente do framework da Microsoft, oferecendo melhorias de performance, novos
     recursos de linguagem C# e suporte de longo prazo (LTS).
  Os exemplos abaixo podem ser executados usando uma ferramenta de cliente HTTP como o Postman ou a própria
  interface do Swagger.

  #### Exemplo 1: Criar uma transação de receita

  `http
  POST /transactions
  Host: https://localhost:7123
  Content-Type: application/json

  {
    "description": "Salário mensal",
    "amount": 5000.00,
    "date": "2025-09-22T10:00:00Z",
    "categoryId": 8,
    "userId": 1
  }
  `
  Nota: `userId` deve ser um usuário válido. Como não há endpoint de criação de usuário, você pode adicionar
   um manualmente ao banco de dados ou assumir que o ID `1` existe.

  #### Exemplo 2: Obter o resumo financeiro do usuário

  `http
  GET /dashboard/summary/1
  Host: https://localhost:7123
  `
  Resposta esperada:
  `json
  {
      "totalIncome": 5000.00,
      "totalExpenses": 0.00,
      "balance": 5000.00
  }
  `


  ---

  ### 12. 🔍 VALIDAÇÕES E TRATAMENTO DE ERROS


   * Validações:
   * Tratamento de Erros: