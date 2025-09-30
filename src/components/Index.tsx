
import { useContext, useState } from 'react';
import { type Product } from '../types'
import NewProduct from './productsCompos/NewProduct';
import Products from './productsCompos/Products'
import { Icon } from './assetsComponents/Icons';
import { themeContext } from '../services/ThemeProvider';

export type ProductProps = {
  products: Product[],
  onLogout: () => void;
  onRefresh: () => void;
  onStats: () => void;
  onDelete: (id:number) => void;
  onDeleteToast: boolean


}
function Index({products, onLogout, onRefresh, onStats, onDelete, onDeleteToast}:ProductProps) {
  const [add,setAdd] = useState(false);
  
  



  const handleAdd = () => {
    setAdd(!add);


  }

  const productAdded = () => {
    setAdd(false);
     onRefresh()
  }
  
  const handleLogout = () => {
    try {

      onLogout()
    }catch(err){
      console.error('error interno',err);
    }
  };

  const handleStats = () => {
      onStats();
  };


  const context = useContext(themeContext)
  if (!context) {
  throw new Error("themeContext debe estar dentro de ThemeContextProvider");
}

  const {toggleTheme} = context;
  
  return (
   <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
  {/* Header */}
  <header className="bg-white dark:bg-gray-800 shadow-sm px-8 py-4 flex items-center justify-between transition-colors duration-300">
    {/* Logo + nombre */}
    <div className="flex items-center gap-2">
      <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
        Tiendafy
      </span>
    </div>

    {/* Menú */}
    <nav className="flex items-center gap-4">
      <button
        onClick={handleStats}
        className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
      >
        📊 Stats
      </button>
      <button
        onClick={toggleTheme}
        className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
      >
        🌗 Tema
      </button>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow-sm transition"
      >
        Cerrar sesión
      </button>
    </nav>
  </header>

  {/* Main */}
  <main className="flex-1 px-8 py-10 max-w-6xl mx-auto w-full">
    {/* Header sección */}
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        📦 Mis productos
      </h2>
      <button
        onClick={handleAdd}
        className="flex items-center gap-1 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-md transition"
      >
        ➕ Agregar
      </button>
    </div>

    {/* Formulario de nuevo producto */}
    {add && (
      <div className="mb-10">
        <NewProduct productAdded={productAdded} />
      </div>
    )}

    {/* Toast */}
    {onDeleteToast && (
      <div className="fixed top-6 right-6 z-50 animate-fadeIn">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg bg-green-600 text-white">
          <span className="text-lg">✅</span>
          <p className="font-medium">Producto eliminado correctamente</p>
        </div>
      </div>
    )}

    {/* Listado de productos */}
    <section>
      <Products products={products} onDelete={onDelete} />
    </section>
  </main>

  {/* Footer */}
  <footer className="bg-white dark:bg-gray-800 py-6 text-center text-gray-500 dark:text-gray-400 border-t dark:border-gray-700 mt-12 transition-colors duration-300">
    © {new Date().getFullYear()} Tiendafy — Todos los derechos reservados.
  </footer>
</div>

  )
}

export default Index