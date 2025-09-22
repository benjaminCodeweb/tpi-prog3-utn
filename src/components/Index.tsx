
import { useState } from 'react';
import { type Product } from '../types'
import NewProduct from './productsCompos/NewProduct';
import Products from './productsCompos/Products'
import { Icon } from './assetsComponents/Icons';

export type ProductProps = {
  products: Product[],
  onLogout: () => void;
  onRefresh: () => void;

}
function Index({products, onLogout, onRefresh}:ProductProps) {
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
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon />
          <span className="text-xl font-bold text-blue-600">Tiendafy</span>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition"
        >
          Cerrar sesión
        </button>
      </header>

      {/* Main */}
      <main className="flex-1 px-8 py-10 max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Mis productos</h2>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg shadow transition"
          >
            ➕ Agregar producto
          </button>
        </div>

        {/* Formulario de nuevo producto */}
        {add && (
          <div className="mb-8">
            <NewProduct productAdded={productAdded} />
          </div>
        )}

        {/* Listado de productos */}
        <Products products={products} />
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 text-center text-gray-500 border-t mt-12">
        © {new Date().getFullYear()} Tiendafy — Todos los derechos reservados.
      </footer>
    </div>

  )
}

export default Index