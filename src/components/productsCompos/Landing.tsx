import { useNavigate } from "react-router-dom";
import jordan from '../assetsComponents/assets/jordan.jpg';
import adidas from '../assetsComponents/assets/casacaadidas.jpg';
import nike from '../assetsComponents/assets/casacanike.jpg';


export default function Landing() {

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login')
    }
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-600">🛒 Tiendafy</h1>
        <nav className="hidden md:flex space-x-6">
          <a href="#categorias" className="hover:text-blue-600">Categorías</a>
          <a href="#productos" className="hover:text-blue-600">Productos</a>
          <a href="#contacto" className="hover:text-blue-600">Contacto</a>
        </nav>
        <button onClick={handleLogin} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Iniciar sesión
        </button>
      </header>

      {/* Hero */}
      <section className="flex flex-col md:flex-row items-center justify-between flex-1 px-8 py-16 max-w-6xl mx-auto">
        <div className="text-center md:text-left space-y-6 md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Bienvenido a <span className="text-blue-600">Tiendafy</span>
          </h2>
          <p className="text-lg text-gray-600">
            Encuentra los mejores productos al mejor precio.  
            Tu tienda online confiable y rápida 🚀
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Comprar ahora
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100">
              Explorar productos
            </button>
          </div>
        </div>
        <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1515165562835-c6c4b05ee2c0"
            alt="Shopping bags"
            className="rounded-2xl shadow-lg max-h-96 object-cover"
          />
        </div>
      </section>

      {/* Categorías */}
      <section id="categorias" className="bg-white py-20 px-6">
        <h3 className="text-3xl font-bold text-center mb-12">Categorías populares</h3>
        <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {["Ropa", "Electrónica", "Hogar", "Deportes", "Belleza"].map((cat) => (
            <div
              key={cat}
              className="p-6 border rounded-lg shadow hover:shadow-lg text-center transition bg-gray-50"
            >
              <p className="font-semibold text-lg">{cat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Productos */}
      <section id="productos" className="bg-gray-50 py-20 px-6">
        <h3 className="text-3xl font-bold text-center mb-12">Productos destacados</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* Producto 1 */}
      <div className="p-6 border rounded-lg bg-white shadow-md hover:shadow-lg transition">
        <img
          src={jordan}
          alt="Jordan"
          className="rounded-lg mb-4 h-40 w-full object-cover"
        />
        <h4 className="font-semibold text-lg mb-2">Zapatillas Jordan</h4>
        <p className="text-gray-600 mb-4">$120.00</p>
        <button className="w-full px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600">
          Agregar al carrito
        </button>
      </div>

      {/* Producto 2 */}
      <div className="p-6 border rounded-lg bg-white shadow-md hover:shadow-lg transition">
        <img
          src={nike}
          alt="Nike"
          className="rounded-lg mb-4 h-40 w-full object-cover"
        />
        <h4 className="font-semibold text-lg mb-2">Remera Nike</h4>
        <p className="text-gray-600 mb-4">$45.00</p>
        <button className="w-full px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600">
          Agregar al carrito
        </button>
      </div>

      {/* Producto 3 */}
      <div className="p-6 border rounded-lg bg-white shadow-md hover:shadow-lg transition">
        <img
          src={adidas}
          alt="Adidas"
          className="rounded-lg mb-4 h-40 w-full object-cover"
        />
        <h4 className="font-semibold text-lg mb-2">Buzo Adidas</h4>
        <p className="text-gray-600 mb-4">$65.00</p>
        <button className="w-full px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600">
          Agregar al carrito
        </button>
      </div>
    </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="bg-white py-6 text-center text-gray-500 border-t">
        © {new Date().getFullYear()} Tiendafy — Todos los derechos reservados.
      </footer>
    </div>
  );
}
