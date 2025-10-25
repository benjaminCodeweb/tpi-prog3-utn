import { useState, useEffect} from 'react'
import {type  Product } from './types'
import {  Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Index from './components/Index'
import Login from './components/users/Login'
import Register from './components/users/Register'
import Protected from './components/userSecurity/Protected'
import Landing from './components/productsCompos/Landing'
import Shop from './components/sellersCompos/Shop'
import Dashboard from './components/productsCompos/Dashboard'
import ForgotPassword from './components/userSecurity/ForgotPassword'
import ResetPassword from './components/userSecurity/ResetPassword'
import DashboardSellers from './components/sellersCompos/DashboardSellers'
import Admin from './components/adminComponents/Admin'
import ThemeContextProvider from './services/ThemeProvider'

function App() {
  
  const [products, setProducts] = useState<Product[]>([])
  const [isLogin, setIsLogin] = useState(() => {
    return !!localStorage.getItem('token')
  });
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
 
  const [deleteToast, setDeleteToast]= useState(false);
  const [editToast, setEditToast] = useState(false);

  
  const handleLogin = () => {
     setIsLogin(true);

  }
  
  const handleLogout = () => {
    setIsLogin(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
   
  }
  
  const handleEdit = async( id: number, nombre: string, descrip: string, precio: number, categoria:string) => {
    try {
      
      await axios.put(`http://localhost:3000/api/products/${id}`, {nombre, precio, descrip, categoria}, {
        headers: {Authorization: `Bearer ${token}`}})

      
      await fetchProducts();
      setEditToast(!editToast);
      setTimeout(() => setEditToast(false), 3000);

    }catch(err){
      console.error(err)
    }
    
    
  }

  
  const deletePruduct =async (id: number) => {
    try {

      await axios.delete(`http://localhost:3000/api/products/${id}`, {headers: {
        Authorization: `Bearer ${token}`
      }

      
    })

    
    await fetchProducts();
    setDeleteToast(!deleteToast);

    setTimeout(() => setDeleteToast(false), 3000);


    }catch(err){
      console.error(err);

    }
  }

  


  const fetchProducts = async() => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products`, {
          headers: {Authorization: `Bearer ${token}`}
        });
        setProducts(response.data)
      }catch(err){
        console.error('error al hacer el fetch')
      }
    }
    useEffect(() =>{
      fetchProducts();
    },[]);

    const handleStats = () => {
      navigate('/stats')
    }

  return (
 
   <ThemeContextProvider>
      <Routes>

         <Route path='/' element={<Landing />} />
         <Route path='/login' element={<Login onLogin={handleLogin} /> }  />
          <Route path='/register' element={<Register/>} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />
          <Route path='/reset-password/:token' element={<ResetPassword/>} />
          <Route path='/index' element= {
          <Protected isLogin={isLogin}>
          <Index  onEdit={handleEdit} onDeleteToast={deleteToast} onEditToast={editToast} onDelete={deletePruduct} onStats={handleStats} onRefresh={fetchProducts} onLogout={handleLogout} products={products} />
          
          </Protected>}  />

          <Route path='/shop' element= {
            <Protected isLogin={isLogin}>
            <Shop onLogout={handleLogout} />
            </Protected>}  
          />

          <Route path='/admin' element= {
            <Protected isLogin={isLogin}>
            <Admin  onLogout={handleLogout} />
            </Protected>}  
          />



          
          <Route path='/stats' element={ <Protected isLogin={isLogin}> <Dashboard /> </Protected>  }  />
          <Route path='/stats-bullers' element={ <Protected isLogin={isLogin}> <DashboardSellers /> </Protected>  }  />
         

          
     
      </Routes>
      </ThemeContextProvider>
  

     
    
  )
}

export default App
