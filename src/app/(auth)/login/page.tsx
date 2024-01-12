import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInButton from "@/app/(auth)/login/_signInButton";

export default async function LoginPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <main className="flex flex-col justify-between items-center p-24 min-h-screen">
      <Card>
        <CardHeader className="min-w-96">
          <CardTitle>Log in</CardTitle>
          <CardDescription>
            Sign in to get access to the add product page and checkout feature!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <SignInButton provider="GitHub" />
            <SignInButton provider="Google" />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
