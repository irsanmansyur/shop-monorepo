import type { FC } from "react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { useWeb } from "~/store/zustan";

interface StartOrderProps {
  product: WEB.Product;
}

export const StartOrder: FC<StartOrderProps> = ({ product }) => {
  const { set } = useWeb();
  const navigate = useNavigate();
  const onClick = () => {
    set({ orders: [{ ...product, quantity: 1 }] });
    navigate("/order");
  };
  return (
    <Button
      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full"
      onClick={onClick}
    >
      Start order
    </Button>
  );
};
