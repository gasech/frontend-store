"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface signInButtonProps {
  provider: "GitHub" | "Google";
}

const SignInButton = ({ provider }: signInButtonProps) => {
  return (
    <Button
      size={"lg"}
      variant={"outline"}
      onClick={() => signIn(`${provider.toLowerCase()}`)}
    >
      <Image
        src={`icons/${provider.toLowerCase()}.svg`}
        alt={`${provider} Logo`}
        className="mr-2"
        width={16}
        height={16}
      />
      Sign in with {provider}
    </Button>
  );
};

export default SignInButton;
