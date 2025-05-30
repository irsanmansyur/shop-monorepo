import type { Route } from "./+types/home";
import { LoginForm } from "~/login/LoginForm";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Login Page" }, { name: "Login to apps" }];
}

export default function Login() {
  return (
    <div className="flex justify-center p-2 items-center min-h-screen">
      <LoginForm className="w-full md:max-w-xl" />
    </div>
  );
}
