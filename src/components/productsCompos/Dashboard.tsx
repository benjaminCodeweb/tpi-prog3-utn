import { useContext, useEffect, useState } from "react"
import axios from 'axios'
import { type Product } from "../../types";
import { themeContext } from "../../services/ThemeProvider";
type Stats = {
    productos: number,
    totalVendido: number,
    ingreso:number
    topProducto:Product[];
}
function Dashboard(){
    const [stats, setStats]= useState<Stats | null>(null);
    const [topProductos, setTopProductos] = useState<Product[] | null>(null)
    const token = localStorage.getItem('token');
  const {theme}=useContext(themeContext);

    const fetchStats = async() => {
        try {
            const res = await axios.get('http://localhost:3000/api/products/stats', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
            });
            setStats(res.data);

    }catch(err){
        console.error(err);
    };



};

const fetchTopProductos = async() => {
  try {
   const response =  await axios.get('http://localhost:3000/api/products/stats', {headers: {Authorization: `Bearer ${token}`}})
   setTopProductos(response.data.topVendidos)
  }catch(err){
    console.error(err);
  }
  
}

useEffect(() => {
    fetchStats();
    fetchTopProductos();
},[]);


return(
 <div
  className={`min-h-screen flex flex-col transition-theme duration-300 ${
    theme === "dark" ? "dark" : ""
  }`}
  style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
>
  {/* 🔹 NAVBAR */}
  <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700  text-gray-100  px-8 py-4 flex items-center justify-between transition-theme">
    <div className="flex items-center gap-3">
      <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
        🛒 Tiendafy
      </h1>
    </div>

    <nav className="flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-100">
      <a
        href="/index"
        className="hover:text-blue-600 dark:hover:text-blue-400 transition"
      >
        Panel
      </a>
      <a
        href="/productos"
        className="hover:text-blue-600 dark:hover:text-blue-400 transition"
      >
        Mis productos
      </a>
      <a
        href="/ventas"
        className="hover:text-blue-600 dark:hover:text-blue-400 transition"
      >
        Ventas
      </a>
    </nav>
  </header>

  {/* 🔸 CONTENIDO PRINCIPAL */}
  <main className="flex-1 p-8">
    <h1 className="text-3xl font-bold mb-8 flex items-center gap-2 text-gray-800 dark:text-gray-100 transition-theme">
      📊 Panel de Vendedor
    </h1>

    {/* métricas */}
    <div className="grid gap-6 sm:grid-cols-3">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-theme border border-transparent dark:border-gray-700">
        <h2 className="text-2xl font-bold text-amber-500">{stats?.productos}</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Productos publicados
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-theme border border-transparent dark:border-gray-700">
        <h2 className="text-2xl font-bold text-green-500">
          {stats?.totalVendido}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Productos vendidos
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-theme border border-transparent dark:border-gray-700">
        <h2 className="text-2xl font-bold text-blue-500">
          ${stats?.ingreso}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Ingresos generados
        </p>
      </div>
    </div>
  </main>

  {/* 🏆 top vendidos */}
  <section className="mt-12 px-8">
    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 transition-theme">
      🏆 Productos más vendidos
    </h2>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {topProductos &&
        topProductos.map((p: Product) => (
          <div
            key={p.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-theme"
          >
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 truncate">
              {p.nombre}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {p.categoria}
            </p>
            <p className="text-blue-600 dark:text-blue-400 font-bold mt-2">
              ${p.precio}
            </p>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              Vendidos: {p.vendidos}
            </span>
          </div>
        ))}
    </div>
  </section>

  {/* 🔻 FOOTER */}
  <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 text-center text-sm text-gray-500 dark:text-gray-400 transition-theme mt-12">
    © {new Date().getFullYear()} Tiendafy — Panel de Vendedor
  </footer>
</div>

)

}

export default Dashboard