import { z } from "zod";

export const updateTimeRegistrationsSchema = z.object({
	time: z.number({ invalid_type_error: "Digite um número" }).int().positive(),
});
