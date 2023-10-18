import { Menu, ShoppingCart } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./sheet";
import site from "../../../site.json";
import { cn } from "@/lib/utils";
import Icon, { IconNames } from "./icon";

const Header = () => {
  return (
    <Card className="flex items-center justify-between p-[1.875rem]">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <Menu />
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <SheetHeader className="text-left text-lg font-semibold">
            Menu
          </SheetHeader>

          <div className="mt-2 flex flex-col gap-2">
            {site.menu.map((item) => (
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                key={item.title}
              >
                <Icon name={item.icon as IconNames} size={16} />
                {item.title}
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      <h1 className="text-lg font-semibold">
        <span className="text-primary">FSW</span> Store
      </h1>

      <Button size="icon" variant="outline">
        <ShoppingCart />
      </Button>
    </Card>
  );
};

export default Header;
