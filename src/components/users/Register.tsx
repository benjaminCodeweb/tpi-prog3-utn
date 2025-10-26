import React, { useCallback, useContext, useState } from 'react'
import axios, { Axios } from 'axios';
import { useNavigate } from 'react-router-dom';
import { themeContext } from '../../services/ThemeProvider';

type Props = {}

function Register({ }: Props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [rol, setRol] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { theme } = useContext(themeContext);
  const validations = [
    { label: 'Minimo 8 caracteres', valid: password.length >= 8 },
    { label: 'Al menos una maysucula', valid: /[A-Z]/.test(password) },
    { label: 'Al menos un caracter especial', valid: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
    { label: 'Al menos un numero', valid: /\d/.test(password) },
  ]


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert("Las contrasenas no coincciden");
      return;
    }

    try {

      const res = await axios.post('http://localhost:3000/api/users/register', {
        username,
        email,
        password,
        rol
      });


      if (res.data.success === true) {

        alert('Usuario creado con exito');
        navigate('/login');
      }

    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message)
      }
      console.error('error al mandar el user', err);
    }
    setUsername('');
    setEmail('');
    setPassword('');
    setRol('');


  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-theme duration-300 ${theme === "dark" ? "dark" : ""
        }`}
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <div
        className="w-full max-w-md rounded-2xl shadow-lg p-8 transition-theme"
        style={{
          backgroundColor: "var(--card)",
          boxShadow: "var(--shadow)",
        }}
      >
        {/* Logo / Título */}
        <h1 className="text-3xl font-extrabold text-center text-blue-600 dark:text-blue-400 mb-6">
          Tiendafy
        </h1>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Usuario */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Usuario
            </label>
            <input
              type="text"
              placeholder="Tu nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="tuemail@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Rol */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Rol
            </label>
            <select
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Selecciona un rol</option>
              <option value="vendedor">Vendedor</option>
              <option value="comprador">Comprador</option>
            </select>
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {password && (
              <div className="mt-3 border rounded-lg p-3 text-sm space-y-1 bg-gray-50 dark:bg-[#0f172a] border-gray-200 dark:border-gray-700 transition-theme">
                {validations.map((v) => (
                  <div
                    key={v.label}
                    className={`flex items-center gap-2 ${v.valid ? "text-green-500" : "text-gray-500 dark:text-gray-400"
                      }`}
                  >
                    <span>{v.valid ? "✅" : "⚪"}</span>
                    {v.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Confirmar contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirmar contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              required
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {error && <p className="text-red-600 dark:text-red-400 mt-1">{error}</p>}
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-theme"
          >
            Registrarse
          </button>
        </form>

        {/* Links extras */}
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            ¿Ya tienes cuenta?{" "}
            <a
              href="/login"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Inicia sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register