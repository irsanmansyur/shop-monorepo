import { Outlet } from "react-router";
import { authClient } from "~/lib/auth-client";

const AuthLayout: React.FC = ({}) => {
  const { data, isPending } = authClient.useSession();
  if (isPending) return "";
  if (data?.user) window.location.replace("/");
  return <Outlet />;
};
export default AuthLayout;
