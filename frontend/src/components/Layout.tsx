import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between">
          <div className="text-white text-lg">Personal Finance</div>
          <div>
            <Link to="/" className="text-gray-300 hover:text-white mr-4">Início</Link>
            <Link to="/transacoes" className="text-gray-300 hover:text-white mr-4">Transações</Link>
            <Link to="/categorias" className="text-gray-300 hover:text-white mr-4">Categorias</Link>
            <Link to="/relatorios" className="text-gray-300 hover:text-white">Relatórios</Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
