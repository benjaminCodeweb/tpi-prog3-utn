import React, { useState } from 'react'
import axios from 'axios';
import { type Product } from '../../types';


type Props = {
    productAdded: () => void;
     productToEdit?: Product | null  
     onEdit: (id: number,nombre: string, describe: string, precio: number,categoria: string) => void;
    
    
}

function NewProduct({productAdded, productToEdit, onEdit}: Props) {

    const [nombre, setNombre] = useState(productToEdit?.nombre || '')
  const [describe, setDecribe] = useState(productToEdit?.describe || '')
  const [precio, setPrecio] = useState(
    productToEdit?.precio ? productToEdit.precio.toString() : ''
  )
  const [categoria, setCategoria] = useState(productToEdit?.categoria || '')
  const [imagen, setImagen] = useState<File | null>(null)
    const token = localStorage.getItem('token');
    const editar= !!productToEdit;

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        

        try{
            const formData = new FormData;
            formData.append('nombre', nombre);
            formData.append('describe', describe);
            formData.append('precio', precio);
            formData.append('categoria', categoria)
            if(imagen) {
            formData.append('imagen', imagen)
            }
            
            if(!editar) {
               await axios.post('http://localhost:3000/api/products', formData, {
                headers: {
                Authorization: `Bearer ${token}`
            }});

            productAdded();

            

            } 
            else  if (productToEdit) {
               onEdit(productToEdit.id, nombre, describe,  Number(precio), categoria)

            }

            productAdded();

            setNombre('');
            setDecribe('');
            setPrecio('');
            setCategoria('');
            setImagen(null);

            } catch (err) {
                console.error('error: ',err)
            }
    }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 text-black">
  <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
    {/* Título */}
    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
      {editar ? 'Editar Producto' : '🛒 Nuevo Producto'}
    </h1>

    {/* Formulario */}
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Nombre
        </label>
        <input
          type="text"
          placeholder="Ej: Camiseta Nike"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Imagen
        </label>
        <input
          placeholder="imagen del producto"
          onChange={(e) =>{ if (e.target.files && e.target.files[0]) {
            setImagen(e.target.files[0]);

          }else {setImagen(null)}} }
          type='file'
          accept='image/*'
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio
          </label>
          <input
            type="number"
            placeholder="$0.00"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
    Categoría
  </label>
  <select
    value={categoria}
    onChange={(e) => setCategoria(e.target.value)}
    required
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
  >
    <option value="">Selecciona una categoría</option>
    <option value="Ropa">Ropa</option>
    <option value="Calzado">Calzado</option>
    <option value="Accesorios">Accesorios</option>
    <option value="Electrónica">Electrónica</option>
    <option value="Hogar">Hogar</option>
    <option value="Deportes">Deportes</option>
    <option value="Juguetes">Juguetes</option>
    <option value="Belleza">Belleza</option>
    <option value="Alimentos">Alimentos</option>
    <option value="Libros">Libros</option>
  </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
      >
        {editar ?  'Editar Producto' : 'Agregar Producto'}
      </button>
    </form>
  </div>
</div>

  )
}

export default NewProduct