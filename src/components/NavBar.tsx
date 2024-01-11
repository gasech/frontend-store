"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const NavBar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between p-6 px-32 w-full shadow-2xl">
      <Link href="/" className="text-3xl font-bold">
        Frontend Store
      </Link>
      <div className="flex gap-4 items-center">
        <CartDrawer />
        {session ? (
          <Button variant="outline">
            {" "}
            <PlusIcon className="mr-2 w-4 h-4" />{" "}
            <Link href="/add-product">Add Product</Link>
          </Button>
        ) : null}
        {session ? (
          <ProfileDropdown />
        ) : (
          <Button>
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

const ProfileDropdown = () => {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={session?.user?.image ?? ""} />
          <AvatarFallback>
            <Skeleton className="h-10 rounded-full w-10w" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <p>{session?.user?.name}</p>
          <span className="font-medium text-gray-500">
            {session?.user?.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const CartDrawer = () => {
  let cartItems = 0;

  return (
    <Drawer>
      <DrawerTrigger>
        <Button variant="outline" asChild>
          <div>
            <Image
              src="/icons/cart.svg"
              alt="Cart Icon"
              className="mr-2"
              width={16}
              height={16}
            />
            <span>{cartItems}</span>
          </div>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Cart</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="p-4 w-full text-center">
          <p>Your cart is empty.</p>
        </div>
        <DrawerFooter>
          <Button>Checkout</Button>
          <DrawerClose>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default NavBar;
