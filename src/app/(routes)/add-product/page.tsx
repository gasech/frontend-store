import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import AddProductForm from "@/components/add-product/AddProductForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function AddProductPage() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <main className="flex flex-col items-center p-24 min-h-screen">
      <Card>
        <CardHeader className="min-w-96">
          <CardTitle>Add Product</CardTitle>
          <CardDescription>
            Add your favorite product to the Frontend Store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddProductForm />
        </CardContent>
      </Card>
    </main>
  );
}
