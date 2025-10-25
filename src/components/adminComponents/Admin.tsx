
import axios from 'axios';
import { useEffect, useState } from 'react';
import {type Productos, type User } from '../../types';
import {motion} from 'framer-motion'

type Props = {
  onLogout: () => void;
}
export default function Admin({onLogout}: Props) {
    const [users, setUsers] = useState<User[]>([]);
    const[products, setProductos] = useState<Productos[]>([]);
    const[banToast, setBanToast] = useState(false);
    const token = localStorage.getItem('token');

    const handleLogout = () => {
      onLogout();
      alert('Sesion cerrada')
    }

    const handleBan =async(userId:string) => {
      const endpoint = `http://localhost:3000/api/admins/${users.find(u => u.id === userId)?.is_banned ? 'unban' : 'ban'}/${userId}`;
      
      try {
      await axios.post(endpoint, 
        {dias: 20}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      
       setBanToast(!banToast);
       setTimeout(() => setBanToast(false), 2500);

          
        await userDb();

      }catch(err){
        console.error(err)
      }
    }

    const userDb =  async() => {

        try {
          const response  =   await axios.get<User[]>('http://localhost:3000/api/admins', {headers: {Authorization: `Bearer ${token}`}});
          setUsers(response.data);
         

          const productosDb = await axios.get<Productos[]>('http://localhost:3000/api/admins/productos', {headers:  {Authorization: `Bearer ${token}`}})
          setProductos(productosDb.data);
        
        }catch(err){
            console.error(err)
        }
    } 

    useEffect(() => {
        userDb();
     

    },[])

return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-blue-600 tracking-tight">
          👑 Panel de Administración
        </h2>
        <span className="text-sm text-gray-500">Gestión de usuarios y productos</span>
        <button onClick={ handleLogout}>Cerrar Sesion</button>
      </nav>

      {/* Contenido principal */}
      <section className="max-w-6xl mx-auto mt-10 px-6">
        {/* Usuarios */}
        <h2 className="text-xl font-semibold mb-6 text-gray-700 border-b pb-2 border-gray-200">
          👥 Usuarios registrados
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
         {users && users.length > 0 ? (
  users.map((u, index) => (
    <motion.div
      key={u.id}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{u.username}</h3>
        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
            u.rol === 'Admin'
              ? 'bg-purple-100 text-purple-700'
              : 'bg-blue-100 text-blue-700'
          }`}>
          {u.rol}
        </span>
      </div>

      <div className="space-y-1 text-sm text-gray-500 dark:text-gray-400">
        <p>📧 {u.email}</p>
        <p>📅 {u.created_at}</p>
        <p>📦 Productos: {u.products_count}</p>
      </div>

      <div className="flex gap-2 mt-5">
        <button
          onClick={() => handleBan(u.id)}
         
          className={`flex-1 py-2 text-sm rounded-md font-medium transition-all duration-200 ${
            u.is_banned
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-red-100 text-red-600 hover:bg-red-200'
          }`}
        >
          {u.is_banned ? 'Desban' : 'Ban'}
        </button>
        <button className="flex-1 py-2 text-sm rounded-md bg-blue-700 hover:bg-blue-800 text-white font-medium transition-all duration-200">
          Ascender
        </button>
      </div>
    </motion.div>
  ))
) : (
  <p className="text-gray-500">No hay usuarios registrados.</p>
)}

        </div>
        {banToast && (
  <div className="fixed bottom-6 right-6 z-50">
    <div className="flex items-center gap-3 bg-red-500 text-white px-5 py-3 rounded-lg shadow-lg 
                    transform transition-all duration-500 ease-in-out animate-slide-up">
      <span className="text-white text-lg">🚫</span>
      <p className="font-medium text-sm">{users.find(u => u.is_banned) ? 'Usuario desbaneado con exito' : 'Usuario baneado con exito'}</p>
    </div>
  </div>
)}

        {/* Productos */}
        <h2 className="text-xl font-semibold mt-14 mb-6 text-gray-700 border-b pb-2 border-gray-200">
          🛍 Productos registrados
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products && products.length > 0 ? (
            products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all flex flex-col"
              >
                <div className="h-40 w-full bg-gray-100 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                  {p.imagen ? (
                    <img
                      src={`http://localhost:3000${p.imagen}`}
                      alt={p.nombre}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">Sin imagen</span>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{p.nombre}</h3>
                <p className="text-sm text-gray-500 mb-2 capitalize">{p.categoria}</p>

                <p className="text-blue-600 font-bold text-lg mb-3">${p.precio}</p>

                <div className="mt-auto flex gap-2">
                  <button className="flex-1 py-1.5 text-sm rounded-md bg-red-100 hover:bg-red-200 text-red-600 font-medium transition">
                    Eliminar
                  </button>
                  <button className="flex-1 py-1.5 text-sm rounded-md bg-blue-700 hover:bg-green-200 text-white font-medium transition">
                    Ver detalles
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay productos registrados.</p>
          )}
        </div>
      </section>
    </div>
  );


}