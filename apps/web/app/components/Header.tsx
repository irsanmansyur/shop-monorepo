import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { BreadcrumbDemo } from "./breadcrumbs";
import { NavLink } from "react-router";
import { useWeb } from "~/store/zustan";
import { CommandMenu } from "./layouts/search-command";
import FloatingSearch from "./layouts/search-product";
import UserStatusIcon from "./user/UserStatusIcon";

const Header: React.FC = () => {
  const { keranjangs } = useWeb();
  const totalItems = keranjangs.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 bg-white border-b transition-transform duration-300 shadow-md`}
      >
        <div className="container p-2 sm:py-4 flex gap-2 items-center justify-between">
          <NavLink to={"/"} className="flex gap-2 items-center">
            <img src="/logo.png" className="h-16" />
          </NavLink>
          <div className="flex items-center gap-2 justify-end">
            <div className="hidden md:relative mr-4">
              <Input placeholder="Search Handphone" className="w-full pr-20" />
              <Button
                className="absolute z-10 right-[6px] top-[6px] h-6 px-2 cursor-pointer"
                onClick={() => {
                  alert("Searched");
                }}
              >
                Search
              </Button>
            </div>
            <FloatingSearch />
            <div className="flex gap-4 items-center relative">
              <NavLink to={"/keranjang"} className="relative">
                <ShoppingCart size={30} id="cart" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                    {totalItems}
                  </span>
                )}
              </NavLink>
              <UserStatusIcon />
            </div>
          </div>
        </div>
      </header>
      <div className="container pt-1">
        <BreadcrumbDemo />
      </div>
      <CommandMenu />
    </>
  );
};

export default Header;
