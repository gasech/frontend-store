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

const NavBar = () => {
  let loggedIn = true;

  return (
    <nav className="flex justify-between p-6 px-32 w-full">
      <Link href="/" className="text-3xl font-bold">
        Frontend Store
      </Link>
      <div className="flex gap-4 items-center">
        <CartDrawer />
        {loggedIn ? (
          <Button variant="outline">
            {" "}
            <PlusIcon className="mr-2 w-4 h-4" />{" "}
            <Link href="/add-product">Add Product</Link>
          </Button>
        ) : null}
        {loggedIn ? (
          <ProfileDropdown />
        ) : (
          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

const ProfileDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>
            <Skeleton className="h-10 rounded-full w-10w" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const CartDrawer = () => {
  let cartItems = 3;

  return (
    <Drawer>
      <DrawerTrigger>
        <Button variant="outline" asChild>
          <div>
            <img
              src="/icons/cart.svg"
              alt="Cart Icon"
              className="mr-2 w-4 h-4"
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
