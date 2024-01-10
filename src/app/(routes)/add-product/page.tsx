import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function AddProductPage() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <main className="flex flex-col justify-between items-center p-24 min-h-screen">
      <h1>Add Product</h1>
    </main>
  );
}
