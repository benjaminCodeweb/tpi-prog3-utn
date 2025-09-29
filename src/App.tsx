import { useState, useEffect} from 'react'
import './App.css'
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

function App() {
  
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<Product[]>([])
  const [isLogin, setIsLogin] = useState(() => {
    return !!localStorage.getItem('token')
  });
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId');
  const [deleteToast, setDeleteToast]= useState(false);

  
  const handleLogin = () => {
     setIsLogin(true);

  
  }
  
  const handleLogout = () => {
    setIsLogin(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
   
  }
  const handleAddCart = async (product:Product) => {
    
    setCart((prev) => [...prev, product]);
  };

  const handleBuy = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/products/comprar',
          {products: cart}, {headers: {
            Authorization: `Bearer ${token}`
          }}
        );
        await fetchProducts();
        setCart([]);

      }catch(err){
        console.error(err);
      }
  };

  const deletePruduct =async (id: number) => {
    try {

      const res = await axios.delete(`http://localhost:3000/api/products/${id}`, {headers: {
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
 
   
      <Routes>
         <Route path='/' element={<Landing />} />
        <Route path='/index' element= {
          <Protected isLogin={isLogin}>
          <Index  onDeleteToast={deleteToast} onDelete={deletePruduct} onStats={handleStats} onRefresh={fetchProducts} onLogout={handleLogout} products={products} />
          
          </Protected>}  />
            <Route path='/shop' element= {
          <Protected isLogin={isLogin}>
          <Shop onLogout={handleLogout} cart={cart} onBuy={handleBuy} onAddCart={handleAddCart} />
          </Protected>}  />

          
          <Route path='/stats' element={ <Protected isLogin={isLogin}> <Dashboard /> </Protected>  }  />
         

          <Route path='/login' element={<Login onLogin={handleLogin} /> }  />
          <Route path='/register' element={<Register/>} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />
          <Route path='/reset-password/:token' element={<ResetPassword/>} />
      </Routes>
      
  

     
    
  )
}

export default App
