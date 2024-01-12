"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { Product } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";

const someProducts = [
  {
    id: 0,
    name: "PS5 Slim New edition",
    description: "Xbox sucks?",
    price: 499.99,
  },
  {
    id: 1,
    name: "MP3 Player",
    description: "ikr, a MP3 player in 2024?",
    price: 100,
  },
  {
    id: 2,
    name: "Brand new headphones",
    description: "They are brand new.",
    price: 5.99,
  },
];

interface ProductContextProps {
  products: Product[];
  addProduct: (product: Product) => void;
}

export const ProductContext = createContext<ProductContextProps>({
  products: [],
  addProduct: () => {},
});

const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();

  // This is where you should handle sending data to the database but I'm using localstorage for now
  useEffect(() => {
    const data = localStorage.getItem("products");

    if (data == null) {
      setProducts(someProducts);
    } else {
      setProducts(JSON.parse(data));
    }
  }, []);

  const addProduct = (product: Product) => {
    const newProducts = [...products, product];

    try {
      setProducts(newProducts);
      localStorage.setItem("products", JSON.stringify(newProducts));
    } catch (err) {
      console.error(err);

      toast({
        variant: "destructive",
        title: "Error",
        description: "Error adding product to Frontend Store",
      });
    } finally {
      toast({
        title: "Added",
        description: `${product.name} added to Frontend Store`,
      });
    }
  };

  const contextValue: ProductContextProps = {
    products,
    addProduct,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

const useProductsContext = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error(
      "useProductsContext must be used within a ProductsProvider",
    );
  }

  return context;
};

export { ProductsProvider, useProductsContext };
