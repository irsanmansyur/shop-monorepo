import { RegisterForm } from "~/register/form-register";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Register" },
    { name: "description", content: "Register Terlebih dahulu ya" },
  ];
}

export default function Register() {
  return (
    <div className="flex justify-center p-2 items-center min-h-screen">
      <RegisterForm className="w-full  md:max-w-xl" />
    </div>
  );
}
