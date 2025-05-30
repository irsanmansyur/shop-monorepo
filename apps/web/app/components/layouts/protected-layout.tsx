import { Outlet } from "react-router";
import { authClient } from "~/lib/auth-client";

const Layout: React.FC = ({}) => {
  const { data, isPending } = authClient.useSession();
  if (isPending) return "";
  if (!data || !data?.user) window.location.replace("/login");
  return <Outlet />;
};
export default Layout;
