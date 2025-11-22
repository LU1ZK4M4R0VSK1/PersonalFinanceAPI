import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout/Layout";
import Inicio from "./pages/Inicio";
import Transacoes from "./pages/Transacoes";
import Categorias from "./pages/Categorias";
import Relatorios from "./pages/Relatorios";
import NotFound from "./pages/NotFound";

// Componentes simples para substituir os que não estão funcionando
const SimpleToaster = () => <div />;
const SimpleSonner = () => <div />;
const SimpleTooltipProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SimpleTooltipProvider>
      <SimpleToaster />
      <SimpleSonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/transacoes" element={<Transacoes />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </SimpleTooltipProvider>
  </QueryClientProvider>
);

export default App;