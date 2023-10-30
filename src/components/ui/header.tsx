"use client";
import {
  ArrowDownIcon,
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
  Menu,
  PackageSearch,
  PercentIcon,
  ShoppingCart,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./sheet";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import Link from "next/link";
import { Cart } from "./cart";
import { Badge } from "./badge";
import { useContext, useEffect } from "react";
import { CartContext } from "@/providers/cart";
import { useRouter, usePathname } from "next/navigation";

const Header = () => {
  const { data, status } = useSession();
  const { cartSize } = useContext(CartContext);
  const { push } = useRouter();
  const currentPath = usePathname();
  console.log(data);

  const handleLoginClick = async () => {
    push(`/auth/signin?callbackUrl=${encodeURIComponent(currentPath)}`);
  };

  const handleLogoutClick = async () => {
    console.log(currentPath);
    const data = await signOut({
      redirect: false,
    });
    push(currentPath);
  };

  return (
    <header>
      <Card className="flex items-center justify-between p-[1.875rem]">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" aria-label="Menu">
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent side="left">
            <SheetHeader className="text-left text-lg font-semibold">
              Menu
            </SheetHeader>

            {status === "authenticated" && data?.user && (
              <div className="flex flex-col">
                <div className="flex items-center gap-2 py-4">
                  <Avatar>
                    <AvatarFallback>
                      {data.user.name?.[0].toUpperCase()}
                      {data.user.name?.split(" ")?.pop()?.[0].toUpperCase()}
                    </AvatarFallback>

                    {data.user.image && <AvatarImage src={data.user.image} />}
                  </Avatar>

                  <div className="flex flex-col">
                    <p className="font-medium">{data.user.name}</p>
                    <p className="text-sm opacity-75">Boas compras!</p>
                  </div>
                </div>

                <Separator />
              </div>
            )}
            <nav>
              <ul className="mt-4 flex flex-col gap-2">
                {status === "unauthenticated" && (
                  <li>
                    <SheetClose asChild>
                      <Button
                        onClick={handleLoginClick}
                        variant="outline"
                        className="w-full justify-start gap-2"
                      >
                        <LogInIcon size={16} />
                        Fazer Login
                      </Button>
                    </SheetClose>
                  </li>
                )}

                {status === "authenticated" && (
                  <>
                    <li>
                      <SheetClose asChild>
                        <Link href="/orders" className="w-full">
                          <Button
                            variant="outline"
                            className="w-full justify-start gap-2"
                          >
                            <PackageSearch size={16} />
                            Meus Pedidos
                          </Button>
                        </Link>
                      </SheetClose>
                    </li>

                    <li>
                      <SheetClose asChild>
                        <Button
                          onClick={handleLogoutClick}
                          variant="outline"
                          className="w-full justify-start gap-2"
                        >
                          <LogOutIcon size={16} />
                          Fazer Logout
                        </Button>
                      </SheetClose>
                    </li>
                  </>
                )}

                <li>
                  <SheetClose asChild>
                    <Link href="/" className="w-full">
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-2"
                      >
                        <HomeIcon size={16} />
                        Início
                      </Button>
                    </Link>
                  </SheetClose>
                </li>

                <li>
                  <SheetClose asChild>
                    <Link href="/deals" className="w-full">
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-2"
                      >
                        <PercentIcon size={16} />
                        Ofertas
                      </Button>
                    </Link>
                  </SheetClose>
                </li>

                <li>
                  <SheetClose asChild>
                    <Link href="/catalog" className="w-full">
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-2"
                      >
                        <ListOrderedIcon size={16} />
                        Catálogo
                      </Button>
                    </Link>
                  </SheetClose>
                </li>
              </ul>
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/">
          <h2 className="text-lg font-semibold">
            <span className="text-primary">FSW</span> Store
          </h2>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              aria-label="Carrinho de compras"
              className="relative"
            >
              <ShoppingCart />
              <Badge className="absolute right-[-8px] top-[-4px] px-2 py-[1px] text-[0.625rem]">
                {cartSize}
              </Badge>
            </Button>
          </SheetTrigger>

          <SheetContent className="w-[350px]">
            <Cart />
          </SheetContent>
        </Sheet>
      </Card>
    </header>
  );
};

export { Header };
