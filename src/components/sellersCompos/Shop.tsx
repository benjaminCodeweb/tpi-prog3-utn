import { useContext, useEffect, useState } from "react"
import { type Product } from "../../types";
import axios from 'axios';
import ProductItem from "../productsCompos/ProductItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from '../../redux/store.ts';
import { addToCart, clearCart, removeFromCart } from "../../redux/CounterSlice";
import { DeleteIcon } from "../assetsComponents/Icons.tsx";
import {motion }from 'framer-motion'
import { themeContext } from "../../services/ThemeProvider.tsx";
type ShopProps = {
 
  
 
  onLogout: () => void;

}
function Shop({onLogout}: ShopProps){
    const [products, setProducts] = useState<Product[]>([]);
    const[cartVisible, setCartVisible] = useState(false);
    const token = localStorage.getItem('token');
    const[addToast, setAddToast] = useState(false);
    const carts = useSelector((state: RootState) => state.cart.items )
    const dispatch = useDispatch();
    const total = carts.reduce((sum, p) => sum + (Number(p.precio) || 0), 0);
    const {theme} = useContext(themeContext);
    

    const navigate = useNavigate();

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
    
    const handleBuy = async() => {
      dispatch(clearCart())
        await axios.post('http://localhost:3000/api/products/comprar',
          {products: carts}, {headers: {
            Authorization: `Bearer ${token}`
          }}
        );
       
        await fetchProducts();
        
    };

    const handleAddCart = (product: Product) => {
      dispatch(addToCart(product));
      setAddToast(true);

      setTimeout(() => setAddToast(false), 2500)
    }

    const handleDeleteCart = async(product: Product) => {
      dispatch(removeFromCart(product.id))

        }
   

    useEffect(() => {
        fetchProducts();
    },[]);

    const handleLogout = () => {

      onLogout();
    };

    const handleStats = () => {
      navigate('/stats-bullers');
    };

    const availableProducts = products.filter((p) => p.estado === 'Disponible')
    

     return (
    <div
      className={`min-h-screen flex flex-col transition-theme duration-300 ${
        theme === "dark" ? "dark" : ""
      }`}
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      {/* 🔹 Navbar */}
      <header
        className="px-8 py-4 flex items-center justify-between sticky top-0 z-40 transition-theme shadow-sm"
        style={{
          backgroundColor: "var(--card)",
          color: "var(--text)",
          boxShadow: "var(--shadow)",
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Tiendafy
          </span>
        </div>

        <nav className="flex items-center gap-4">
          {addToast && (
            <div className="fixed bottom-6 right-6 flex items-center gap-3 bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg animate-slideUp z-50">
              <span className="text-xl">✅</span>
              <p className="font-medium">Producto agregado al carrito</p>
            </div>
          )}

          <button
            onClick={handleCart}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md font-semibold transition-theme"
          >
            🛒 Carrito ({carts.length})
          </button>

          <button
            onClick={handleStats}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md font-semibold transition-theme"
          >
            Stats
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md transition-theme"
          >
            Cerrar sesión
          </button>
        </nav>
      </header>

      {/* 🔸 Main */}
      <main className="flex-1 px-6 py-12 max-w-6xl mx-auto w-full transition-theme">
        <h2 className="text-3xl font-extrabold mb-10 text-center text-gray-800 dark:text-gray-100">
          🛍 Productos disponibles
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {availableProducts.length > 0 ? (
            availableProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="p-0"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
              >
                <ProductItem
                  {...product}
                  showActions={false}
                  onCart={handleAddCart}
                  onDelete={handleDeleteCart}
                />
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center col-span-full">
              No hay productos por el momento.
            </p>
          )}
        </div>
      </main>

      {/* 🧺 Drawer del carrito */}
      {cartVisible && (
        <div
          className="fixed bottom-0 right-0 w-96 max-w-full rounded-tl-2xl p-6 border-t border-l animate-slideUp z-50 transition-theme shadow-2xl"
          style={{
            backgroundColor: "var(--card)",
            color: "var(--text)",
            borderColor: "rgba(255,255,255,0.1)",
          }}
        >
          <div className="flex items-center justify-center mb-4 relative">
            <h3 className="text-lg font-bold">🛒 Tu Carrito</h3>
            <button
              onClick={handleCart}
              className="absolute right-0 top-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl font-bold"
              aria-label="Cerrar carrito"
            >
              ✕
            </button>
          </div>

          {carts.length > 0 ? (
            <div className="space-y-3">
              {carts.map((p) => (
                <div
                  key={p.id}
                  className="flex justify-between items-center px-3 py-2 rounded-lg transition-theme"
                  style={{ backgroundColor: "var(--bg)" }}
                >
                  <span className="text-gray-700 dark:text-gray-200">{p.nombre}</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    ${p.precio}
                  </span>
                  <button onClick={() => handleDeleteCart(p)}>
                    <DeleteIcon />
                  </button>
                </div>
              ))}

              <div className="mt-4 flex items-center justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                onClick={handleBuy}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-theme"
              >
                Finalizar compra
              </button>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Tu carrito está vacío</p>
          )}
        </div>
      )}

      {/* 🔻 Footer */}
      <footer
        className="py-6 text-center border-t mt-12 transition-theme"
        style={{
          backgroundColor: "var(--card)",
          color: "var(--muted)",
          borderColor: "rgba(255,255,255,0.05)",
        }}
      >
        © {new Date().getFullYear()} Tiendafy — Todos los derechos reservados.
      </footer>
    </div>
  );

}
export default Shop