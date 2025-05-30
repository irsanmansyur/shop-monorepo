import { User } from "lucide-react";

import { authClient } from "~/lib/auth-client";
import { Link } from "react-router";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

const UserStatusIcon = () => {
  const { data, isPending } = authClient.useSession();

  if (isPending) {
    return <Skeleton className="w-[30px] h-[30px] rounded-full" />;
  }

  if (data?.user) {
    return <DropDownMenu user={data.user} />;
  }

  return (
    <Link to="/login" className="text-sm underline">
      <User size={30} className="text-primary hover:text-muted-foreground" />
    </Link>
  );
};

function getInitials(name?: string) {
  if (!name) return "CN";
  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    // Jika hanya satu kata, ambil dua huruf pertama (atau satu jika cuma satu huruf)
    return words[0].slice(0, 2).toUpperCase();
  }
  // Jika lebih dari satu kata, ambil huruf pertama dari dua kata pertama
  return (words[0][0] + words[1][0]).toUpperCase();
}

function DropDownMenu({ user }: { user: WEB.User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image as string} alt="Profile" />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
          }}
        >
          <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Logout() {
  const { signOut } = authClient;
  return (
    <Dialog>
      <DialogTrigger>Logout</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            Anda akan keluar dari sesi, dan akan ke lempar ke halaman login
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={async () => {
              await signOut();
            }}
          >
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default UserStatusIcon;
