import { useEffect, useState } from "react"
import axios from 'axios'
type Stats = {
    productos: number,
    totalVendido: number,
    ingreso:number
}
function Dashboard(){
    const [stats, setStats]= useState<Stats | null>(null);
    const token = localStorage.getItem('token');

    const fetchStats = async() => {
        try {
            const res = await axios.get('http://localhost:3000/api/products/stats', {
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
      <h1 className="text-3xl font-bold mb-6">📊 Panel de Vendedor</h1>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-amber-600">{stats?.productos}</h2>
          <p className="text-gray-600">Productos publicados</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-green-600">{stats?.totalVendido}</h2>
          <p className="text-gray-600">Productos vendidos</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-blue-600">${stats?.ingreso}</h2>
          <p className="text-gray-600">Ingresos generados</p>
        </div>
      </div>
    </div>

)

}

export default Dashboard