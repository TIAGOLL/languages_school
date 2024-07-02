import { z } from "zod";

export const UpdateLockRegistrationSchema = z.object({
	description: z.string().max(1000, "Máximo de 1000 caracteres!").optional(),
	student: z.number().int().positive(),
	registration: z.number().int().positive(),
});
