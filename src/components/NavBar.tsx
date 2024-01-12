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
import { useCart } from "@/providers/CartProvider";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const NavBar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between p-6 px-32 w-full shadow-md">
      <Link href="/" className="text-3xl font-bold">
        Frontend Store
      </Link>
      <div className="flex gap-4 items-center">
        <CartDrawer />
        {session ? (
          <Button variant="default">
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

const CartDrawer = () => {
  const { cartItems, getTotalQuantity, removeFromCart } = useCart();

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
            <span>Cart - {getTotalQuantity()}</span>
          </div>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="mx-auto w-1/3">
            Cart - {getTotalQuantity()}
          </DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="p-4 mx-auto w-1/3 text-center">
          {cartItems.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Unit price</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="w-32 text-center">Remove</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((cartItem) => (
                  <TableRow key={cartItem.id}>
                    <TableCell className="text-left">{cartItem.name}</TableCell>
                    <TableCell>{cartItem.quantity}</TableCell>
                    <TableCell className="text-right">
                      ${cartItem.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      ${(cartItem.price * cartItem.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeFromCart(cartItem)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        <DrawerFooter>
          <Button className="mx-auto w-1/3">Checkout</Button>
          <DrawerClose>
            <Button variant="outline" className="mx-auto w-1/3">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
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

export default NavBar;
