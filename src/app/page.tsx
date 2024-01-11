import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
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

export default function Home() {
  return (
    <main className="flex flex-row gap-8 justify-between p-14 mx-auto min-h-screen max-w-[1300px]">
      <Card className="border-white border-none h-fit">
        <CardHeader>
          <CardTitle>Product Filter</CardTitle>
          <CardDescription>
            Filter your products by name or price
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input type="text" placeholder="Product Name..." />
        </CardContent>
        <CardContent>
          {/* TODO: max and default value equals to highest product value */}
          <p className="text-sm font-medium leading-none">Max Price</p>
          <div className="flex gap-2 items-center h-fit">
            <p>$0</p>
            <Slider
              className="min-w-32"
              defaultValue={[200]}
              max={200}
              step={1}
            />
            <p>$200</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Filter</Button>
        </CardFooter>
      </Card>
      <div className="grid grid-cols-3 gap-4 w-full h-fit">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </main>
  );
}

const ProductCard = () => {
  return (
    <Card className="h-92">
      <CardHeader>
        <Skeleton className="mb-2 w-full h-32" />
        <CardTitle>Product Name</CardTitle>
        <CardDescription>Product Description</CardDescription>
      </CardHeader>
      <CardContent>
        <span className="text-4xl font-medium leading-none">200$</span>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};
