
import { useContext, useEffect, useState } from 'react';
import { type Product } from '../types'
import Products from './productsCompos/Products'
import { themeContext } from '../services/ThemeProvider';
import NewProductModal from './modalComponents/NewProductModal';
import '../index.css';

export type ProductProps = {
  products: Product[],
  onLogout: () => void;
  onRefresh: () => void;
  onStats: () => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, nombre: string, describe: string, precio: number, categoria: string) => void

  onDeleteToast: boolean
  onEditToast: boolean

}
function Index({ products, onLogout, onRefresh, onStats, onDelete, onDeleteToast, onEditToast, onEdit }: ProductProps) {
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState<Product | null>(null);
  const [search, setSearch] = useState<string>('')
  const { theme, toggleTheme } = useContext(themeContext);

  const handleAdd = () => {
    setAdd(!add);


  }
  useEffect(() => {
    onRefresh()
  }, [])
  const productAdded = () => {
    setAdd(false);
    onRefresh()
  }

  const handleLogout = () => {
    try {

      onLogout()
    } catch (err) {
      console.error('error interno', err);
    }
  };

  const handleStats = () => {
    onStats();
  };

  const handleStartEdit = (product: Product) => {
    setEdit(product)   // 👉 guarda producto seleccionado
    setAdd(true)               // 👉 abre formulario
  }




  return (
    <div
      className={`min-h-screen flex flex-col transition-theme duration-300 ${theme === "dark" ? "dark" : ""
        }`}
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      {/* Header */}
      <header className="bg-white shadow-sm px-8 py-4 flex items-center justify-between transition-theme duration-300">
        {/* Logo + nombre */}
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-blue-600">🛒 Tiendafy</h1>
        </div>

        {/* Menú */}
        <nav className="flex items-center gap-4">
          <button
            onClick={handleStats}
            className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-theme"
          >
            📊 Stats
          </button>
          <button className="btn" onClick={toggleTheme}>
            Cambiar a {theme === "light" ? "oscuro 🌙" : "claro ☀️"}
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow-sm transition-theme"
          >
            Cerrar sesión
          </button>
        </nav>
      </header>

      {/* Main */}
      <main className="flex-1 px-8 py-10 max-w-6xl mx-auto w-full">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar producto..."
          className="w-full max-w-sm px-4 py-2.5 rounded-lg border border-gray-200 bg-white 
             text-gray-700 text-sm placeholder-gray-400 shadow-sm 
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
             transition-all duration-200"
        /> 
         
        
        {/* Header sección */}
        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-bold text-gray-800 transition-theme">
            📦 Mis productos
          </h2>
          <button
            onClick={handleAdd}
            className="btn-primary px-3 py-1.5 text-sm font-medium rounded-md transition-theme"
          >
            ➕ Agregar
          </button>

        </div>

        <NewProductModal
          isOpen={add}
          onClose={() => setAdd(false)}
          productAdded={productAdded}
          onEdit={onEdit}
          productToEdit={edit}
        />

        {/* Toasts */}
        {onDeleteToast && (
          <div className="fixed top-6 right-6 z-50 animate-fadeIn">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg bg-green-600 text-white">
              <span className="text-lg">✅</span>
              <p className="font-medium">Producto eliminado correctamente</p>
            </div>
          </div>
        )}
        {onEditToast && (
          <div className="fixed top-6 right-6 z-50 animate-fadeIn">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg bg-green-600 text-white">
              <span className="text-lg">✅</span>
              <p className="font-medium">Producto editado correctamente</p>
            </div>
          </div>
        )}

        {/* Listado de productos */}
        <section>
          <Products products={products} onDelete={onDelete} onSearch={() => search} onStartEdit={handleStartEdit} />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 text-center text-gray-500 border-t mt-12 transition-theme duration-300">
        © {new Date().getFullYear()} Tiendafy — Todos los derechos reservados.
      </footer>
    </div>
  )
}

export default Index