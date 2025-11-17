import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importando suas páginas
import Inicio from "./pages/Inicio";
import Transacoes from "./pages/Transacoes";
import Categorias from "./pages/Categorias";
import Relatorios from "./pages/Relatorios";
import NotFound from "./pages/NotFound";

// Criando o cliente para gerenciamento de dados
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/transacoes" element={<Transacoes />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  </QueryClientProvider>
);

export default App;