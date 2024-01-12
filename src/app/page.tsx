"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useState } from "react";
import { useCartContext } from "@/providers/CartProvider";
import { Product } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useProductsContext } from "@/providers/ProductsProvider";

interface Filters {
  searchText: string;
}

export default function Home() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const { products } = useProductsContext();

  const [filters, setFilters] = useState<Filters>({
    searchText: search ? search : "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    console.log(filters);
  };

  return (
    <main className="flex flex-row gap-8 justify-between p-14 mx-auto min-h-screen max-w-[1300px]">
      <Card className="w-96 border-white border-none h-fit">
        <CardHeader>
          <CardTitle>Product Filter</CardTitle>
          <CardDescription>Filter your products by name</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="Product Name..."
            defaultValue={filters.searchText}
            name="searchText"
            onChange={handleChange}
          />
        </CardContent>
      </Card>
      <div className="grid grid-cols-3 gap-4 w-full h-fit">
        {products
          .filter((product) =>
            product.name
              .toLowerCase()
              .includes(filters.searchText.toLowerCase()),
          )
          .map((product, index) => (
            <ProductCard
              key={index}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
            />
          ))}
      </div>
    </main>
  );
}

const ProductCard = (product: Product) => {
  const { addToCart } = useCartContext();

  return (
    <Card className="h-fit">
      <HoverCard>
        <HoverCardTrigger asChild>
          <CardHeader>
            <Skeleton className="overflow-hidden mb-2 w-full h-32 text-ellipsis truncate" />
            <CardTitle>{product.name}</CardTitle>
            <CardDescription className="overflow-hidden text-ellipsis truncate">
              {product.description}
            </CardDescription>
          </CardHeader>
        </HoverCardTrigger>
        <HoverCardContent>
          <h3 className="font-medium">{product.name}</h3>
          <p>{product.description}</p>
        </HoverCardContent>
      </HoverCard>
      <CardContent>
        <span className="text-2xl font-medium leading-none">
          ${product.price}
        </span>
      </CardContent>
      <CardFooter className="h-12">
        <Button className="w-full" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
