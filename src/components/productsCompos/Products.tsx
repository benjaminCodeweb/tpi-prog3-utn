import { useContext, useState } from "react";
import { type Product } from "../../types";
import ProductItem from "./ProductItem";
import { motion, AnimatePresence } from 'framer-motion'
import { themeContext } from "../../services/ThemeProvider";


export type ProductsProps = {
  products: Product[];
  onDelete: (id: number) => void;

  onStartEdit: (product: Product) => void;
  onSearch: () => string;


}
function Products({ products, onDelete, onStartEdit, onSearch }: ProductsProps) {
  const [search] = useState<string>('');
  const { theme } = useContext(themeContext)


  const filtredProducts =
    onSearch().length > 0
      ? products.filter((p) =>
        p.nombre.toLowerCase().includes(onSearch().toLowerCase()
        ))

      : products;
  return (
    <div
      className={`px-6 py-10 transition-theme duration-300 ${theme === "dark" ? "dark" : ""
        }`}
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filtredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{
                delay: index * 0.08,
                duration: 0.4,
                ease: "easeOut",
              }}
              className="transition-theme"
            >
              <ProductItem
                {...product}
                onDelete={() => onDelete(product.id)}
                onStartEdit={() => onStartEdit(product)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};


export default Products;