import { useEffect, useState } from "react"
import { type Product } from "../../types";
import axios from 'axios';
import ProductItem from "../productsCompos/ProductItem";
type ShopProps = {
  onAddCart: (product: Product) => void;
  cart: Product[];
  onBuy: () => void;
  onLogout: () => void;

}
function Shop({onAddCart, cart, onBuy, onLogout}: ShopProps){
    const [products, setProducts] = useState<Product[]>([]);
    const[cartVisible, setCartVisible] = useState(false);
    const token = localStorage.getItem('token');
    const fetchProducts = async() => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/general`, {
          headers: {Authorization: `Bearer ${token}`}
        });
        setProducts(response.data)
      }catch(err){
        console.error('error al hacer el fetch')
      }
    };
    const handleCart = () => {
      setCartVisible(!cartVisible)
    }
    
    const handleBuy =async () => {
        onBuy();
        await fetchProducts()
        
    }

    useEffect(() => {
        fetchProducts();
    },[]);

    const handleLogout = () => {

      onLogout();
    }

    return (
   <div className="bg-gray-50 min-h-screen flex flex-col">
  {/* Navbar */}
  <header className="bg-white shadow-sm px-8 py-4 flex items-center justify-between sticky top-0 z-40">
    <div className="flex items-center gap-2">
     
      <span className="text-xl font-bold text-blue-600">Tiendafy</span>
    </div>
    <nav className="flex items-center gap-4">
      {/* Botón carrito flotante */}
  <button
    onClick={handleCart}
    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg  font-semibold"
  >
    🛒 Carrito ({cart.length})
  </button>
      <button
        onClick={handleLogout}
        className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md transition"
      >
        Cerrar sesión
      </button>
    </nav>
  </header>

  {/* Main */}
  <main className="flex-1 px-6 py-12 max-w-6xl mx-auto w-full">
    {/* Título */}
    <h2 className="text-3xl font-extrabold text-gray-800 mb-10 text-center">
      🛍 Productos disponibles
    </h2>

    {/* Grid de productos */}
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductItem
            key={product.id}
            {...product}
            showActions={false}
            onCart={() => onAddCart(product)}
          />
        ))
      ) : (
        <p className="text-gray-500 text-center col-span-full">
          No hay productos por el momento.
        </p>
      )}
    </div>
  </main>

  

  {/* Drawer del carrito */}
  {cartVisible && (
    <div className="fixed bottom-0 right-0 w-96 max-w-full bg-white shadow-2xl rounded-tl-2xl p-6 border-t border-l animate-slideUp z-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">🛒 Tu Carrito</h3>
        <button
          onClick={handleCart}
          className="text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          ✕
        </button>
      </div>

      {cart.length > 0 ? (
        <div className="space-y-3">
          {cart.map((p) => (
            <div
              key={p.id}
              className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg"
            >
              <span className="text-gray-700">{p.nombre}</span>
              <span className="font-bold text-amber-600">${p.precio}</span>
            </div>
          ))}
          <button
            onClick={handleBuy}
            className="mt-4 w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg font-semibold transition"
          >
            Finalizar compra
          </button>
        </div>
      ) : (
        <p className="text-gray-500">Tu carrito está vacío</p>
      )}
    </div>
  )}

  {/* Footer */}
  <footer className="bg-white py-6 text-center text-gray-500 border-t mt-12">
    © {new Date().getFullYear()} Tiendafy — Todos los derechos reservados.
  </footer>
</div>
  );

}
export default Shop