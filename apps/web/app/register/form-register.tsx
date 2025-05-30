import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { z } from "zod";
import { useZod } from "../store/zod";
import { InputErrorMessage } from "~/components/ui/input-error-message";
import { NavLink } from "react-router";
import { authClient } from "../lib/auth-client";
import PasswordInput from "~/components/ui/input-group";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Name is required"),
});

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [form, setForm, { errors, handler, setErrors, reset, loading }] =
    useZod(registerSchema);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const key = e.target.name as keyof typeof form;
    setForm(key, e.target.value);
  }
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handler(async () => {
      const { error } = await authClient.signUp.email({
        ...form,
        callbackURL: "/login",
      });

      if (error) {
        return setErrors({ message: error.message });
      }
      reset();
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>Silahkan register</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <InputErrorMessage error={errors.name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="xx@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <InputErrorMessage error={errors.email} />
              </div>
              <PasswordInput
                name="password"
                onChange={handleChange}
                value={form.password}
                required
                error={errors.password}
              />

              <Button disabled={loading} type="submit" className="w-full">
                Register
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              have an account?{" "}
              <NavLink to="/login" className="underline underline-offset-4">
                Login
              </NavLink>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
