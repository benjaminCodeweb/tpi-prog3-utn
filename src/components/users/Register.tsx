import React, { useState } from 'react'
import axios from 'axios';

type Props = {}

function Register({}: Props) {
    const[username, setUsername] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[passwordConfirm, setPasswordConfirm] = useState('');
    const[rol, setRol] = useState('');

    const handleSubmit  = async(e: React.FormEvent) => {
        e.preventDefault();
        if(password !== passwordConfirm) {
          alert("Las contrasenas no coincciden");
          return;
        }

        try {

            const res = await axios.post('http://localhost:3000/api/users/register', {
              username,
              email,
              password,
              rol
              
            })
    }catch(err){
        console.error('error al mandar el user', err);
    }
}

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
    {/* Logo / Título */}
    <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-6">
      Crear cuenta
    </h1>

    {/* Formulario */}
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Usuario
        </label>
        <input
          type="text"
          placeholder="Tu nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          placeholder="tuemail@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
    <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Rol
  </label>
  <select
    value={rol}
    onChange={(e) => setRol(e.target.value)}
    required
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
  >
    <option value="">Selecciona un rol</option>
    <option value="vendedor">Vendedor</option>
    <option value="comprador">Comprador</option>
  </select>
</div>
      

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contraseña
        </label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirmar contraseña
        </label>
        <input
          type="password"
          placeholder="••••••••"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow-md transition"
      >
        Registrarse
      </button>
    </form>

    {/* Links extras */}
    <div className="mt-6 text-center text-sm">
      <p className="text-gray-600">
        ¿Ya tienes cuenta?{" "}
        <a href="/login" className="text-blue-600 font-semibold hover:underline">
          Inicia sesión
        </a>
      </p>
    </div>
  </div>
</div>
  )
}

export default Register