
import { useEffect, useState } from 'react';
import type { Product } from '../../types';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';



export type ProductItemProps = {
  id: number;
  nombre: string;
  describe: string;
  precio: number;
  categoria: string;
  estado: string,
  imagen: File,
  showActions?: boolean; // ✅ opcional
  onCart?: (product: Product) => void; // ✅ opcional
  onDelete: (id: number) => void
  onStartEdit?: () => void;


};

function ProductItem({ id, nombre, describe, precio, categoria, estado, imagen, showActions = true, onCart, onDelete, onStartEdit }: ProductItemProps) {
  const [disabledd, setDisabledd] = useState(false);
  const cartItem = useSelector((state: RootState) => state.cart.items)
  const isInCart = cartItem.some(item => item.id === id)
  const isSold = estado === 'vendido';
  const disabled = isInCart || isSold
  const buttonLabel = isInCart ? 'Agregado' : isSold ? 'No disponible' : 'Agregar al carrito';

  const buttonClasses = isInCart
    ? 'px-3 py-1.5 text-sm rounded-lg transition bg-green-500 hover:bg-green-600 text-white cursor-not-allowed'
    : disabled
      ? 'px-3 py-1.5 text-sm rounded-lg transition bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
      : 'px-3 py-1.5 text-sm rounded-lg transition bg-blue-600 hover:bg-blue-700 text-white';


  useEffect(() => {

    if (estado === 'Vendido' || isInCart) {
      setDisabledd(true);
    } else {
      setDisabledd(false)
    }

  }, [estado, isInCart]);

  const editProduct = () => {
    onStartEdit?.()
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition p-5 flex flex-col">
      {/* Imagen placeholder */}
      <div className="h-40 w-full bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
        {imagen ? (
          <img
            src={`http://localhost:3000${imagen}`}
            alt="Imagen del producto"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <span className="text-gray-400 dark:text-gray-300 text-sm">Sin Imagen</span>
        )}
      </div>

      {/* Nombre, categoría y estado */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{nombre}</h3>
        <div className="flex gap-2">
          <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 font-medium">
            {categoria}
          </span>
          <span
            className={`px-2 py-0.5 text-xs rounded-full font-medium
          ${estado === 'Disponible' ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300' : ''}
          ${estado === 'Agotado' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' : ''}
          ${estado === 'En oferta' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200' : ''}
          ${estado === 'Vendido' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' : ''}
        `}
          >
            {estado}
          </span>
        </div>
      </div>

      {/* Descripción */}
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
        {describe}
      </p>

      {/* Precio y CTA */}
      <div className="mt-auto flex items-center justify-between">
        <p className="text-xl font-medium text-black dark:text-white transition-theme">
          ${precio}
        </p>
        {showActions ? (
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg" onClick={editProduct}>
              Editar
            </button>
            <button onClick={() => onDelete(id)} className="px-3 py-1.5 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg">
              Eliminar
            </button>
          </div>
        ) : (
          <button
            disabled={disabledd}
            onClick={() =>
              onCart?.({
                id,
                nombre,
                describe,
                precio,
                categoria,
                estado,
                imagen,
              })
            }
            className={buttonClasses}
          >
            {buttonLabel}

          </button>
        )}
      </div>
    </div>
  )
}

export default ProductItem