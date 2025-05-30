import { useState } from "react";
import { Input } from "./input";
import { Label } from "./label";
import { Eye, EyeOff } from "lucide-react";
import { InputErrorMessage } from "./input-error-message";

interface PasswordInputProps {
  id?: string;
  name: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

const PasswordInput = ({
  id = "password",
  name,
  label = "Password",
  placeholder = "••••••••",
  value,
  onChange,
  error,
  required = false,
}: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          name={name}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      <InputErrorMessage error={error} />
    </div>
  );
};

export default PasswordInput;
