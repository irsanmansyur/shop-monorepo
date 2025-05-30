import { authClient } from "../lib/auth-client"; // import the auth client

export function User() {
  const { data, isPending, error, refetch } = authClient.useSession();

  return { isPending, data, error, refetch };
}
