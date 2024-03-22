import { z } from "zod";

export const courseCreateSchema = z.object({
	name: z.string().min(1, "Escreva um nome"),
	price: z.string().min(1, "Escreva um preço"),
});
