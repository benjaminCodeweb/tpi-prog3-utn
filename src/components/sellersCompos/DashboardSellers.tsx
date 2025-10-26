import { useContext, useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { themeContext } from "../../services/ThemeProvider";
type StatsBullers = {
  comprado: number,
  totalGastado: number
}
function DashboardSellers() {
  const [stats, setStats] = useState<StatsBullers | null>(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { theme } = useContext(themeContext);


  const fetchStats = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/products/stats-sellers', {

        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setStats(res.data);

    } catch (err) {
      console.error(err);
    };


  }

  useEffect(() => {
    fetchStats();
  }, []);

  const handleShop = () => {
    navigate('/shop')
  }


  return (
    <div
      className={`min-h-screen flex flex-col transition-theme duration-300 ${theme === "dark" ? "dark" : ""
        }`}
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      {/* 🔹 Navbar */}
      <header
        className="px-8 py-4 flex items-center justify-between shadow-md transition-theme"
        style={{
          backgroundColor: "var(--card)",
          color: "var(--text)",
          boxShadow: "var(--shadow)",
        }}
      >
        <div className="flex items-center gap-3">
          <p className="font-semibold text-gray-600 dark:text-gray-400">🛒</p>
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Tiendafy
          </span>
        </div>

        <button
          onClick={handleShop}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-theme"
        >
          Shop
        </button>
      </header>

      {/* 🔸 Contenido principal */}
      <main
        className="flex-1 p-6 transition-theme duration-300"
        style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          📊 Panel del Comprador
        </h1>

        <div className="grid gap-6 sm:grid-cols-3">
          <div
            className="p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-theme"
            style={{ backgroundColor: "var(--card)", boxShadow: "var(--shadow)" }}
          >
            <h2 className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {stats?.comprado ?? 0}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Productos comprados en el mes
            </p>
          </div>

          <div
            className="p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-theme"
            style={{ backgroundColor: "var(--card)", boxShadow: "var(--shadow)" }}
          >
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              ${stats?.totalGastado ?? 0}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Gastos</p>
          </div>
        </div>
      </main>

      {/* 🔻 Footer */}
      <footer
        className="py-6 text-center border-t transition-theme"
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

export default DashboardSellers