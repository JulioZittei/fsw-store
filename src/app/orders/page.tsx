import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { PackageSearch } from "lucide-react";
import { getServerSession } from "next-auth";
import OrderItem from "./components/order-item";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const OrdersPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-5">
        <h2 className="font-bold">Acesso Negado!</h2>
        <p className="text-sm opacity-60">Faça login para ver seus pedidos</p>
      </div>
    );
  }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: session.user.id as string,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <div className="h-full p-5">
      <Badge variant="heading">
        <PackageSearch size={16} />
        Meus Pedidos
      </Badge>

      {orders.length !== 0 ? (
        <div className="mt-5 flex flex-col gap-5">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2 p-5">
          <h2 className="font-bold">Você ainda não tem pedidos =[</h2>
          <p className="text-sm opacity-60">
            Vamos encher esse carrinho? Veja ofertas que temos para você.
          </p>
          <Button aria-label="Ir para ofertas" asChild>
            <Link href={"/deals"}>Ir para as ofertas</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
