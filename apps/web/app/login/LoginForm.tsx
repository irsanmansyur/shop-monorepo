import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { toast } from "sonner";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { z } from "zod";
import { useZod } from "~/store/zod";
import { InputErrorMessage } from "~/components/ui/input-error-message";
import { NavLink } from "react-router";
import { authClient } from "~/lib/auth-client";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [form, setForm, { errors, handler, reset, loading }] =
    useZod(loginSchema);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const key = e.target.name as keyof typeof form;
    setForm(key, e.target.value);
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handler(async () => {
      const { error } = await authClient.signIn.email({
        ...form,
        callbackURL: "/",
      });

      if (error) {
        return toast.error(error.message);
      }
      reset();
    });
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <InputErrorMessage error={errors.email} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="xxx"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <InputErrorMessage error={errors.password} />
              </div>
              <Button disabled={loading} type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <NavLink to="/register" className="underline underline-offset-4">
                Sign up
              </NavLink>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
