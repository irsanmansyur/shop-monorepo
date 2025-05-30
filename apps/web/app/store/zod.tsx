import { useEffect, useState } from "react";

import type { z } from "zod";
interface ValidationError {
  [key: string]: string;
}

export const parseErrors = <T extends ValidationError>(
  response: unknown,
): T => {
  const errArr = {} as T;

  if (
    typeof response === "object" &&
    response !== null &&
    "error" in response &&
    Array.isArray((response as any).error.errors)
  ) {
    const { errors: err } = (response as any).error;
    for (let i = 0; i < err.length; i++) {
      const key = err[i].path[0];
      const message = err[i].message;
      (errArr as any)[key] = message;
    }
  }

  return errArr;
};

export function useZod<T extends z.ZodTypeAny>(
  schema: T,
  defaultState: z.infer<T> = {} as z.infer<T>,
) {
  type SchemaType = z.infer<T>;
  const [state, setState] = useState<SchemaType>(defaultState);
  const [errors, setErrors] = useState<Partial<ValidationError>>({});
  const [loading, setLoading] = useState(false);
  const [isChange, setIsChange] = useState(false);

  // Check if the current state is different from the default state
  useEffect(() => {
    setIsChange(JSON.stringify(state) !== JSON.stringify(defaultState));
  }, [state, defaultState]);

  // Function to update state with key and value
  const updateState = <K extends keyof SchemaType>(
    key: K,
    value: SchemaType[K],
  ) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const handler = async (action: () => Promise<void> | void) => {
    setLoading(true);
    setErrors({});
    const response = schema.safeParse(state);
    if (!response.success) {
      setErrors(parseErrors(response));
      setLoading(false);
      return false;
    }
    try {
      await action();
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setState(defaultState);
    setErrors({});
  };

  return [
    state,
    updateState,
    { handler, errors, reset, loading, setErrors, isChange },
  ] as const;
}
