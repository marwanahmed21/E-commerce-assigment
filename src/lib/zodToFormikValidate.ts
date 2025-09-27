import { z } from "zod";

export function zodToFormikValidate<T extends z.ZodTypeAny>(schema: T) {
  return (values: unknown) => {
    const result = schema.safeParse(values);
    if (result.success) return {};
    const errors: Record<string, string> = {};
    const fieldErrors = result.error.flatten().fieldErrors; 

    for (const key in fieldErrors) {
      const messages = fieldErrors[key as keyof typeof fieldErrors];
      if (messages && messages.length > 0) {
        errors[key] = messages[0];
      }
    }
    return errors;
  };
}
