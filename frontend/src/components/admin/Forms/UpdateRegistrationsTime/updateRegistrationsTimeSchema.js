import { z } from "zod";

export const updateRegistrationsTimeSchema = z.object({
	time: z.number({ invalid_type_error: "Digite um número" }).int().positive(),
});
