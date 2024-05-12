import { z } from "zod";

export const FormRememberSchema = z.object({
    firstname : z.string().min(3,"Min 3 chars"),
    time : z.string()
});

export type FormRememberDataHistory = z.infer<typeof FormRememberSchema>;