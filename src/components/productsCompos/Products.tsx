import { useEffect, useState } from "react";
import {type  Product } from "../../types";
import ProductItem from "./ProductItem";
import axios from 'axios';

export type ProductsProps = {
    products: Product[];
}
function Products({products}: ProductsProps) {
    const [search, setSearch] = useState<string>('');

   
    


    const filtredProducts = 
    search.length > 0
    ? products.filter((p) => 
        p.nombre.toLowerCase().includes(search.toLowerCase()
        ))

    : products;
    return(
        <div className="px-6 py-10 bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">🛍 Mis Productos</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtredProducts.length > 0 ? (
        filtredProducts.map((product) => (
            <ProductItem key={product.id} {...product} />
          ))
        ) : (
          <p className="text-gray-500">No hay productos</p>
        )}
      </div>
    </div>
    )
};


export default Products;