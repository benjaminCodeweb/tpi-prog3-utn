
import { useEffect, useState } from 'react';



type ProductItemProps = {
  id: number;
  nombre: string;
  describe: string;
  precio: number;
  categoria: string;
  estado: string,
  showActions?: boolean; // ✅ opcional
  onCart?: () => void; // ✅ opcional
  onDelete: () => void
};

function ProductItem({ nombre, describe, precio,categoria,estado, showActions = true, onCart, onDelete}: ProductItemProps) {
  const [disabledd, setDisabledd] = useState(false);
 useEffect(() => {
  
      if(estado === 'Vendido'){
         setDisabledd(true);
      } else {
        setDisabledd(false)
      }
    
 }, [estado]);

 
  


    
  return (
  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-5 flex flex-col">
  {/* Imagen placeholder */}
  <div className="h-40 w-full bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
    <span className="text-gray-400 text-sm">Imagen</span>
  </div>

  {/* Nombre, categoría y estado */}
  <div className="flex items-center justify-between mb-2">
    <h3 className="text-lg font-semibold text-gray-800">{nombre}</h3>
    <div className="flex gap-2">
      <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-600 font-medium">
        {categoria}
      </span>
      <span
        className={`
          px-2 py-0.5 text-xs rounded-full font-medium
          ${estado === 'Disponible' ? 'bg-green-100 text-green-700' : ''}
          ${estado === 'Agotado' ? 'bg-red-100 text-red-700' : ''}
          ${estado === 'En oferta' ? 'bg-amber-100 text-amber-700' : ''}
        `}
      >
        {estado}
      </span>
    </div>
  </div>

  {/* Descripción */}
  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{describe}</p>

  {/* Precio y CTA */}
  <div className="mt-auto flex items-center justify-between">
    <p className="text-xl font-bold text-amber-500">${precio}</p>
    {showActions ? (
      <div className="flex gap-2">
        <button className="px-3 py-1.5 text-sm bg-yellow-500 text-white rounded-lg">
          Editar
        </button>
        <button onClick={onDelete} className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg">
          Eliminar
        </button>
      </div>
    ) : (
      <button
      disabled={disabledd}
      onClick={onCart}
      className={`px-3 py-1.5 text-sm rounded-lg transition ${
        disabledd
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      }`}
    >
      {disabledd ? "No disponible" : "Agregar al carrito"}
    </button>
    )}
  </div>
</div>
  )
}

export default ProductItem