import { z } from "zod";

const hobbySchema = z.object({
    name : z.string()
});

export const reactHookFormSchema = z.object({
    firstname : z.string().min(3,"Required, min 3 chars"),
    surname : z.string().min(3,"Required, min 3 chars"),
    hobby : z.array(hobbySchema)
});

export type ReactHookFormData = z.infer<typeof reactHookFormSchema>