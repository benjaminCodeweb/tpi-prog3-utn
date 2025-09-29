import { useEffect, useState } from "react"
import axios from 'axios'
type StatsBullers = {
    comprado: number,
    totalComprado: number,
    totalGastado:number
}
function DashboardSellers(){
    const [stats, setStats]= useState<StatsBullers | null>(null);
    const token = localStorage.getItem('token');

    const fetchStats = async() => {
        try {
            const res = await axios.get('http://localhost:3000/api/products/stats-sellers', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
            });
            setStats(res.data);

    }catch(err){
        console.error(err);
    };


}

useEffect(() => {
    fetchStats();
},[]);


return(
     <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📊 Panel de Comprador</h1>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-amber-600">{stats?.comprado}</h2>
          <p className="text-gray-600">Productos Comprados en el mes</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-green-600">{stats?.totalComprado}</h2>
          <p className="text-gray-600">Productos Comprados</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-blue-600">${stats?.totalGastado}</h2>
          <p className="text-gray-600">Gastos </p>
        </div>
      </div>
    </div>

)

}

export default DashboardSellers