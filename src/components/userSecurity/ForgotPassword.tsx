import { useContext, useState } from "react";
import axios from "axios";
import { themeContext } from "../../services/ThemeProvider";

type Props = {
  isOpen:boolean;
  onClose: () => void;
}

function ForgotPassword({isOpen, onClose}: Props) {

  if(!isOpen) {
    return null;
  }
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const {theme} = useContext(themeContext)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post("http://localhost:3000/api/users/forgot-password", {
        email,
      });
      setMessage(res.data.message || "Si existe tu cuenta, recibirás un correo.");
    } catch (err: any) {
      setError("Error al enviar la solicitud.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.45)] backdrop-blur-sm px-4 transition-theme duration-300">
      {/* Contenedor principal */}
      <div
        className="w-full max-w-md rounded-2xl shadow-2xl p-8 relative transition-theme"
        style={{
          backgroundColor: "var(--card)",
          color: "var(--text)",
          boxShadow: "var(--shadow)",
        }}
      >
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl font-bold transition"
          aria-label="Cerrar"
        >
          &times;
        </button>

        {/* Título */}
        <h1 className="text-2xl font-extrabold text-center text-blue-600 dark:text-blue-400 mb-6">
          Recuperar contraseña
        </h1>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tuemail@ejemplo.com"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-theme"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-theme"
          >
            Enviar correo
          </button>
        </form>

        {/* Mensajes */}
        {message && (
          <p className="mt-4 text-green-600 dark:text-green-400 text-center font-medium animate-fadeIn">
            {message}
          </p>
        )}
        {error && (
          <p className="mt-4 text-red-600 dark:text-red-400 text-center font-medium animate-fadeIn">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
