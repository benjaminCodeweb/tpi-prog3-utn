
import { useEffect, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


type Props = {

    isLogin: boolean;
    children: ReactNode

}

function Protected({isLogin, children}: Props) {
    const navigate = useNavigate();
    const location = useLocation();

    
 
    useEffect(() => {
           if(!isLogin) {
        alert('Nececitas iniciar sesion, por favor')
        navigate('/login');
    }
    
    },[isLogin, navigate, location.pathname]);

    if(!isLogin) return null;



  return  <>{children}</>
}

export default Protected