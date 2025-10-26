import React, { useCallback, useContext, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ForgotPassword from '../userSecurity/ForgotPassword';
import { themeContext } from '../../services/ThemeProvider';

type Props = {
  onLogin: () => void;
  isOpen: boolean;
}


function Login({ onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { theme } = useContext(themeContext)

  const token = localStorage.getItem('token')

  const navigate = useNavigate();

  const handleMissPassword = async () => {

    setShowModal(!showModal)

  }

  const handleRegister = () => {
    navigate('/register')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/users/login', { email, password });

      if (res.data.token) {

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.userr.id);
        onLogin();

        if (res.data.userr.rol === 'Vendedor') {
          navigate('/index');

        } else if (res.data.userr.rol === 'Comprador') {
          navigate('/shop')
        } else if (res.data.userr.rol === 'Admin') {
          navigate('/admin')
        }

      }

    } catch (err: any) {

      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message)
      }
    }
  };




  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-theme duration-300 ${theme === "dark" ? "dark" : ""
        }`}
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 transition-theme duration-300"
        style={{ backgroundColor: "var(--card)", color: "var(--text)" }}
      >
        {/* Logo / Nombre */}
        <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-6">
          Tiendafy
        </h1>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="tuemail@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#181818] text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-theme"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Contraseña
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#181818] text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-theme"
            />
            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-theme"
          >
            Iniciar sesión
          </button>
        </form>

        {/* Links extras */}
        <div className="mt-6 text-center text-sm">
          <button
            onClick={handleMissPassword}
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            ¿Olvidaste tu contraseña?
          </button>
          <br />
          <button
            onClick={handleRegister}
            className="text-amber-500 font-semibold hover:underline"
          >
            Regístrate aquí
          </button>

          {/* Modal para recuperar contraseña */}
          <ForgotPassword isOpen={showModal} onClose={() => setShowModal(false)} />
        </div>
      </div>
    </div>
  );
}

export default Login