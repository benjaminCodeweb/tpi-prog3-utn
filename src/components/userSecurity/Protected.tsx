
import { useEffect, useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

type Props = {

  isLogin: boolean;
  children: ReactNode

}

function Protected({ isLogin, children }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [checking, setChecking] = useState(true);




  useEffect(() => {

    const isAuth = async () => {
      const token = localStorage.getItem('token');
      if (!isLogin || !token) {
        alert('Nececitas iniciar sesion');
        navigate('/login');
        return;

      }

      try {
        await axios.get('http://localhost:3000/api/users/profiles', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setChecking(false);
      } catch (err: any) {
        console.error('error', err);

        if (err.response?.status === 403) {
          alert(err.response.data.message);

        } else {
          alert('Sesion invalida, inicia sesion nuevamente');
        }

        localStorage.removeItem('token');
        navigate('/login');


      }
    };

    isAuth();
  }, [isLogin, navigate, location.pathname]);

  if (!isLogin || checking) return null;



  return <>{children}</>
}

export default Protected