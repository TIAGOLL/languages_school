import { z } from "zod";

export const updateBookSchema = z.object({
	id: z.number({ invalid_type_error: "Um ID deve ser selecionado" }),
	name: z
		.string()
		.min(3, {
			message: "O nome deve ter no mínimo 3 caracteres",
		})
		.trim(),
	position: z.number({ invalid_type_error: "A posição deve ser um número" }).min(1, { message: "A posição deve ser maior que 0" }),
});
