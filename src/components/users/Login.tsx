import React, { useState, type ReactNode } from 'react'
import axios, { Axios } from 'axios';
import { useNavigate } from 'react-router-dom';
type Props = {
  onLogin: () => void;
}

type ErrorState = {
  email?: string,
  password?:string
  general?:string
}

function Login({onLogin}: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<ErrorState>({});
  
    const token = localStorage.getItem('token')
    const navigate = useNavigate();

    const handleMissPassword = async() => {


      navigate('/forgot-password');


      }
    


    const handleSubmit  = async(e: React.FormEvent) =>  {
        e.preventDefault();
         let newErrors: ErrorState = {}; 

            if(!email) {
              newErrors.email = 'Email es obligatorio';
              
            }

            if(!password) {
              newErrors.password = 'Contrasena obligatoria'
            }


        try {
            const res = await axios.post('http://localhost:3000/api/users/login', {email, password});
         
            setError({});



         
            

            if(res.data.token){
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userId', res.data.userr.id);
                 onLogin();
                 if(res.data.userr.rol === 'Vendedor') {
                   navigate('/index');
                   
                 } else if(res.data.userr.rol === 'Comprador'){
                  navigate('/shop')
                 }
                 
            }
            if(res.data !== token){
              setError({general: 'error en el data'})

            }
            
           

            
        }catch(err:any) {
            
           setError({general: 'error inesperado'})
        }
        
    };


    const handleRegister = () => {
        navigate('/register')
    }
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
    {/* Logo / Nombre */}
    <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-6">
      Tiendafy
    </h1>

    {/* Formulario */}
    <form onSubmit={handleSubmit} className="space-y-5">
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
        {error.email && <p>{error.email}</p>}
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
         {error.password && <p>{error.password}</p>}
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
      >
        Iniciar sesión
      </button>
       
  
    </form>

    {/* Links extras */}
    <div className="mt-6 text-center text-sm">
      <a  onClick={handleMissPassword} className="text-blue-600 hover:underline">
        ¿Olvidaste tu contraseña?
      </a>
    
        <button onClick={handleRegister} className="text-amber-500 font-semibold hover:underline">
          Regístrate aquí
        </button>
      
    </div>
   
  </div>
</div>

  )
}

export default Login