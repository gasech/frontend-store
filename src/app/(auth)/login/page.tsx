import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function LoginPage() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/");
  }
  return (
    <main className="flex flex-col justify-between items-center p-24 min-h-screen">
      <h1>Login</h1>
    </main>
  );
}
