import { z } from "zod";

export const courseUpdateSchema = z.object({
	name: z.string().min(1, "Escreva um nome"),
	price: z.string().min(1, "Escreva um preço").or(z.number().min(1, "Escreva um preço")),
});
