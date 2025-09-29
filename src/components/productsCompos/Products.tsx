import { useEffect, useState } from "react";
import {type  Product } from "../../types";
import ProductItem from "./ProductItem";


export type ProductsProps = {
    products: Product[];
    onDelete: (id:number) => void
   
}
function Products({products, onDelete}: ProductsProps) {
    const [search, setSearch] = useState<string>('');

   
    const filtredProducts = 
    search.length > 0
    ? products.filter((p) => 
        p.nombre.toLowerCase().includes(search.toLowerCase()
        ))

    : products;
    return(
        <div className="px-6 py-10 bg-gray-50">
    

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtredProducts.length > 0 ? (
        filtredProducts.map((product) => (
            <ProductItem key={product.id} {...product} onDelete={() => onDelete(product.id)}  />
          ))
        ) : (
          <p className="text-gray-500">No hay productos</p>
        )}
      </div>
    </div>
    )
};


export default Products;